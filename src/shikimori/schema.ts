import { z } from 'zod/v4'

//////////////////////////////// Error
export const UnauthorizedSchema = z.object({
  error: z.string(),
  error_description: z.string(),
  state: z.string(),
})
export const NotFoundSchema = z
  .object({
    message: z.string(),
    code: z.number(),
  })
  .describe('Page Not Found')

////////////////
export const ID = z.int().positive().describe('The ID')

//////////////// User
export const userAnimeStatus = z.enum(['planned', 'watching', 'rewatching', 'completed', 'on_hold', 'dropped'])

export const userID = z.int().positive().describe('The user ID').meta({example: 406192})

export const user = z.object({
  id: userID,
  nickname: z.string(),
  avatar: z.string(),
  image: z.record(z.enum(['x160', 'x148', 'x80', 'x64', 'x48', 'x32', 'x16']), z.string()),
  last_online_at: z.iso.datetime(),
  url: z.string(),
})

export const userInfoAdditional = z.object({
  name: z.string().nullable(),
  sex: z.string().nullable(),
  full_years: z.number().nullable(),
  last_online: z.string().nullable(),
  website: z.string().nullable(),
})

export const userInfo = z.object({
  ...user.shape,
  ...userInfoAdditional.shape,
})

//////////////// Users
export const users = z.array(user)

export const usersSearchQuery = z.object({
  page: z.number().min(1).max(100000).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
})

//////////////// UserRates
export const userAnimeTarget = z.enum(['Anime', 'Mange'])
export const userRates = z.object({
  id: z.number().positive().describe('The user rate ID'),
  user_id: userID,
  target_id: z.number().positive(),
  target_type: userAnimeTarget,
  score: z.number().min(0).max(10),
  status: userAnimeStatus,
  rewatches: z.number(),
  episodes: z.number(),
  volumes: z.number(),
  chapters: z.number(),
  text: z.string().nullable(),
  text_html: z.string(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})

export const userRatesList = z.array(userRates)

export const userRatesQuery = z.object({
  user_id: userID,
  target_id: z.number().positive(),
  target_type: userAnimeTarget,
  status: userAnimeStatus,
  page: z.number().min(1).max(100000).optional().describe('This field is ignored when user_id is set'),
  limit: z.number().min(1).max(1000).optional().describe('This field is ignored when user_id is set'),
})

export const userRatesUpdateParams = userRates
  .pick({
    status: true,
    score: true,
    chapters: true,
    episodes: true,
    volumes: true,
    rewatches: true,
    text: true,
  })
  .partial()

export const userRatesCreateParams = z.object({
  user_id: userID,
  target_id: z.number().positive(),
  target_type: userAnimeTarget,
  ...userRatesUpdateParams.shape,
})

//////////////// Anime
export const animeKind = z.enum(['anime', 'manga'])
export const animeRating = z.enum(['none', 'g', 'pg', 'pg_13', 'r', 'r_plus', 'rx'])
export const animeStatus = z.enum(['anons', 'ongoing', 'released'])
export const animeID = z //
  .number()
  .int()
  .positive()
  .describe('The ID of the anime')
  .meta({example: 21})

export const image = z.object({
  original: z.string().describe('The URL of the original image'),
  preview: z.string().describe('The URL of the preview image'),
  x96: z.string().describe('The URL of the 96x96 image'),
  x48: z.string().describe('The URL of the 48x48 image'),
})

export const screenshot = image.pick({
  original: true,
  preview: true,
})
export const screenshots = z.array(screenshot)

const ratesScoresStats = z.array(
  z.object({
    name: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
      z.literal(6),
      z.literal(7),
      z.literal(8),
      z.literal(9),
      z.literal(10),
    ]),
    value: z.int().positive(),
  }).optional(),
)
/*
  {
      "name": "Запланировано",
      "value": 20946
    },
    {
      "name": "Просмотрено",
      "value": 20375
    },
    {
      "name": "Смотрю",
      "value": 66169
    },
    {
      "name": "Брошено",
      "value": 12478
    },
    {
      "name": "Отложено",
      "value": 10402
    }
*/
export const ratesStatusesStatsType_RU = z.enum(['Запланировано', 'Просмотрено', 'Смотрю', 'Брошено', 'Отложено'])
export const ratesStatusesStats = z.array(
  z.object({name: ratesStatusesStatsType_RU, value: z.int().positive()}).optional(),
)

