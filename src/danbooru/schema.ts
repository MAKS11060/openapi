import {z} from 'zod'

// --- error ---
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

// --- shared ---
export const limit = z.int().positive().max(1000).describe('The number of results to show per page')
export const page = z.int().positive().min(1).describe('The number of results to show per page')
export const only = z.string().describe('Determines the list of attributes that will be returned')

export const ID = z.int().positive().min(1).describe('The ID')

// --- Tag ---
export const tagCategory = z.enum({
  General: 0,
  Artist: 1,
  Copyright: 3,
  Character: 4,
  Meta: 5,
}).describe('https://danbooru.donmai.us/wiki_pages/api%3Atags#:~:text=timestamp-,Category,-Value')

export const tag = z.object({
  id: ID.describe('Tag ID'),
  name: z.string(),
  post_count: z.number().positive(),
  category: tagCategory,
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  is_deprecated: z.boolean(),
  words: z.string().array(),

  // Associated attributes / https://danbooru.donmai.us/wiki_pages/api%3Atags
  get wiki_page() {
    return wikiPage.optional()
  },
  get artist() {
    return artist.optional()
  },
  antecedent_alias: z.string().optional(),
  consequent_aliases: z.string().optional(),
  antecedent_implications: z.string().optional(),
  dtext_links: z.string().optional(),
})

export const tags = tag.array()

// --- Wiki ---
export const wikiPage = z.object({
  id: ID.describe('Wiki ID'),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  title: z.string(),
  body: z.string(),
  is_locked: z.boolean(),
  other_names: z.string().array(),
  is_deleted: z.boolean(),
})

