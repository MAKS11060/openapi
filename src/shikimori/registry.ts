import {extendZodWithOpenApi, OpenAPIRegistry} from "npm:@asteasolutions/zod-to-openapi"
import {z} from 'npm:zod'

extendZodWithOpenApi(z)

export const registry = new OpenAPIRegistry()

