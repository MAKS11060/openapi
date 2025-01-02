import {z} from 'zod'
import {registry} from './registry.ts'
import {registerComponentSchemas} from '../helper.ts'

// 400
export const BadRequestSchema = registry.registerComponent('schemas', 'BadRequest', {
  description: 'The given parameters could not be parsed',
})

// 401
export const UnauthorizedSchema = registerComponentSchemas(
  registry,
  'Unauthorized',
  z
    .object({
      error: z.string().openapi({example: 'invalid_token'}),
      error_description: z.string().openapi({example: 'The access token is invalid'}),
      state: z.string().openapi({example: 'unauthorized'}),
    })
    .describe('Authentication failed')
)

// 403
export const ForbiddenSchema = registry.registerComponent('schemas', 'Forbidden', {
  description: 'Access denied',
})

// 404
export const NotFoundSchema = registerComponentSchemas(
  registry,
  'NotFound',
  z
    .object({
      message: z.string(),
      code: z.number().openapi({example: 404}),
    })
    .describe('Not found')
)

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
  .openapi('UserID', {
    default: 406192,
  })

export const UserSchema = z
  .object({
    id: UserID,
    nickname: z.string(),
    avatar: z.string(),
    image: z.record(z.enum(['x160', 'x148', 'x80', 'x64', 'x48', 'x32', 'x16']), z.string()),
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

// UserRates
export const userRatesSchema = z
  .object({
    id: z.number().positive(),
    user_id: UserID,
    target_id: z.number().positive(),
    target_type: shikimoriTargetType,
    score: z.number().min(0).max(10),
    status: shikimoriStatus,
    rewatches: z.number(),
    episodes: z.number(),
    volumes: z.number(),
    chapters: z.number(),
    text: z.string().nullable(),
    text_html: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  })
  .openapi('UserRates')

export const userRatesArraySchema = z.array(userRatesSchema)

// Animes
export const AnimeID = z //
  .number()
  .int()
  .positive()
  .describe('The ID of the anime')
  .openapi('AnimeID', {example: 21})

const ImageSchema = z.object({
  original: z.string().describe('The URL of the original image'),
  preview: z.string().describe('The URL of the preview image'),
  x96: z.string().describe('The URL of the 96x96 image'),
  x48: z.string().describe('The URL of the 48x48 image'),
})

export const AnimeSchema = z
  .object({
    id: AnimeID,
    name: z.string().describe('The name of the anime'),
    russian: z.string().describe('The Russian name of the anime'),
    image: ImageSchema.describe('The image details of the anime'),
    url: z.string().describe('The URL of the anime'),
    kind: z.string().describe('The kind of the anime (e.g., tv)'),
    score: z.string().describe('The score of the anime'),
    status: z.string().describe('The status of the anime (e.g., released)'),
    episodes: z.number().int().nonnegative().describe('The total number of episodes'),
    episodes_aired: z.number().int().nonnegative().describe('The number of episodes aired'),
    aired_on: z.string().datetime().describe('The date when the anime aired'),
    released_on: z.string().datetime().nullable().optional().describe('The date when the anime was released'),
    // full
    rating: z.string().describe('The rating of the anime'),
    english: z.array(z.string().nullable().optional()).describe('The English names of the anime'),
    japanese: z.array(z.string().nullable().optional()).describe('The Japanese names of the anime'),
    synonyms: z.array(z.string()).describe('The synonyms of the anime'),
    license_name_ru: z.string().nullable().optional().describe('The Russian license name of the anime'),
    duration: z.number().int().nonnegative().describe('The duration of the anime'),
    description: z.string().nullable().optional().describe('The description of the anime'),
    description_html: z.string().describe('The HTML description of the anime'),
    description_source: z.string().nullable().optional().describe('The source of the description'),
    franchise: z.string().nullable().optional().describe('The franchise of the anime'),
    favoured: z.boolean().describe('Indicates whether the anime is favoured'),
    anons: z.boolean().describe('Indicates whether the anime is anons'),
    ongoing: z.boolean().describe('Indicates whether the anime is ongoing'),
    thread_id: z.number().int().describe('The thread ID of the anime'),
    topic_id: z.number().int().describe('The topic ID of the anime'),
    myanimelist_id: z.number().int().describe('The MyAnimeList ID of the anime'),
    rates_scores_stats: z.array(z.unknown()).describe('The rates scores stats of the anime'),
    rates_statuses_stats: z.array(z.unknown()).describe('The rates statuses stats of the anime'),
    updated_at: z.string().datetime().describe('The timestamp when the anime was last updated'),
    next_episode_at: z
      .string()
      .datetime()
      .nullable()
      .optional()
      .describe('The timestamp when the next episode will air'),
    fansubbers: z.array(z.unknown()).describe('The fansubbers of the anime'),
    fandubbers: z.array(z.unknown()).describe('The fandubbers of the anime'),
    licensors: z.array(z.unknown()).describe('The licensors of the anime'),
    genres: z.array(z.unknown()).describe('The genres of the anime'),
    studios: z.array(z.unknown()).describe('The studios of the anime'),
    videos: z.array(z.unknown()).describe('The videos of the anime'),
    screenshots: z.array(z.unknown()).describe('The screenshots of the anime'),
    user_rate: z.number().nullable().optional().describe('The user rate of the anime'),
  })
  .openapi('Anime')

export const AnimeArraySchema = z
  .array(
    AnimeSchema.pick({
      id: true,
      name: true,
      russian: true,
      image: true,
      url: true,
      kind: true,
      score: true,
      status: true,
      episodes: true,
      episodes_aired: true,
      aired_on: true,
      released_on: true,
    })
  )
  .openapi('AnimeList')

export const AnimeSearchQuery = z
  .object({
    page: z
      .number()
      .int()
      .min(1)
      .max(100000)
      .optional()
      .describe('The page number, must be a number between 1 and 100000'),
    limit: z
      .number()
      .int()
      .max(50)
      .optional()
      .describe('The limit of results per page, must be a number and maximum 50'),
    order: z
      .enum([
        'id',
        'id_desc',
        'ranked',
        'kind',
        'popularity',
        'name',
        'aired_on',
        'episodes',
        'status',
        'random',
        'created_at',
        'created_at_desc',
      ])
      .optional()
      .describe('The order of the results'),
    kind: z
      .enum(['tv', 'movie', 'ova', 'ona', 'special', 'tv_special', 'music', 'pv', 'cm', 'tv_13', 'tv_24', 'tv_48'])
      .optional()
      .describe('The kind of the anime'),
    status: z.enum(['anons', 'ongoing', 'released']).optional().describe('The status of the anime'),
    season: z.string().optional().describe('The season of the anime, e.g., summer_2017, 2016, 2014_2016, 199x'),
    score: z.number().optional().describe('The minimal anime score, must be a number'),
    duration: z.enum(['S', 'D', 'F']).optional().describe('The duration of the anime'),
    rating: z.enum(['none', 'g', 'pg', 'pg_13', 'r', 'r_plus', 'rx']).optional().describe('The rating of the anime'),
    genre: z.string().optional().describe('List of genre ids separated by comma'),
    genre_v2: z.string().optional().describe('List of genre v2 ids separated by comma'),
    studio: z.string().optional().describe('List of studio ids separated by comma'),
    franchise: z.string().optional().describe('List of franchises separated by comma'),
    censored: z.enum(['true', 'false']).optional().describe('Set to false to allow hentai, yaoi and yuri'),
    // mylist: z
    // .enum(['planned', 'watching', 'rewatching', 'completed', 'on_hold', 'dropped'])
    mylist: shikimoriStatus.optional().describe('Status of anime in current user list'),
    ids: z.string().optional().describe('List of anime ids separated by comma'),
    exclude_ids: z.string().optional().describe('List of anime ids separated by comma'),
    search: z.string().optional().describe('Search phrase to filter animes by name'),
  })
  .openapi({externalDocs: {url: 'https://shikimori.one/api/doc/1.0/animes/index'}})
