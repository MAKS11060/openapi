import { z } from 'zod/v4'

//////////////// Error
export const BadRequest = z.any().describe('The given parameters could not be parsed')
export const unauthorized = z.any().describe('Authentication failed')
export const forbidden = z.any().describe('Access denied')
export const notFound = z
  .object({
    success: z.boolean(),
    error: z.string(),
    message: z.string(),
  })
  .describe('Not found')

////////////////
export const limit = z.int().positive().max(1000).describe('The number of results to show per page')
export const page = z.int().positive().describe('The number of results to show per page')
export const only = z
  .string()
  .describe('Determines the list of attributes that will be returned')

//////////////// Posts
export const fileType = z.enum(['png', 'jpg', 'gif', 'swf', 'webm', 'mp4', 'zip'])
export const rating = z.enum(['g', 's', 'q', 'e']).nullable().describe('The rating of the post')
export const mediaAssetVariant = z.object({
  type: z.string(),
  url: z.url(),
  width: z.int().positive(),
  height: z.int().positive(),
  file_ext: z.string(),
})
export const mediaAsset = z.object({
  id: z.int().positive(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  md5: z.string(),
  file_ext: z.string(),
  file_size: z.int().positive(),
  image_width: z.int().positive(),
  image_height: z.int().positive(),
  duration: z.number().nullish(),
  status: z.string(),
  file_key: z.string(),
  is_public: z.boolean(),
  pixel_hash: z.string(),
  variants: z.array(mediaAssetVariant),
})

export const postID = z.int().min(1).describe('The post ID')
export const post = z.object({
  id: postID,
  uploader_id: z.int().min(1).describe('The ID of the user who uploaded the post'),
  approver_id: z.int().nullish().describe('The ID of the user who approved the post'),

  tag_string: z.string().describe('The tags associated with the post'),
  tag_string_general: z.string().describe('The general tags associated with the post'),
  tag_string_artist: z.string().describe('The artist tags associated with the post'),
  tag_string_copyright: z.string().describe('The copyright tags associated with the post'),
  tag_string_character: z.string().describe('The character tags associated with the post'),
  tag_string_meta: z.string().describe('The meta tags associated with the post'),

  rating,
  parent_id: z.int().nullish().describe('The ID of the parent post'),
  source: z.url().describe('The source of the post'),
  md5: z.string().describe('The MD5 hash of the file'),
  file_ext: fileType.describe('The file extension'),
  file_size: z.int().describe('The size of the file'),
  file_url: z.url().describe('The URL of the file'),
  large_file_url: z.url().describe('The URL of the large file'),
  preview_file_url: z.url().describe('The URL of the preview file'),

  score: z.int().describe('The score of the post'),
  fav_count: z.int().describe('The number of favorites'),

  tag_count: z.int().describe('The total number of tags'),
  tag_count_general: z.int().describe('The number of general tags'),
  tag_count_artist: z.int().describe('The number of artist tags'),
  tag_count_copyright: z.int().describe('The number of copyright tags'),
  tag_count_character: z.int().describe('The number of character tags'),
  tag_count_meta: z.int().describe('The number of meta tags'),

  image_width: z.int().describe('The width of the image'),
  image_height: z.int().describe('The height of the image'),
  created_at: z.iso.datetime().describe('The timestamp when the post was created'),
  updated_at: z.iso.datetime().describe('The timestamp when the post was last updated'),

  last_comment_bumped_at: z.iso.datetime().nullish().describe('The timestamp when the last comment was bumped'),
  last_commented_at: z.iso.datetime().nullish().describe('The timestamp when the last comment was added'),
  last_noted_at: z.iso.datetime().nullish().describe('The timestamp when the last note was added'),

  media_asset: mediaAsset.describe('The media asset associated with the post'),

  up_score: z.int().describe('The up score of the post'),
  down_score: z.int().describe('The down score of the post'),

  pixiv_id: z.int().nullish().describe('The Pixiv ID of the post'),
  bit_flags: z.int().describe('The bit flags of the post'),

  has_active_children: z.boolean().describe('Indicates whether the post has active children'),
  has_children: z.boolean().describe('Indicates whether the post has children'),
  has_large: z.boolean().describe('Indicates whether the post has a large version'),
  has_visible_children: z.boolean().describe('Indicates whether the post has visible children'),

  is_banned: z.boolean().describe('Indicates whether the post is banned'),
  is_deleted: z.boolean().describe('Indicates whether the post is deleted'),
  is_flagged: z.boolean().describe('Indicates whether the post is flagged'),
  is_pending: z.boolean().describe('Indicates whether the post is pending'),
})
export const posts = z.array(post)
export const postsLimit = limit.max(200)

//////////////// Users
export const userID = z.int().positive().describe('The user ID')
export const user = z.object({
  id: userID,
  name: z.string().describe('The name of the user'),
  level: z.enum(['10', '20', '30', '31', '32', '40', '50']).describe('The level of the record'),
  inviter_id: z.int().positive().nullable().describe('The ID of the inviter, must be greater than 0'),
  post_update_count: z.int().describe('The count of post updates'),
  note_update_count: z.int().describe('The count of note updates'),
  post_upload_count: z.int().describe('The count of post uploads'),
  favorite_count: z.int().describe('The count of favorites'),
  unread_dmail_count: z.int().describe('The count of unread direct messages'),
  is_banned: z.boolean().describe('Indicates whether the record is banned'),
  bit_prefs: z.int().describe('Bit preferences, each bit stores a boolean value'),
  theme: z.enum(['light', 'dark']).describe('The theme of the record'),
  favorite_tags: z.string().describe('The favorite tags of the record'),
  blacklisted_tags: z.string().describe('The blacklisted tags of the record'),
  comment_threshold: z.int().describe('The comment threshold of the record'),
  timezone: z.string().describe('The timezone of the record'),
  per_page: z.int().min(1).max(200).describe('The number of items per page, must be between 1 and 200'),
  default_image_size: z.enum(['large', 'original']).describe('The default image size of the record'),
  custom_css: z.string().describe('The custom CSS of the record'),
  upload_points: z.int().describe('The upload points of the record'),
  last_forum_read_at: z.iso.datetime().describe('The timestamp when the forum was last read'),
  last_logged_in_at: z.iso.datetime().describe('The timestamp when the user last logged in'),
  created_at: z.iso.datetime().describe('The timestamp when the record was created'),
  updated_at: z.iso.datetime().describe('The timestamp when the record was last updated'),
})
export const users = z.array(user)

//////////////// Autocomplete
export const autocompleteArtist = z
  .object({
    type: z.literal('tag').describe('The type of the autocomplete item, must be "tag"'),
    label: z.string().describe('The label of the autocomplete item'),
    value: z.string().describe('The value of the autocomplete item'),
    category: z.literal(1).describe('The category of the autocomplete item, must be 1 for artists'),
  })
  .describe('Schema for autocomplete artist items')

export const autocompleteArtists = z.array(autocompleteArtist)

export const autocompleteTag = z
  .object({
    type: z.literal('tag-word').describe('The type of the autocomplete item, must be "tag-word"'),
    label: z.string().describe('The label of the autocomplete item'),
    value: z.string().describe('The value of the autocomplete item'),
    category: z
      .union([
        z.literal(0).describe('General category'),
        z.literal(1).describe('Artist category'),
        z.literal(3).describe('Copyright category'),
        z.literal(4).describe('Character category'),
        z.literal(5).describe('Meta category'),
      ])
      .describe('The category of the autocomplete item, includes [0, 1, 3, 4, 5]'),
    post_count: z.int().positive().describe('The count of posts associated with the tag, must be >= 0'),
  })
  .describe('Schema for autocomplete tag items')

export const autocompleteTags = z.array(autocompleteTag)

export const autocompleteUser = z
  .object({
    type: z.literal('user').describe('The type of the autocomplete item, must be "user"'),
    label: z.string().describe('The label of the autocomplete item'),
    value: z.string().describe('The value of the autocomplete item'),
    id: z.int().positive().describe('The ID of the user, must be greater than 0'),
    level: z.enum(['member', 'gold', 'platinum', 'builder', 'admin']).describe('The level of the user'),
  })
  .describe('Schema for autocomplete user items')

export const autocompleteUsers = z.array(autocompleteUser)

export const autocomplete = z.union([
  //
  autocompleteArtists,
  autocompleteTags,
  autocompleteUsers,
])
