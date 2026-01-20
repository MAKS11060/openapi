import {z} from 'zod'

// --- shared ---
export const limit = z.int().positive().max(100).describe('The number of results to show per page')
export const page = z.int().positive().min(1).describe('The number of results to show per page')
export const only = z.string().describe('Determines the list of attributes that will be returned')

export const ID = z.int().positive().min(1).describe('The ID')

// --- Posts ---
export const fileExt = z.enum(['jpg', 'png', 'gif', 'avif', 'mp4', 'webp', 'webm', 'swf', 'zip']) // TODO: remove unused

export const rating = z.enum({
  General: 'g',
  Sensitive: 's',
  Questionable: 'q',
  Explicit: 'e',
}).describe('The rating of the post')

export const tagType = z.enum({
  General: 'general',
  Artist: 'artist',
  Copyright: 'copyright',
  Character: 'character',
  circle: 'circle', // TODO: it needs to be deleted, but it appears in the response
})

export const tagCategory = z.enum({
  General: 0,
  Artist: 1,
  Copyright: 3,
  Character: 4,
})

export const status = z.enum({ // TODO: add more
  Active: 'active',
})

export const post = z.object({
  id: ID.describe('The post ID'),
  tags: z.string(),
  created_at: z.int().positive().describe('The timestamp when the post was created'),
  updated_at: z.int().positive().describe('The timestamp when the post was last updated'),
  creator_id: ID,
  approver_id: ID.nullable(),
  author: z.string(),
  change: z.int().positive(),
  source: z.string(),
  score: z.int().positive(),
  md5: z.string(),
  is_shown_in_index: z.boolean(),
  actual_preview_width: z.int().positive(),
  actual_preview_height: z.int().positive(),

  width: z.int().positive(),
  height: z.int().positive(),
  file_url: z.url(),
  file_ext: fileExt,
  file_size: z.int().positive(),

  preview_url: z.url(),
  preview_width: z.int().positive(),
  preview_height: z.int().positive(),

  sample_url: z.url(),
  sample_width: z.int().positive(),
  sample_height: z.int().positive(),
  sample_file_size: z.int().positive(),

  jpeg_url: z.url(),
  jpeg_width: z.int().positive(),
  jpeg_height: z.int().positive(),
  jpeg_file_size: z.int().positive(),

  status,
  rating,
  is_rating_locked: z.boolean(),
  has_children: z.boolean(),
  parent_id: ID.nullable(),
  is_pending: z.boolean(),
  is_held: z.boolean(),
  frames_pending_string: z.string(),
  frames_pending: z.array(z.any()),
  frames_string: z.string(),
  frames: z.array(z.any()),
  is_note_locked: z.boolean(),
  last_noted_at: z.int().positive(),
  last_commented_at: z.int().positive(),
})

export const posts = z.array(post)

export const post_poolPost = z.object({
  id: ID,
  pool_id: ID,
  post_id: ID,
  active: z.boolean(),
  sequence: z.string(),
  next_post_id: ID,
  prev_post_id: ID.nullable(),
})

export const pool = z.object({
  id: ID,
  name: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  user_id: ID,
  is_public: z.boolean(),
  post_count: z.int().positive(),
  description: z.string(),
})

export const pools = z.array(post_poolPost)

export const postV2 = z.object({
  posts,
  pool_posts: z.array(post_poolPost).optional(),
  pools: z.array(pool).optional(),
  tags: z.record(z.string(), tagType).optional(),
})

// --- Tags ---
export const tag = z.object({
  id: ID,
  name: z.string(),
  count: z.number(),
  type: tagCategory,
  ambiguous: z.boolean(),
})

export const tags = z.array(tag)
export const tagRelated = z.record(
  z.string(),
  z.tuple([
    tag.shape.name,
    z.string().describe('number in string format'), // TODO
  ]),
)

// --- Artists ---
export const artist = z.object({
  id: ID,
  name: z.string(),
  alias_id: ID.nullable(),
  group_id: ID.nullable(),
  urls: z.url().array(),
})

export const artists = z.array(artist)

// --- Users ---
export const user = z.object({
  id: ID,
  name: z.string(),
})

export const users = z.array(artist)

// --- Pools ---
export const poolPosts = pool.extend({
  posts,
})