export const anime = z.object({
  id: animeID,
  name: z.string().describe('The name of the anime'),
  russian: z.string().describe('The Russian name of the anime'),
  image: image.describe('The image details of the anime'),
  url: z.string().describe('The URL of the anime'),
  kind: z.string().describe('The kind of the anime (e.g., tv)'),
  score: z.string().describe('The score of the anime'),
  status: z.string().describe('The status of the anime (e.g., released)'),
  episodes: z.int().positive().describe('The total number of episodes'),
  episodes_aired: z.int().positive().describe('The number of episodes aired'),
  aired_on: z.iso.date().describe('The date when the anime aired'),
  released_on: z.iso.date().nullish().describe('The date when the anime was released'),
  // full
  rating: z.string().describe('The rating of the anime'),
  english: z.array(z.string().nullish()).describe('The English names of the anime'),
  japanese: z.array(z.string().nullish()).describe('The Japanese names of the anime'),
  synonyms: z.array(z.string()).describe('The synonyms of the anime'),
  license_name_ru: z.string().nullish().describe('The Russian license name of the anime'),
  duration: z.int().positive().describe('The duration of the anime'),
  description: z.string().nullish().describe('The description of the anime'),
  description_html: z.string().describe('The HTML description of the anime'),
  description_source: z.string().nullish().describe('The source of the description'),
  franchise: z.string().nullish().describe('The franchise of the anime'),
  favoured: z.boolean().describe('Indicates whether the anime is favoured'),
  anons: z.boolean().describe('Indicates whether the anime is anons'),
  ongoing: z.boolean().describe('Indicates whether the anime is ongoing'),
  thread_id: z.int().describe('The thread ID of the anime'),
  topic_id: z.int().describe('The topic ID of the anime'),
  myanimelist_id: z.int().describe('The MyAnimeList ID of the anime'),

  rates_scores_stats: ratesScoresStats.describe('The rates scores stats of the anime'),
  rates_statuses_stats: ratesStatusesStats.describe('The rates statuses stats of the anime'),
  updated_at: z.iso.datetime().describe('The timestamp when the anime was last updated'),
  next_episode_at: z.iso.datetime().nullish().describe('The timestamp when the next episode will air'),

  fansubbers: z.array(z.string()).describe('The fansubbers of the anime'),
  fandubbers: z.array(z.string()).describe('The fandubbers of the anime'),
  licensors: z.array(z.string()).describe('The licensors of the anime'),
  genres: z.array(z.object({
    id: ID,
    name: z.string(),
    russian: z.string(),
    kind: z.enum(['genre']),
    entry_type: z.enum(['anime', 'mange']), // TODO check enum
  })).describe('The genres of the anime'),
  studios: z.array(z.unknown()).describe('The studios of the anime'),
  videos: z.array(z.unknown()).describe('The videos of the anime'),
  screenshots: z.array(z.unknown()).describe('The screenshots of the anime'),
  user_rate: z.number().nullish().describe('The user rate of the anime'),
})
export const animeShort = anime.pick({
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
export const animeList = z.array(animeShort)

////////
export const manga = z.object({})

////////
export const characterFull = z.object({
  id: ID,
  name: z.string(),
  russian: z.string(),
  image,
  url: z.string(),
  altname: z.string().nullable(),
  japanese: z.string().nullable(),
  description: z.string().nullable(),
  description_html: z.string().nullable(),
  description_source: z.string().nullable(),
  favoured: z.boolean(),
  thread_id: ID,
  topic_id: ID,
  updated_at: z.iso.datetime(),
  // seyu: z.array(person),
  get seyu() {
    return z.array(person)
  },
  animes: z.array(
    animeShort.extend({
      roles: z.array(z.string()),
      role: z.string(),
    }),
  ),
  mangas: z.array(
    animeShort.extend({
      roles: z.array(z.string()),
      role: z.string(),
    }),
  ),
})

export const character = z.object({
  id: ID,
  name: z.string(),
  russian: z.string(),
  image,
  url: z.string(),
})

export const person = character.clone()

export const seyu = person.clone()

export const role = z.object({
  roles: z.array(z.string()),
  roles_russian: z.array(z.string()),
  character: character.nullable(),
  person: person.nullable(),
})

export const roles = z.array(role)

export const similar = z.array(animeShort)

export const related = z.object({
  relation: z.string(),
  relation_russian: z.string(),
  anime: animeShort,
  manga: manga,
})

export const relatedList = z.array(related)

export const franchiseLinks = z.object({
  id: ID,
  source_id: ID,
  target_id: ID,
  source: z.int(),
  target: z.int(),
  weight: z.int(),
  relation: z.string(),
  // relation: z.enum(['adaptation', 'sequel', 'prequel']) // TODO: find in shikimori github
})
export const franchiseNode = z.object({
  id: ID,
  date: z.number().positive(),
  name: z.string(),
  image_url: z.string(),
  url: z.string(),
  year: z.number().positive().nullable(),
  kind: z.string(), // BUG: 'TV Сериал'
  weight: z.int(),
})
export const franchise = z.object({
  current_id: animeID,
  links: z.array(franchiseLinks),
  nodes: z.array(franchiseNode),
})

export const externalLinkKind = z.string() // TODO: extract from graphql api
export const externalLink = z.object({
  id: ID.nullable(),
  kind: externalLinkKind,
  url: z.string(),
  source: z.string(),
  entry_id: ID,
  entry_type: z.string(),
  created_at: z.iso.datetime().nullable(),
  updated_at: z.iso.datetime().nullable(),
  imported_at: z.iso.datetime().nullable(),
})
export const externalLinks = z.array(externalLink)

export const topic = z.object({
  id: ID,
  topic_title: z.string(),
  body: z.string(),
  html_body: z.string(),
  html_footer: z.string(),
  created_at: z.iso.datetime(),
  comments_count: z.number().positive(),
  forum: z.object({
    id: z.number().positive(),
    position: z.number().positive(),
    name: z.string(),
    permalink: z.string(),
    url: z.string(),
  }),
  user: user,
  type: z.string(),
  linked_id: ID,
  linked_type: z.string(),
  linked: animeShort,
  viewed: z.boolean(),
  last_comment_viewed: z.unknown().nullable(),
  event: z.string().nullable(),
  episode: z.number().positive().nullable(),
})
export const topics = z.array(topic)

export const topicsQuery = z
  .object({
    page: z.int().min(1).max(100000).describe('The page number'),
    limit: z.int().max(30).describe('The limit of results per page'),
    kind: z.enum(['anons', 'ongoing', 'released', 'episode']),
    episodes: z.int().positive(),
  })
  .partial()

//////////////// Anime Search
export const animeSearchQuery_order = z.enum([
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
export const animeSearchQuery_kind = z.enum([
  'tv',
  'movie',
  'ova',
  'ona',
  'special',
  'tv_special',
  'music',
  'pv',
  'cm',
  'tv_13',
  'tv_24',
  'tv_48',
])
export const animeSearchQuery = z
  .object({
    page: z.int().min(1).max(100000).describe('The page number, must be a number between 1 and 100000'),
    limit: z.int().min(1).max(50).describe('The limit of results per page, must be a number and maximum 50'),
    order: animeSearchQuery_order.describe('The order of the results'),
    kind: animeSearchQuery_kind.describe('The kind of the anime'),
    status: animeStatus.describe('The status of the anime'),
    season: z
      .string()
      .describe('The season of the anime')
      .meta({
        examples: {
          Example1: {value: 'summer_2017'},
          Example2: {value: '2016'},
          Example3: {value: '2014_2016'},
          Example4: {value: '199x'},
        },
      }),
    score: z.number().describe('The minimal anime score, must be a number'),
    duration: z.enum(['S', 'D', 'F']).describe('The duration of the anime'),
    rating: animeRating.describe('The rating of the anime'),
    genre: z.string().describe('List of genre ids separated by comma'),
    genre_v2: z.string().describe('List of genre v2 ids separated by comma'),
    studio: z.string().describe('List of studio ids separated by comma'),
    franchise: z.string().describe('List of franchises separated by comma'),
    censored: z.enum(['true', 'false']).describe('Set to false to allow hentai, yaoi and yuri'),
    mylist: userAnimeStatus.describe('Status of anime in current user list'),
    ids: z.string().describe('List of anime ids separated by comma'),
    exclude_ids: z.string().describe('List of anime ids separated by comma'),
    search: z.string().describe('Search phrase to filter animes by name'),
  })
  .partial()

////////////////
export const genre = z.object({
  id: z.number().positive(),
  name: z.string(),
  russian: z.string().nullable(),
  kind: animeKind,
})
export const genres = z.array(genre)

export const studio = z
  .object({
    id: z.int().positive(),
    name: z.string().describe('The name of the studio'),
    filtered_name: z.string(),
    real: z.boolean(),
    image: z.string().nullable(),
  })
  .meta({
    example: {
      id: 2,
      name: 'Kyoto Animation',
      filtered_name: 'Kyoto',
      real: true,
      image: '/system/studios/original/2.png',
    },
  })

export const studios = z.array(studio)

//
export const achievement = z.object({
  user_id: userID,
  id: ID,
  neko_id: z.string(),
  level: z.int().positive(),
  progress: z.int().positive(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
})
export const achievements = z.array(achievement)

//
export const videoKind = z.enum([
  'pv',
  'character_trailer',
  'cm',
  'op',
  'ed',
  'op_ed_clip',
  'clip',
  'other',
  'episode_preview',
])
export const videoHosting = z.enum([
  'youtube',
  'youtube_shorts',
  'rutube',
  'rutube_shorts',
  'vk',
  'ok',
  'coub',
  'vimeo',
  'sibnet',
  'yandex',
  'streamable',
  'smotret_anime',
  'myvi',
  'youmite',
  'viuly',
  'mediafile',
])
export const video = z.object({
  id: ID,
  url: z.string(),
  image_url: z.string(),
  player_url: z.string(),
  name: z.string().nullable(),
  kind: videoKind,
  hosting: videoHosting,
})
export const videos = z.array(video)
