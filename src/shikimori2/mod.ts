#!/usr/bin/env -S deno run -A --watch

import {z} from 'zod'
import {createOpenApiDoc} from '../deps.ts'
import {shikimoriKind, shikimoriStatus, shikimoriTargetType, UserSchema, UsersSchema} from './schema.ts'

const doc = createOpenApiDoc({
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
  // tags: [
  //
  // {name: 'animes'},
  // {name: 'users'},
  // {name: 'user rates v2'},
  // ],
  tags: {
    animes: {},
    users: {},
    user_rates_v2: {},
  },
})

const auth = doc.addSecuritySchemes('auth', 'oauth2', {
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://shikimori.one/oauth/authorize',
      tokenUrl: 'https://shikimori.one/oauth/token',
      refreshUrl: 'https://shikimori.one/oauth/token',
      scopes: {
        user_rates: '',
        email: '',
        messages: '',
        comments: '',
        topics: '',
        content: '',
        clubs: '',
        friends: '',
        ignores: '',
      },
      // scopes: ['user_rates', 'email', 'messages', 'comments', 'topics', 'content', 'clubs', 'friends', 'ignores'],
    },
  },
})

const BadRequestResponse = doc.addResponses('BadRequest', (t) => {
  t.describe('The given parameters could not be parsed')
  t.content('application/json', {})
})

const UnauthorizedResponse = doc.addResponses('Unauthorized', (t) => {
  t.describe('Authentication failed')
  t.content(
    'application/json',
    z.object({
      error: z.string(),
      error_description: z.string(),
      state: z.string(),
    })
  ).examples('OAuth2 token invalid', {
    value: {
      error: 'invalid_token',
      error_description: 'The access token is invalid',
      state: 'unauthorized',
    },
  })
})

const ForbiddenResponse = doc.addResponses('Forbidden', (t) => {
  t.describe('Access denied')
  t.content('application/json', {})
})

const NotFoundResponse = doc.addResponses('NotFound', (t) => {
  t.describe('Not Found')
  t.content('application/json', {})
})

//
doc.addSchema('MediaKind', shikimoriKind)
doc.addSchema('TargetType', shikimoriTargetType)
doc.addSchema('UserStatus', shikimoriStatus)

const User = doc.addSchema('User', UserSchema)
const Users = doc.addSchema('Users', UsersSchema)
// doc.addSchema('Users', {
//   type: 'array',
//   items: {
//     ...User
//   }
// })

console.log(doc.toYAML())
