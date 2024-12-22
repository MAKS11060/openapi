import {OpenApiGeneratorV31} from '@asteasolutions/zod-to-openapi'
import {z} from 'zod'
import {registry} from './registry.ts'
import {NotFoundResponse, UnauthorizedResponse} from './responses.ts'
import {
  AnimeArraySchema,
  AnimeID,
  AnimeSchema,
  AnimeSearchQuery,
  UserID,
  UserInfoSchema,
  UserSchema,
  UsersSchema,
  UsersSearchQuery,
  shikimoriKind,
  shikimoriStatus,
  shikimoriTargetType,
  userRatesArraySchema,
} from './schema.ts'

// Security
const bearerAuth = registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'oauth2',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://shikimori.one/oauth/authorize',
      tokenUrl: 'https://shikimori.one/oauth/token',
      refreshUrl: 'https://shikimori.one/oauth/token',
      scopes: ['user_rates', 'email', 'messages', 'comments', 'topics', 'content', 'clubs', 'friends', 'ignores'],
    },
  },
})
const auth = {[bearerAuth.name]: []}

// Users
registry.registerPath({
  tags: ['users'],
  path: '/api/users',
  method: 'get',
  request: {
    query: UsersSearchQuery,
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
      id: UserID,
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
    401: UnauthorizedResponse.ref,
  },
})

// Genres
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

// UserRates
registry.registerPath({
  tags: ['user rates v2'],
  path: '/api/v2/user_rates',
  method: 'get',
  request: {
    query: z.object({
      user_id: UserID.optional(),
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
    401: UnauthorizedResponse.ref,
    404: NotFoundResponse.ref,
  },
})

// Animes
registry.registerPath({
  tags: ['animes'],
  path: '/api/animes',
  method: 'get',
  security: [auth],
  request: {
    query: AnimeSearchQuery,
  },
  responses: {
    200: {
      description: 'List animes',
      content: {
        'application/json': {
          schema: AnimeArraySchema,
        },
      },
    },
    401: UnauthorizedResponse.ref,
    404: NotFoundResponse.ref,
  },
})

registry.registerPath({
  tags: ['animes'],
  path: '/api/animes/{id}',
  method: 'get',
  security: [auth],
  request: {
    params: z.object({
      id: AnimeID,
    }),
  },
  responses: {
    200: {
      description: 'Show an anime',
      content: {
        'application/json': {
          schema: AnimeSchema,
        },
      },
    },
    401: UnauthorizedResponse.ref,
    404: NotFoundResponse.ref,
  },
})

//
const generator = new OpenApiGeneratorV31(registry.definitions)

export const openapi = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    version: '0.0.3',
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
  tags: [
    //
    {name: 'animes'},
    {name: 'users'},
    {name: 'user rates v2'},
  ],
})
