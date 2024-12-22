import {registry} from './registry.ts'
import {BadRequestSchema, ForbiddenSchema, NotFoundSchema, UnauthorizedSchema} from './schema.ts'

export const BadRequestResponse = registry.registerComponent('responses', 'BadRequest', {
  description: 'The given parameters could not be parsed',
  content: {
    'application/json': {
      schema: BadRequestSchema.ref,
    },
  },
})

export const UnauthorizedResponse = registry.registerComponent('responses', 'Unauthorized', {
  description: 'Authentication failed',
  content: {
    'application/json': {
      schema: UnauthorizedSchema.ref,
    },
  },
})

export const ForbiddenResponse = registry.registerComponent('responses', 'Forbidden', {
  description: 'Access denied',
  content: {
    'application/json': {
      schema: ForbiddenSchema.ref,
    },
  },
})

export const NotFoundResponse = registry.registerComponent('responses', 'NotFound', {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: NotFoundSchema.ref,
    },
  },
})
