#!/usr/bin/env -S deno run -A --watch-hmr

import {z} from 'npm:zod'
import {registry} from './registry.ts'

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

//
const exampleUserID = registry.registerComponent('examples', 'UserID', {
  description: 'User ID',
  value: 406192,
})

// Schemas
const UserSchema = z
  .object({
    id: z.number().positive().openapi({example: 406192}),
    nickname: z.string(),
    avatar: z.string(),
    image: z.record(
      z.enum(['x160', 'x148', 'x80', 'x64', 'x48', 'x32', 'x16']),
      z.string()
    ),
    last_online_at: z.string().datetime(),
    url: z.string(),
  })
  .openapi('User')

const UsersSchema = z.array(UserSchema).openapi('Users')

const UserInfoSchema = UserSchema.merge(
  z.object({
    name: z.string().nullable(),
    sex: z.string().nullable(),
    full_years: z.number().nullable(),
    last_online: z.string().nullable(),
    website: z.string().nullable(),
  })
).openapi('UserInfo')

const usersQueryParams = z
  .object({
    page: z.number().min(1).max(100000).optional(),
    limit: z.number().min(1).max(100).optional(),
    search: z.string().optional(),
  })
  .openapi('UsersQuery', {
    param: {
      in: 'query',
      name: 'UsersQuery',
    },
  })

registry.register('Users', UsersSchema)

// Parameters
registry.registerParameter('UsersQuery', usersQueryParams)

const UserIdSchema = registry.registerParameter(
  'UserId',
  z
    .number()
    .positive()
    .openapi('UserID',{
      param: {
        in: 'path',
        name: 'id',
      },
      example: 406192,
      default: 406192,
    })
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

// registry.registerPath({
//   tags: ['users'],
//   path: '/api/users/whoami',
//   method: 'get',
//   security: [auth],
//   responses: {
//     200: {
//       description: 'Show an user',
//       content: {
//         'application/json': {
//           schema: UserInfoSchema,
//         },
//       },
//     },
//   },
// })