// --- Artist --- https://danbooru.donmai.us/wiki_pages/api%3Aartists
export const artistUrl = z.object({
  id: ID.describe('Artist URL ID'),
  artist_id: ID.describe('The Artist ID'),
  url: z.url(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  is_active: z.boolean(),
})

export const artistUrls = artistUrl.array()

export const artist = z.object({
  id: ID.describe('Artist ID'),
  name: z.string(),
  group_name: z.string(),
  other_names: z.string().array(),
  is_banned: z.boolean(),
  is_deleted: z.boolean(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),

  // Associated
  members: z.array(z.any()).optional(),
  urls: artistUrl.array().optional(),
  wiki_page: wikiPage.optional(),
  tag_alias: z.any().optional(),
  tag: tag.optional(),
})

export const artists = artist.array()

// --- Media Asset ---
export const mediaAssetVariant = z.object({
  type: z.string(),
  url: z.url(),
  width: z.int().positive(),
  height: z.int().positive(),
  file_ext: z.string(),
})

export const mediaAsset = z.object({
  id: ID.describe('Asset ID'),
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

export const mediaAssets = z.array(mediaAsset)

export const mediaMetadata = z.object({
  id: ID.describe('Media Metadata ID'),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  media_asset_id: mediaAsset.shape.id,
  metadata: z.record(z.string(), z.unknown()),
})

export const mediaMetadataList = z.array(mediaMetadata)

// --- Posts --- https://danbooru.donmai.us/wiki_pages/api%3Aposts
export const fileType = z.enum(['jpg', 'png', 'gif', 'avif', 'mp4', 'webp', 'webm', 'swf', /* 'ugoira', */ 'zip'])

export const rating = z.enum({
  General: 'g',
  Sensitive: 's',
  Questionable: 'q',
  Explicit: 'e',
}).describe('The rating of the post')

export const postID = ID.describe('The post ID')

export const post = z.object({
  id: postID,

  // source
  source: z.string().describe('The source of the post'),
  pixiv_id: z.int().nullish().describe('The Pixiv ID of the post'),

  // file
  md5: z.string().describe('The MD5 hash of the file'),

  file_ext: fileType.describe('The file extension'),
  file_size: z.int().describe('The size of the file'),

  file_url: z.url().describe('The URL of the file'),
  large_file_url: z.url().describe('The URL of the large file'),
  preview_file_url: z.url().describe('The URL of the preview file'),

  media_asset: mediaAsset.describe('The media asset associated with the post'),
  image_height: z.int().describe('The height of the image'),
  image_width: z.int().describe('The width of the image'),

  // meta
  created_at: z.iso.datetime().describe('The timestamp when the post was created'),
  updated_at: z.iso.datetime().describe('The timestamp when the post was last updated'),

  uploader_id: z.int().min(1).describe('The ID of the user who uploaded the post'),
  approver_id: z.int().nullish().describe('The ID of the user who approved the post'),
  parent_id: postID.describe('The ID of the parent post'),

  // stats
  rating: rating.nullable(),
  score: z.int().describe('The score of the post'),
  up_score: z.int().describe('The up score of the post'),
  down_score: z.int().describe('The down score of the post'),
  fav_count: z.int().describe('The number of favorites'),

  // tags
  tag_string: z.string().describe('The tags associated with the post'),
  tag_string_general: z.string().describe('The general tags associated with the post'),
  tag_string_artist: z.string().describe('The artist tags associated with the post'),
  tag_string_copyright: z.string().describe('The copyright tags associated with the post'),
  tag_string_character: z.string().describe('The character tags associated with the post'),
  tag_string_meta: z.string().describe('The meta tags associated with the post'),

  tag_count: z.int().describe('The total number of tags'),
  tag_count_general: z.int().describe('The number of general tags'),
  tag_count_artist: z.int().describe('The number of artist tags'),
  tag_count_copyright: z.int().describe('The number of copyright tags'),
  tag_count_character: z.int().describe('The number of character tags'),
  tag_count_meta: z.int().describe('The number of meta tags'),

  last_comment_bumped_at: z.iso.datetime().nullish().describe('The timestamp when the last comment was bumped'),
  last_commented_at: z.iso.datetime().nullish().describe('The timestamp when the last comment was added'),
  last_noted_at: z.iso.datetime().nullish().describe('The timestamp when the last note was added'),

  has_active_children: z.boolean().describe('Indicates whether the post has active children'),
  has_children: z.boolean().describe('Indicates whether the post has children'),
  has_large: z.boolean().describe('Indicates whether the post has a large version'),
  has_visible_children: z.boolean().describe('Indicates whether the post has visible children'),

  bit_flags: z.int().describe('The bit flags of the post'),

  is_banned: z.boolean().describe('Indicates whether the post is banned'),
  is_deleted: z.boolean().describe('Indicates whether the post is deleted'),
  is_flagged: z.boolean().describe('Indicates whether the post is flagged'),
  is_pending: z.boolean().describe('Indicates whether the post is pending'),

  // Associated
  get uploader() {
    return user.optional()
  },
  get updater() {
    return user.optional()
  },
  get approver() {
    return user.optional()
  },
  get parent() {
    return post.optional()
  },
  get children() {
    return post.array().optional()
  },
  // get artist_commentary() {	return artist_commentary	optional	},
  // get notes() {	return note.array().optional()	},
  // get comments() {	return comment.array().optional()	},
  // get flags() { return	post flag	.array().optional()	},
  // get appeals() { return	post appeals	.array().optional()	},
  // get approvals() { return	post approval	.array().optional()	},
  // get replacements() { return	post replacement	.array().optional()	},
  // get pixiv_ugoira_frame_data() { return	Pixiv ugoira frame data	.optional()	},
})

export const posts = z.array(post)

export const postsLimit = limit.max(200)

// --- Users --- https://danbooru.donmai.us/wiki_pages/api%3Ausers
export const userID = ID.describe('The User ID')

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

// --- Autocomplete --- // TODO: optimize schema
export const autocompleteArtist = z
  .object({
    type: z.literal('tag').describe('The type of the autocomplete item, must be "tag"'),
    label: z.string().describe('The label of the autocomplete item'),
    value: z.string().describe('The value of the autocomplete item'),
    category: z.literal(tagCategory.enum.Artist)
      .describe('The category of the autocomplete item, must be 1 for artists'),
  })
  .describe('Schema for autocomplete artist items')

export const autocompleteArtists = z.array(autocompleteArtist)

export const autocompleteTag = z
  .object({
    type: z.literal('tag-word').describe('The type of the autocomplete item, must be "tag-word"'),
    label: z.string().describe('The label of the autocomplete item'),
    value: z.string().describe('The value of the autocomplete item'),
    category: tagCategory.describe('The category of the autocomplete item, includes [0, 1, 3, 4, 5]'),
    post_count: z.int().positive().describe('The count of posts associated with the tag, must be >= 0'),
    tag,
  })
  .describe('Schema for autocomplete tag items')

export const autocompleteTags = z.array(autocompleteTag)

export const autocompleteUser = z
  .object({
    type: z.literal('user').describe('The type of the autocomplete item, must be "user"'),
    label: z.string().describe('The label of the autocomplete item'),
    value: z.string().describe('The value of the autocomplete item'),
    id: userID,
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

// --- Iqdb ---
export const iqdbResult = z.object({
  hash: z.string(),
  post_id: postID,
  score: z.number().min(0).max(100),
  signature: z.object({
    avglf: z.tuple([z.number(), z.number(), z.number()]),
    sig: z.tuple([
      z.array(z.number()),
      z.array(z.number()),
      z.array(z.number()),
    ]),
  }),
  post,
})

// --- Source ---
export const source = z.object({
  page_url: z.string().nullable(),
  image_urls: z.string().array(),
  artist: z.object({
    display_name: z.string().nullable(),
    username: z.string().nullable(),
    profile_urls: z.string().array(),
    artists: z.array(
      artist.pick({
        id: true,
        name: true,
      }),
    ),
  }),
  tags: z.array(z.string().array()),
  artist_commentary: z.object({
    title: z.string().nullable(),
    description: z.string().nullable(),
    dtext_title: z.string().nullable(),
    dtext_description: z.string().nullable(),
  }),
})
