import {z} from 'zod'

export const rating = z
  .enum(['g', 's', 'q', 'e'])
  .nullable()
  .describe('The rating of the post')

const mediaAssetVariantSchema = z.object({
  type: z.string(),
  url: z.string().url(),
  width: z.number().int(),
  height: z.number().int(),
  file_ext: z.string(),
})

const mediaAssetSchema = z.object({
  id: z.number().int(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  md5: z.string(),
  file_ext: z.string(),
  file_size: z.number().int(),
  image_width: z.number().int(),
  image_height: z.number().int(),
  duration: z.number().nullable().optional(),
  status: z.string(),
  file_key: z.string(),
  is_public: z.boolean(),
  pixel_hash: z.string(),
  variants: z.array(mediaAssetVariantSchema),
})

// export const PostSchema = z
//   .object({
//     id: z.number().int().min(1).describe('The post ID'),
//     uploader_id: z
//       .number()
//       .int()
//       .min(1)
//       .describe('The ID of the user who uploaded the post'),
//     approver_id: z
//       .number()
//       .int()
//       .min(1)
//       .describe('The ID of the user who approved the post'),
//     tag_string: z.string().describe('The tags associated with the post'),
//     tag_string_general: z
//       .string()
//       .describe('The general tags associated with the post'),
//     tag_string_artist: z
//       .string()
//       .describe('The artist tags associated with the post'),
//     tag_string_copyright: z
//       .string()
//       .describe('The copyright tags associated with the post'),
//     tag_string_character: z
//       .string()
//       .describe('The character tags associated with the post'),
//     tag_string_meta: z
//       .string()
//       .describe('The meta tags associated with the post'),
//     rating,
//     parent_id: z
//       .number()
//       .int()
//       .min(1)
//       .nullable()
//       .optional()
//       .describe('The ID of the parent post'),
//     source: z.string().describe('The source of the post'),
//     md5: z.string().describe('The MD5 hash of the file'),
//     file_url: z.string().describe('The URL of the file'),
//     large_file_url: z.string().describe('The URL of the large file'),
//     preview_file_url: z.string().describe('The URL of the preview file'),
//     file_ext: z.string().describe('The file extension'),
//     file_size: z.number().int().describe('The size of the file'),
//     image_width: z.number().int().describe('The width of the image'),
//     score: z.number().int().describe('The score of the post'),
//     fav_count: z.number().int().describe('The number of favorites'),
//     tag_count_general: z.number().int().describe('The number of general tags'),
//     tag_count_artist: z.number().int().describe('The number of artist tags'),
//     tag_count_copyright: z
//       .number()
//       .int()
//       .describe('The number of copyright tags'),
//     tag_count_character: z
//       .number()
//       .int()
//       .describe('The number of character tags'),
//     tag_count_meta: z.number().int().describe('The number of meta tags'),
//     last_comment_bumped_at: z
//       .string()
//       .datetime()
//       .nullable()
//       .optional()
//       .describe('The timestamp when the last comment was bumped'),
//     last_noted_at: z
//       .string()
//       .datetime()
//       .nullable()
//       .optional()
//       .describe('The timestamp when the last note was added'),
//     has_children: z
//       .boolean()
//       .describe('Indicates whether the post has children'),
//     image_height: z.number().int().describe('The height of the image'),
//     created_at: z
//       .string()
//       .datetime()
//       .describe('The timestamp when the post was created'),
//     updated_at: z
//       .string()
//       .datetime()
//       .describe('The timestamp when the post was last updated'),
//   })
//   .openapi('Post')

export const PostSchema = z
  .object({
    id: z.number().int().min(1).describe('The post ID'),
    uploader_id: z.number().int().min(1).describe('The ID of the user who uploaded the post'),
    approver_id: z.number().int().nullable().optional().describe('The ID of the user who approved the post'),

    tag_string: z.string().describe('The tags associated with the post'),
    tag_string_general: z.string().describe('The general tags associated with the post'),
    tag_string_artist: z.string().describe('The artist tags associated with the post'),
    tag_string_copyright: z.string().describe('The copyright tags associated with the post'),
    tag_string_character: z.string().describe('The character tags associated with the post'),
    tag_string_meta: z.string().describe('The meta tags associated with the post'),

    rating,
    parent_id: z.number().int().nullable().optional().describe('The ID of the parent post'),
    source: z.string().url().describe('The source of the post'),
    md5: z.string().describe('The MD5 hash of the file'),
    file_ext: z.string().describe('The file extension'),
    file_size: z.number().int().describe('The size of the file'),
    file_url: z.string().url().describe('The URL of the file'),
    large_file_url: z.string().url().describe('The URL of the large file'),
    preview_file_url: z.string().url().describe('The URL of the preview file'),

    score: z.number().int().describe('The score of the post'),
    fav_count: z.number().int().describe('The number of favorites'),

    tag_count: z.number().int().describe('The total number of tags'),
    tag_count_general: z.number().int().describe('The number of general tags'),
    tag_count_artist: z.number().int().describe('The number of artist tags'),
    tag_count_copyright: z.number().int().describe('The number of copyright tags'),
    tag_count_character: z.number().int().describe('The number of character tags'),
    tag_count_meta: z.number().int().describe('The number of meta tags'),

    image_width: z.number().int().describe('The width of the image'),
    image_height: z.number().int().describe('The height of the image'),
    created_at: z.string().datetime().describe('The timestamp when the post was created'),
    updated_at: z.string().datetime().describe('The timestamp when the post was last updated'),

    last_comment_bumped_at: z.string().datetime().nullable().optional().describe('The timestamp when the last comment was bumped'),
    last_commented_at: z.string().datetime().nullable().optional().describe('The timestamp when the last comment was added'),

    media_asset: mediaAssetSchema.describe('The media asset associated with the post'),

    bit_flags: z.number().int().describe('The bit flags of the post'),
    down_score: z.number().int().describe('The down score of the post'),
    has_active_children: z.boolean().describe('Indicates whether the post has active children'),
    has_children: z.boolean().describe('Indicates whether the post has children'),
    has_large: z.boolean().describe('Indicates whether the post has a large version'),
    has_visible_children: z.boolean().describe('Indicates whether the post has visible children'),
    is_banned: z.boolean().describe('Indicates whether the post is banned'),
    is_deleted: z.boolean().describe('Indicates whether the post is deleted'),
    is_flagged: z.boolean().describe('Indicates whether the post is flagged'),
    is_pending: z.boolean().describe('Indicates whether the post is pending'),
    last_noted_at: z.string().datetime().nullable().optional().describe('The timestamp when the last note was added'),
    pixiv_id: z.number().int().nullable().optional().describe('The Pixiv ID of the post'),
    up_score: z.number().int().describe('The up score of the post'),
  })
  .openapi('Post')

export const PostsSchema = z.array(PostSchema).openapi('Posts')
