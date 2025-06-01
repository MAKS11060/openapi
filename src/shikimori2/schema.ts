import {z} from "zod"

// Common
export const shikimoriKind = z.enum(['anime', 'manga'])
export const shikimoriTargetType = z.enum(['Anime', 'Mange'])
export const shikimoriStatus = z.enum(['planned', 'watching', 'rewatching', 'completed', 'on_hold', 'dropped'])

// Users
export const UsersSearchQuery = z.object({
  page: z.number().min(1).max(100000).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
})

export const UserID = z //
  .number()
  .positive()
  .describe('The user ID')
  .default(406192)

export const UserSchema = z
  .object({
    id: UserID,
    nickname: z.string(),
    avatar: z.string(),
    image: z.record(z.enum(['x160', 'x148', 'x80', 'x64', 'x48', 'x32', 'x16']), z.string()),
    last_online_at: z.string().datetime(),
    url: z.string(),
  })

export const UsersSchema = z.array(UserSchema)

export const UserInfoSchema = UserSchema.merge(
  z.object({
    name: z.string().nullable(),
    sex: z.string().nullable(),
    full_years: z.number().nullable(),
    last_online: z.string().nullable(),
    website: z.string().nullable(),
  })
)
