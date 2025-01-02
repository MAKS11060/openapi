import {OpenAPIRegistry} from '@asteasolutions/zod-to-openapi'
import z from 'zod'

export const registerComponentSchemas = (registry: OpenAPIRegistry, refId: string, schema: z.Schema) => {
  registry.register(refId, schema)
  return registry.registerComponent('schemas', refId, {})
}
