import {OpenApiGeneratorV31} from '@asteasolutions/zod-to-openapi'
import {z} from 'zod'
import {registry} from './registry.ts'
import {
  UserIdParamSchema,
  UserInfoSchema,
  UserSchema,
  UsersSchema,
  shikimoriKind,
  shikimoriStatus,
  shikimoriTargetType,
  usersQueryParams,
} from './schema.ts'

// Security
const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'oauth2',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://shikimori.one/oauth/authorize',
      tokenUrl: 'https://shikimori.one/oauth/token',
      refreshUrl: 'https://shikimori.one/oauth/token',
      scopes: [
        'user_rates',
        'email',
        'messages',
        'comments',
        'topics',
        'content',
        'clubs',
        'friends',
        'ignores',
      ],
    },
  },
})
const auth = {[bearerAuth.name]: []}

// Examples
const exampleUserID = registry.registerComponent('examples', 'UserID', {
  description: 'User ID',
  value: 406192,
})

// Schema
registry.register('User', UserSchema)
registry.register('Users', UsersSchema)

registry.register(
  'Unauthorized',
  z
    .object({
      error: z.string().openapi({example: 'invalid_token'}),
      error_description: z.string().openapi({example: 'The access token is invalid'}),
      state: z.string().openapi({example: 'unauthorized'}),
    })
    .openapi('Unauthorized')
)

// Parameters
registry.registerParameter('UsersQuery', usersQueryParams)

const UserIdSchema = registry.registerParameter('UserID', UserIdParamSchema)

// Responses
const ErrorUnauthorizedResponse = registry.registerComponent(
  'responses',
  'Unauthorized',
  {
    description: 'Unauthorized request',
    content: {
      'application/json': {
        schema: {
          $ref: 'Unauthorized',
        },
      },
    },
  }
)

// Paths
registry.registerPath({
  tags: ['users'],
  path: '/api/users',
  method: 'get',
  request: {
    query: usersQueryParams,
  },
  responses: {
    200: {
      description: 'List users',
      content: {
        'application/json': {
          schema: UsersSchema,
        },
      },
    },
  },
})

registry.registerPath({
  tags: ['users'],
  path: '/api/users/{id}',
  method: 'get',
  request: {
    params: z.object({
      id: UserIdSchema,
    }),
  },
  responses: {
    200: {
      description: 'Show an user',
      content: {
        'application/json': {
          schema: UserInfoSchema,
        },
      },
    },
  },
})

registry.registerPath({
  tags: ['users'],
  path: '/api/users/whoami',
  method: 'get',
  security: [auth],
  responses: {
    200: {
      description: 'Show an user',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
    401: ErrorUnauthorizedResponse.ref,
  },
})

// Paths
registry.registerPath({
  tags: ['genres'],
  path: '/api/genres',
  method: 'get',
  responses: {
    200: {
      description: 'List genres',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              id: z.number().positive(),
              name: z.string(),
              russian: z.string().nullable(),
              kind: shikimoriKind,
            })
          ),
        },
      },
    },
  },
})

const userRatesSchema = z
  .object({
    id: z.number().positive(),
    user_id: z.number().openapi('UserID'),
    target_id: z.number().positive(),
    target_type: shikimoriTargetType,
    score: z.number().min(0).max(10),
    status: shikimoriStatus,
    rewatches: z.number(),
    episodes: z.number(),
    volumes: z.number(),
    chapters: z.number(),
    text: z.string().nullable(),
    text_html: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  })
  .openapi('UserRates')

const userRatesArraySchema = z.array(userRatesSchema)

registry.registerPath({
  tags: ['user rates v2'],
  path: '/api/v2/user_rates',
  method: 'get',
  request: {
    query: z.object({
      user_id: z.number().positive().optional(),
      target_id: z.number().positive().optional(),
      target_type: shikimoriTargetType.optional(),
      status: shikimoriStatus.optional(),
      page: z.number().min(1).max(100000).optional().openapi({
        description: 'This field is ignored when user_id is set',
      }),
      limit: z.number().min(1).max(1000).optional().openapi({
        description: 'This field is ignored when user_id is set',
      }),
    }),
  },
  responses: {
    200: {
      description: 'List user rates',
      content: {
        'application/json': {
          schema: userRatesArraySchema,
        },
      },
    },
  },
})

//
const generator = new OpenApiGeneratorV31(registry.definitions)

export const openapi = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    version: '0.0.2',
    title: 'Shikimori API',
  },
  externalDocs: {
    url: 'https://shikimori.one/api/doc',
    description: 'Official Shikimori API',
  },
  servers: [
    {
      url: 'https://shikimori.one',
      description: 'Main server',
    },
  ],
})
