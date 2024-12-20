import {OpenApiGeneratorV31} from '@asteasolutions/zod-to-openapi'
import {registry} from './registry.ts'
import {PostsSchema} from './schema.ts'

// Security
const basicAuth = registry.registerComponent('securitySchemes', 'basicAuth', {
  type: 'http',
  scheme: 'basic',
})
const auth = {[basicAuth.name]: []}

// Paths
registry.registerPath({
  method: 'get',
  path: '/posts.json',
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
  method: 'get',
  path: '/posts/random.json',
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
