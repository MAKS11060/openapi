import {registry} from './registry.ts'
import {BadRequestSchema, ForbiddenSchema, NotFoundSchema, UnauthorizedSchema} from './schema.ts'

// 400
export const BadRequestResponse = registry.registerComponent('responses', 'BadRequest', {
  description: 'The given parameters could not be parsed',
  content: {
    'application/json': {
      schema: BadRequestSchema.ref,
    },
  },
})

// 401
export const UnauthorizedResponse = registry.registerComponent('responses', 'Unauthorized', {
  description: 'Authentication failed',
  content: {
    'application/json': {
      schema: UnauthorizedSchema.ref,
    },
  },
})

// 403
export const ForbiddenResponse = registry.registerComponent('responses', 'Forbidden', {
  description: 'Access denied',
  content: {
    'application/json': {
      schema: ForbiddenSchema.ref,
    },
  },
})

// 404
export const NotFoundResponse = registry.registerComponent('responses', 'NotFound', {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: NotFoundSchema.ref,
    },
  },
})
