import {OpenApiGeneratorV31} from '@asteasolutions/zod-to-openapi'
import {z} from "zod"
import {registry} from './registry.ts'
import {BadRequestResponse, NotFoundResponse, UnauthorizedResponse} from './responses.ts'
import {PostSchema, PostsSchema, UserSchema, UsersSchema} from './schema.ts'

// Security
const basicAuth = registry.registerComponent('securitySchemes', 'basicAuth', {
  type: 'http',
  scheme: 'basic',
})
const auth = {[basicAuth.name]: []}

// Parameters
const ParametersParamId = registry.registerComponent('parameters', 'id', {
  in: 'path',
  name: 'id',
  schema: {
    type: 'integer',
    minimum: 1,
    description: 'The post ID',
  },
})

const ParametersQueryTags = registry.registerComponent('parameters', 'tags', {
  in: 'query',
  name: 'tags',
  style: 'spaceDelimited',
  required: false,
  schema: {
    type: 'string',
    examples: ['search:all', 'ordfav:username'],
  },
})

const ParametersQueryLimit = registry.registerComponent('parameters', 'limit', {
  in: 'query',
  name: 'limit',
  required: false,
  schema: {
    type: 'integer',
    maximum: 200,
  },
})

// Paths
registry.registerPath({
  tags: ['posts'],
  method: 'get',
  path: '/posts.json',
  security: [auth],
  parameters: [ParametersQueryTags.ref, ParametersQueryLimit.ref],
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
  parameters: [ParametersParamId.ref],
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

registry.registerPath({
  tags: ['users'],
  method: 'get',
  path: '/users.json',
  security: [auth],
  parameters: [],
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
      id: z.number().describe('The user ID')
    })
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

const generator = new OpenApiGeneratorV31(registry.definitions)

export const openapi = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    version: '0.0.3',
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
})
