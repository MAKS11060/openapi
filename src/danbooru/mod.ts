import {OpenApiGeneratorV31} from '@asteasolutions/zod-to-openapi'
import {registry} from './registry.ts'
import {PostsSchema} from './schema.ts'

// Security
const basicAuth = registry.registerComponent('securitySchemes', 'basicAuth', {
  type: 'http',
  scheme: 'basic',
})
const auth = {[basicAuth.name]: []}

//
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
  },
})

registry.registerPath({
  tags: ['posts'],
  method: 'get',
  path: '/posts/random.json',
  parameters: [ParametersQueryTags.ref, ParametersQueryLimit.ref],
  responses: {
    200: {
      description: 'Get random posts',
      content: {
        'application/json': {
          schema: PostsSchema,
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
