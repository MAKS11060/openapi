import {OpenApiGeneratorV31} from '@asteasolutions/zod-to-openapi'
import {z} from 'zod'
import {registry} from './registry.ts'
import {
  UserIdParamSchema,
  UserInfoSchema,
  UserSchema,
  UsersSchema,
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

// Parameters
registry.registerParameter('UsersQuery', usersQueryParams)

const UserIdSchema = registry.registerParameter(
  'UserId',
  UserIdParamSchema
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
  },
})

const generator = new OpenApiGeneratorV31(registry.definitions)

export const openapi = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    version: '0.0.1',
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
