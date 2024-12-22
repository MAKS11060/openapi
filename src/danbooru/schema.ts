import {z} from 'zod'
import {registry} from './registry.ts'

// Errors
export const BadRequestSchema = registry.registerComponent('schemas', 'BadRequest', {
  description: 'The given parameters could not be parsed',
})
export const UnauthorizedSchema = registry.registerComponent('schemas', 'Unauthorized', {
  description: 'Authentication failed',
})
export const ForbiddenSchema = registry.registerComponent('schemas', 'Forbidden', {
  description: 'Access denied',
})
export const NotFoundSchema = registry.registerComponent('schemas', 'NotFound', {})

registry.register(
  'NotFound',
  z
    .object({
      success: z.boolean(),
      error: z.string(),
      message: z.string(),
    })
    .describe('Not found')
)

// Posts
const rating = z.enum(['g', 's', 'q', 'e']).nullable().describe('The rating of the post')

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

    last_comment_bumped_at: z
      .string()
      .datetime()
      .nullable()
      .optional()
      .describe('The timestamp when the last comment was bumped'),
    last_commented_at: z
      .string()
      .datetime()
      .nullable()
      .optional()
      .describe('The timestamp when the last comment was added'),

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

// Users
export const UserSchema = z
  .object({
    id: z.number().int().positive().describe('The record ID, must be greater than 0'),
    name: z.string().describe('The name of the record'),
    level: z.enum(['10', '20', '30', '31', '32', '40', '50']).describe('The level of the record'),
    inviter_id: z.number().int().positive().nullable().describe('The ID of the inviter, must be greater than 0'),
    post_update_count: z.number().int().describe('The count of post updates'),
    note_update_count: z.number().int().describe('The count of note updates'),
    post_upload_count: z.number().int().describe('The count of post uploads'),
    favorite_count: z.number().int().describe('The count of favorites'),
    unread_dmail_count: z.number().int().describe('The count of unread direct messages'),
    is_banned: z.boolean().describe('Indicates whether the record is banned'),
    bit_prefs: z.number().int().describe('Bit preferences, each bit stores a boolean value'),
    theme: z.enum(['light', 'dark']).describe('The theme of the record'),
    favorite_tags: z.string().describe('The favorite tags of the record'),
    blacklisted_tags: z.string().describe('The blacklisted tags of the record'),
    comment_threshold: z.number().int().describe('The comment threshold of the record'),
    timezone: z.string().describe('The timezone of the record'),
    per_page: z.number().int().min(1).max(200).describe('The number of items per page, must be between 1 and 200'),
    default_image_size: z.enum(['large', 'original']).describe('The default image size of the record'),
    custom_css: z.string().describe('The custom CSS of the record'),
    upload_points: z.number().int().describe('The upload points of the record'),
    last_forum_read_at: z.string().datetime().describe('The timestamp when the forum was last read'),
    last_logged_in_at: z.string().datetime().describe('The timestamp when the user last logged in'),
    created_at: z.string().datetime().describe('The timestamp when the record was created'),
    updated_at: z.string().datetime().describe('The timestamp when the record was last updated'),
  })
  .openapi('User')

export const UsersSchema = z.array(UserSchema).openapi('Users')
