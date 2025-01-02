#!/usr/bin/env -S deno run -A --watch-hmr

import {extendZodWithOpenApi, OpenApiGeneratorV31, OpenAPIRegistry} from '@asteasolutions/zod-to-openapi'
import {z} from 'zod'
import {YAML} from './src/deps.ts'
import {registerComponentSchemas} from './src/helper.ts'

extendZodWithOpenApi(z)

const registry = new OpenAPIRegistry()

const NotFoundSchema = registerComponentSchemas(
  registry,
  'NotFound',
  z.object({
    error: z.string(),
    message: z.string(),
  })
)

const NotFoundResponse = registry.registerComponent('responses', 'NotFound', {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: NotFoundSchema.ref,
    },
  },
})

registry.registerPath({
  method: 'get',
  path: '/posts',
  responses: {
    200: {
      description: 'Show posts',
      content: {
        'application/json': {
          schema: z.object({
            id: z.number(),
          }),
        },
      },
    },
    404: NotFoundResponse.ref,
  },
})

const generator = new OpenApiGeneratorV31(registry.definitions)
export const openapi = generator.generateDocument({
  openapi: '3.1.0',
  info: {version: '0.0.1', title: 'Test'},
  servers: [{url: '/'}],
})

console.log(YAML.stringify(openapi))
