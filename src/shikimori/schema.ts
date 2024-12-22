import {z} from 'zod'

export const shikimoriKind = z.enum(['anime', 'manga'])
export const shikimoriTargetType = z.enum(['Anime', 'Mange'])
export const shikimoriStatus = z.enum([
  'planned',
  'watching',
  'rewatching',
  'completed',
  'on_hold',
  'dropped',
])

export const UserSchema = z
  .object({
    id: z.number().positive().openapi({example: 406192}),
    nickname: z.string(),
    avatar: z.string(),
    image: z.record(
      z.enum(['x160', 'x148', 'x80', 'x64', 'x48', 'x32', 'x16']),
      z.string()
    ),
    last_online_at: z.string().datetime(),
    url: z.string(),
  })
  .openapi('User')

export const UsersSchema = z.array(UserSchema).openapi('Users')

export const UserInfoSchema = UserSchema.merge(
  z.object({
    name: z.string().nullable(),
    sex: z.string().nullable(),
    full_years: z.number().nullable(),
    last_online: z.string().nullable(),
    website: z.string().nullable(),
  })
).openapi('UserInfo')

// Query
export const usersQueryParams = z
  .object({
    page: z.number().min(1).max(100000).optional(),
    limit: z.number().min(1).max(100).optional(),
    search: z.string().optional(),
  })
  .openapi('UsersQuery', {
    param: {
      in: 'query',
      name: 'UsersQuery',
    },
  })

// Param
export const UserIdParamSchema = z
  .number()
  .positive()
  .openapi('UserID', {
    param: {
      in: 'path',
      name: 'id',
    },
    example: 406192,
    default: 406192,
  })
