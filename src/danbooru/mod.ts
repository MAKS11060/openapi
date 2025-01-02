import {OpenApiGeneratorV31} from '@asteasolutions/zod-to-openapi'
import {z} from 'zod'
import {registry} from './registry.ts'
import {BadRequestResponse, NotFoundResponse, UnauthorizedResponse} from './responses.ts'
import {AutocompleteSchema, LimitSchema, OnlySchema, PageSchema, PostSchema, PostsLimitSchema, PostsSchema, UserSchema, UsersSchema} from './schema.ts'

// Security
const basicAuth = registry.registerComponent('securitySchemes', 'basicAuth', {
  type: 'http',
  scheme: 'basic',
})
const auth = {[basicAuth.name]: []}


// Parameters
const ParametersQueryTags = registry.registerComponent('parameters', 'tags', {
  in: 'query',
  name: 'tags',
  style: 'spaceDelimited',
  required: false,
  schema: {
    additionalProperties: true,
    type: 'string',
    examples: ['order:favcount -rating:e,q age:<7d'],
    externalDocs: {
      url: 'https://danbooru.donmai.us/wiki_pages/help%3Acheatsheet',
      description: 'This cheatsheet describes how to search and tag posts',
    },
  },
})


// Posts
registry.registerPath({
  tags: ['posts'],
  method: 'get',
  path: '/posts.json',
  security: [auth],
  parameters: [ParametersQueryTags.ref],
  request: {
    query: z.object({
      limit: PostsLimitSchema,
      page: PageSchema,
      only: OnlySchema,
    }),
  },
  responses: {
    200: {
      description: 'Posts list',
      content: {
        'application/json': {
          schema: PostsSchema,
        },
      },
    },
    400: BadRequestResponse.ref,
    401: UnauthorizedResponse.ref,
    404: NotFoundResponse.ref,
  },
})

registry.registerPath({
  tags: ['posts'],
  method: 'get',
  path: '/posts/{id}.json',
  security: [auth],
  request: {
    params: z.object({
      id: z.number().int().positive().describe('The post ID'),
    }),
  },
  responses: {
    200: {
      description: 'Show post',
      content: {
        'application/json': {
          schema: PostSchema,
        },
      },
    },
    400: BadRequestResponse.ref,
    401: UnauthorizedResponse.ref,
    404: NotFoundResponse.ref,
  },
})

registry.registerPath({
  tags: ['posts'],
  method: 'get',
  path: '/posts/random.json',
  security: [auth],
  parameters: [ParametersQueryTags.ref],
  responses: {
    200: {
      description: 'Get random post',
      content: {
        'application/json': {
          schema: PostSchema,
        },
      },
    },
    400: BadRequestResponse.ref,
    401: UnauthorizedResponse.ref,
    404: NotFoundResponse.ref,
  },
})

// Users
registry.registerPath({
  tags: ['users'],
  method: 'get',
  path: '/users.json',
  security: [auth],
  parameters: [ParametersQueryTags.ref],
  responses: {
    200: {
      description: 'Get list of users',
      content: {
        'application/json': {
          schema: UsersSchema,
        },
      },
    },
    400: BadRequestResponse.ref,
    401: UnauthorizedResponse.ref,
    404: NotFoundResponse.ref,
  },
})

registry.registerPath({
  tags: ['users'],
  method: 'get',
  path: '/users/{id}.json',
  security: [auth],
  request: {
    query: z.object({
      id: z.number().describe('The user ID'),
    }),
  },
  responses: {
    200: {
      description: 'Get user',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
    400: BadRequestResponse.ref,
    401: UnauthorizedResponse.ref,
    404: NotFoundResponse.ref,
  },
})

// Autocomplete
registry.registerPath({
  tags: ['autocomplete'],
  method: 'get',
  path: '/autocomplete.json',
  security: [],
  request: {
    query: z
      .object({
        'search[type]': z.enum(['tag', 'user', 'artist']).openapi({
          default: 'tag',
        }),
        'search[query]': z.string().openapi({
          example: 'zenless zone zero',
        }),
        limit: LimitSchema.openapi({
          default: 10,
        }),
      })
      .openapi('Autocomplete'),
  },
  responses: {
    200: {
      description: 'Get Autocomplete',
      content: {
        'application/json': {
          schema: AutocompleteSchema,
        },
      },
    },
  },
})

const generator = new OpenApiGeneratorV31(registry.definitions)

export const openapi = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    version: '0.0.4',
    title: 'Danbooru API',
  },
  externalDocs: {
    url: 'https://danbooru.donmai.us/wiki_pages/help:api',
    description: 'Api Wiki',
  },
  servers: [
    {
      url: 'https://danbooru.donmai.us/',
      description: 'Main server',
    },
    {
      url: 'https://testbooru.donmai.us/',
      description: 'Test server',
    },
  ],
  tags: [
    {name: 'posts', externalDocs: {url: 'https://danbooru.donmai.us/wiki_pages/api%3Aposts'}},
    {name: 'users', externalDocs: {url: 'https://danbooru.donmai.us/wiki_pages/api%3Ausers'}},
    {name: 'autocomplete'},
  ],
})
