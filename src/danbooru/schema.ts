import {z} from "zod"

export const PostsSchema = z
  .object({
    id: z.string(),
  })
  .openapi('Posts')

