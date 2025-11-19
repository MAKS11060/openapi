import {z} from 'zod'
import {doc, oauth2} from './openapi.ts'
import {
  achievements,
  anime,
  animeID,
  animeList,
  animeSearchQuery,
  character,
  characterFull,
  externalLinks,
  franchise,
  genres,
  ID,
  manga,
  mangaList,
  mangaSearchQuery,
  related,
  relatedList,
  roles,
  screenshots,
  similarAnime,
  similarManga,
  studios,
  topics,
  topicsQuery,
  UnauthorizedSchema,
  user,
  userID,
  userInfo,
  userRates,
  userRatesCreateParams,
  userRatesList,
  userRatesQuery,
  userRatesUpdateParams,
  users,
  usersSearchQuery,
  video,
  videos,
} from './schema.ts'

export {doc} from './openapi.ts'

doc.addSchemas({
  achievements,
  anime,
  animeID,
  animeList,
  animeSearchQuery,
  character,
  characterFull,
  externalLinks,
  franchise,
  genres,
  ID,
  manga,
  mangaList,
  mangaSearchQuery,
  related,
  relatedList,
  roles,
  screenshots,
  similarAnime,
  similarManga,
  studios,
  topics,
  topicsQuery,
  UnauthorizedSchema,
  user,
  userID,
  userInfo,
  userRates,
  userRatesCreateParams,
  userRatesList,
  userRatesQuery,
  userRatesUpdateParams,
  users,
  usersSearchQuery,
  video,
  videos,
})

//////////////////////////////// Responses
// const BadRequestResponse = doc.addResponse('BadRequest', (t) => {
//   t.describe('The given parameters could not be parsed')
//   t.content('application/json', z.any())
// })

const UnauthorizedResponse = doc.addResponse('Unauthorized', (t) => {
  t.describe('Authentication failed')
  t.content('application/json', UnauthorizedSchema) //
    .example('OAuth2 token invalid', (t) => {
      t.value({
        error: 'invalid_token',
        error_description: 'The access token is invalid',
        state: 'unauthorized',
      })
    })
})

// const ForbiddenResponse = doc.addResponse('Forbidden', (t) => {
//   t.describe('Access denied')
//   t.content('application/json', z.object())
// })

const NotFoundResponse = doc.addResponse('NotFound', (t) => {
  t.describe('Not Found')
  t.content('application/json', z.object())
})

//////////////////////////////// Paths
//////////////// Achievements
doc.addPath('/api/achievements').get((t) => {
  t.tag('achievements')
  t.describe('List user achievements')
  t.operationId('list_user_achievements')

  t.parameter('query', 'user_id', (t) => t.schema(userID).required())
  t.response(200, (t) => {
    t.content('application/json', achievements)
  })
  t.response('4XX', (t) => {
    t.content('application/json', z.any())
  })
})

//////////////// Animes
doc.addPath('/api/animes').get((t) => {
  t.tag('anime')
  t.describe('List animes')
  t.operationId('list_anime')
  t.externalDocs({url: 'https://shikimori.one/api/doc/1.0/animes/index.html'})

  t.parameter('query', 'page', (t) => t.schema(animeSearchQuery.shape.page))
  t.parameter('query', 'limit', (t) => t.schema(animeSearchQuery.shape.limit))
  t.parameter('query', 'order', (t) => t.schema(animeSearchQuery.shape.order))
  t.parameter('query', 'kind', (t) => t.schema(animeSearchQuery.shape.kind))
  t.parameter('query', 'status', (t) => t.schema(animeSearchQuery.shape.status))
  t.parameter('query', 'season', (t) => t.schema(animeSearchQuery.shape.season))
  t.parameter('query', 'score', (t) => t.schema(animeSearchQuery.shape.score))
  t.parameter('query', 'duration', (t) => t.schema(animeSearchQuery.shape.duration))
  t.parameter('query', 'rating', (t) => t.schema(animeSearchQuery.shape.rating))
  t.parameter('query', 'genre', (t) => t.schema(animeSearchQuery.shape.genre))
  t.parameter('query', 'genre_v2', (t) => t.schema(animeSearchQuery.shape.genre_v2))
  t.parameter('query', 'studio', (t) => t.schema(animeSearchQuery.shape.studio))
  t.parameter('query', 'franchise', (t) => t.schema(animeSearchQuery.shape.franchise))
  t.parameter('query', 'censored', (t) => t.schema(animeSearchQuery.shape.censored))
  t.parameter('query', 'mylist', (t) => t.schema(animeSearchQuery.shape.mylist))
  t.parameter('query', 'ids', (t) => t.schema(animeSearchQuery.shape.ids))
  t.parameter('query', 'exclude_ids', (t) => t.schema(animeSearchQuery.shape.exclude_ids))
  t.parameter('query', 'search', (t) => t.schema(animeSearchQuery.shape.search))

  t.response(200, (t) => {
    t.content('application/json', animeList)
  })
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/animes/{id}', {id: (t) => t.schema(animeID)}).get((t) => {
  t.tag('anime')
  t.describe('Show an anime')
  t.operationId('get_anime')

  t.response(200, (t) => {
    t.content('application/json', anime)
  })
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/animes/{id}/roles', {id: (t) => t.schema(animeID)}).get((t) => {
  t.tag('anime')
  t.describe('Show an anime roles')
  t.operationId('get_anime_roles')

  t.response(200, (t) => {
    t.content('application/json', roles)
  })
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/animes/{id}/similar', {id: (t) => t.schema(animeID)}).get((t) => {
  t.tag('anime')
  t.operationId('get_anime_similar')

  t.response(200, (t) => {
    t.content('application/json', similarAnime)
  })
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/animes/{id}/related', {id: (t) => t.schema(animeID)}).get((t) => {
  t.tag('anime')
  t.operationId('get_anime_related')

  t.response(200, (t) => {
    t.content('application/json', relatedList)
  })
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/animes/{id}/screenshots', {id: (t) => t.schema(animeID)}).get((t) => {
  t.tag('anime')
  t.operationId('get_anime_screenshots')

  t.response(200, (t) => {
    t.content('application/json', screenshots)
  })
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/animes/{id}/franchise', {id: (t) => t.schema(animeID)}).get((t) => {
  t.tag('anime')
  t.operationId('get_anime_franchise')

  t.response(200, (t) => {
    t.content('application/json', franchise)
  })
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/animes/{id}/external_links', {id: (t) => t.schema(animeID)}).get((t) => {
  t.tag('anime')
  t.operationId('get_anime_external_links')

  t.response(200, (t) => {
    t.content('application/json', externalLinks)
  })
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/animes/{id}/topics', {id: (t) => t.schema(animeID)}).get((t) => {
  t.tag('anime')
  t.operationId('get_anime_topics')

  t.parameter('query', 'page', (t) => t.schema(topicsQuery.shape.page))
  t.parameter('query', 'limit', (t) => t.schema(topicsQuery.shape.limit))
  t.parameter('query', 'kind', (t) => t.schema(topicsQuery.shape.kind))
  t.parameter('query', 'episodes', (t) => t.schema(topicsQuery.shape.episodes))

  t.response(200, (t) => {
    t.content('application/json', topics)
  })
  t.response(401, UnauthorizedResponse)
})

//////////////// Manga
doc.addPath('/api/mangas').get((t) => {
  t.tag('manga')
  t.describe('list manga')
  t.operationId('list_manga')

  t.parameter('query', 'page', (t) => t.schema(mangaSearchQuery.shape.page))
  t.parameter('query', 'limit', (t) => t.schema(mangaSearchQuery.shape.limit))
  t.parameter('query', 'order', (t) => t.schema(mangaSearchQuery.shape.order))
  t.parameter('query', 'kind', (t) => t.schema(mangaSearchQuery.shape.kind))
  t.parameter('query', 'status', (t) => t.schema(mangaSearchQuery.shape.status))
  t.parameter('query', 'season', (t) => t.schema(mangaSearchQuery.shape.season))
  t.parameter('query', 'score', (t) => t.schema(mangaSearchQuery.shape.score))
  t.parameter('query', 'genre', (t) => t.schema(mangaSearchQuery.shape.genre))
  t.parameter('query', 'genre_v2', (t) => t.schema(mangaSearchQuery.shape.genre_v2))
  t.parameter('query', 'publisher', (t) => t.schema(mangaSearchQuery.shape.publisher))
  t.parameter('query', 'franchise', (t) => t.schema(mangaSearchQuery.shape.franchise))
  t.parameter('query', 'censored', (t) => t.schema(mangaSearchQuery.shape.censored))
  t.parameter('query', 'mylist', (t) => t.schema(mangaSearchQuery.shape.mylist))
  t.parameter('query', 'ids', (t) => t.schema(mangaSearchQuery.shape.ids))
  t.parameter('query', 'exclude_ids', (t) => t.schema(mangaSearchQuery.shape.exclude_ids))
  t.parameter('query', 'search', (t) => t.schema(mangaSearchQuery.shape.search))

  t.response(200, (t) => t.content('application/json', mangaList))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/mangas/{id}', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('manga')
  t.describe('Show a manga')
  t.operationId('get_manga')

  t.response(200, (t) => t.content('application/json', manga))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/mangas/{id}/roles', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('manga')
  t.operationId('get_manga_roles')

  t.response(200, (t) => t.content('application/json', roles))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/mangas/{id}/similar', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('manga')
  t.operationId('get_manga_similar')

  t.response(200, (t) => t.content('application/json', similarManga))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/mangas/{id}/related', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('manga')
  t.operationId('get_manga_related')

  t.response(200, (t) => t.content('application/json', related))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/mangas/{id}/screenshots', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('manga')
  t.operationId('get_manga_screenshots')

  t.response(200, (t) => t.content('application/json', screenshots))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/mangas/{id}/franchise', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('manga')
  t.operationId('get_manga_franchise')

  t.response(200, (t) => t.content('application/json', franchise))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/mangas/{id}/external_links', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('manga')
  t.operationId('get_manga_external_links')

  t.response(200, (t) => t.content('application/json', externalLinks))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/mangas/{id}/topics', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('manga')
  t.operationId('get_manga_topics')

  t.response(200, (t) => t.content('application/json', topics))
  t.response(401, UnauthorizedResponse)
})

//////////////// Ranobe
doc.addPath('/api/ranobe').get((t) => {
  t.tag('ranobe')
  t.describe('List ranobe')
  t.operationId('list_ranobe')

  t.parameter('query', 'page', (t) => t.schema(mangaSearchQuery.shape.page))
  t.parameter('query', 'limit', (t) => t.schema(mangaSearchQuery.shape.limit))
  t.parameter('query', 'order', (t) => t.schema(mangaSearchQuery.shape.order))
  t.parameter('query', 'status', (t) => t.schema(mangaSearchQuery.shape.status))
  t.parameter('query', 'season', (t) => t.schema(mangaSearchQuery.shape.season))
  t.parameter('query', 'score', (t) => t.schema(mangaSearchQuery.shape.score))
  t.parameter('query', 'genre', (t) => t.schema(mangaSearchQuery.shape.genre))
  t.parameter('query', 'publisher', (t) => t.schema(mangaSearchQuery.shape.publisher))
  t.parameter('query', 'franchise', (t) => t.schema(mangaSearchQuery.shape.franchise))
  t.parameter('query', 'censored', (t) => t.schema(mangaSearchQuery.shape.censored))
  t.parameter('query', 'mylist', (t) => t.schema(mangaSearchQuery.shape.mylist))
  t.parameter('query', 'ids', (t) => t.schema(mangaSearchQuery.shape.ids))
  t.parameter('query', 'exclude_ids', (t) => t.schema(mangaSearchQuery.shape.exclude_ids))
  t.parameter('query', 'search', (t) => t.schema(mangaSearchQuery.shape.search))

  t.response(200, (t) => t.content('application/json', mangaList))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/ranobe/{id}', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('ranobe')
  t.describe('Show a ranobe')
  t.operationId('get_ranobe')

  t.response(200, (t) => t.content('application/json', manga))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/ranobe/{id}/roles', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('ranobe')
  t.operationId('get_ranobe_roles')

  t.response(200, (t) => t.content('application/json', roles))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/ranobe/{id}/similar', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('ranobe')
  t.operationId('get_ranobe_similar')

  t.response(200, (t) => t.content('application/json', similarManga))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/ranobe/{id}/related', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('ranobe')
  t.operationId('get_ranobe_related')

  t.response(200, (t) => t.content('application/json', related))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/ranobe/{id}/screenshots', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('ranobe')
  t.operationId('get_ranobe_screenshots')

  t.response(200, (t) => t.content('application/json', screenshots))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/ranobe/{id}/franchise', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('ranobe')
  t.operationId('get_ranobe_franchise')

  t.response(200, (t) => t.content('application/json', franchise))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/ranobe/{id}/external_links', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('ranobe')
  t.operationId('get_ranobe_external_links')

  t.response(200, (t) => t.content('application/json', externalLinks))
  t.response(401, UnauthorizedResponse)
})
doc.addPath('/api/ranobe/{id}/topics', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('ranobe')
  t.operationId('get_ranobe_topics')

  t.response(200, (t) => t.content('application/json', topics))
  t.response(401, UnauthorizedResponse)
})

//////////////// Characters
doc.addPath('/api/characters/{id}', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('characters')
  t.describe('Show a character')
  t.operationId('get_characters')

  t.response(200, (t) => {
    t.content('application/json', characterFull)
  })
})
doc.addPath('/api/characters/search').get((t) => {
  t.tag('characters')
  t.describe('Search characters')
  t.operationId('find_characters')

  t.parameter('query', 'search', (t) => t.schema(z.string()))
  t.response(200, (t) => {
    t.content('application/json', character)
  })
})

//////////////// Peoples / Persons
doc.addPath('/api/people/{id}', {id: (t) => t.schema(ID)}).get((t) => {
  t.tag('people')
  t.describe('Show a person')
  t.operationId('get_person')
})
doc.addPath('/api/people/search').get((t) => {
  t.tag('people')
  t.describe('Search people')
  t.operationId('find_person')
})

//////////////// Constants
doc.addPath('/api/constants/anime').get((t) => {
  t.tag('constants')
  t.operationId('get_constants_anime')

  t.response(200, (t) => {
    t.content(
      'application/json',
      z.object({
        kind: z.array(z.string()),
        status: z.array(z.string()),
      }),
    )
  })
})
doc.addPath('/api/constants/manga').get((t) => {
  t.tag('constants')
  t.operationId('get_constants_manga')

  t.response(200, (t) => {
    t.content(
      'application/json',
      z.object({
        kind: z.array(z.string()),
        status: z.array(z.string()),
      }),
    )
  })
})
doc.addPath('/api/constants/user_rate').get((t) => {
  t.tag('constants')
  t.operationId('get_constants_user_rate')

  t.response(200, (t) => {
    t.content(
      'application/json',
      z.object({
        status: z.array(z.string()),
      }),
    )
  })
})
doc.addPath('/api/constants/club').get((t) => {
  t.tag('constants')
  t.operationId('get_constants_club')

  t.response(200, (t) => {
    t.content(
      'application/json',
      z.object({
        join_policy: z.array(z.string()),
        comment_policy: z.array(z.string()),
        image_upload_policy: z.array(z.string()),
      }),
    )
  })
})
doc.addPath('/api/constants/smileys').get((t) => {
  t.tag('constants')
  t.operationId('get_constants_smileys')

  t.response(200, (t) => {
    t.content(
      'application/json',
      z.array(
        z.object({
          bbcode: z.string(),
          path: z.string(),
        }),
      ),
    )
  })
})

////////////////
doc.addPath('/api/genres').get((t) => {
  t.tag('genres')
  t.operationId('list_genres')

  t.response(200, (t) => {
    t.describe('List genres')
    t.content('application/json', genres)
  })
})
doc.addPath('/api/studios').get((t) => {
  t.tag('studios')
  t.operationId('list_studios')

  t.response(200, (t) => {
    t.describe('List studios')
    t.content('application/json', studios)
  })
})

//////////////// Users
doc
  .addPath('/api/users') //
  .parameter('query', 'page', (t) => {
    t.schema(usersSearchQuery.shape.page)
  })
  .parameter('query', 'limit', (t) => {
    t.schema(usersSearchQuery.shape.limit)
  })
  .parameter('query', 'search', (t) => {
    t.schema(usersSearchQuery.shape.search)
  })
  .get((t) => {
    t.tag('v1_user')
    t.operationId('get_users')

    t.response(200, (t) => {
      t.describe('List users')
      t.content('application/json', users)
    })
  })

doc
  .addPath('/api/users/{id}', {
    id: (t) => t.schema(userID),
  }) //
  .get((t) => {
    t.tag('v1_user')
    t.operationId('get_user')

    t.response(200, (t) => {
      t.describe('Show an user')
      t.content('application/json', userInfo)
    })
  })

doc
  .addPath('/api/users/whoami') //
  .get((t) => {
    t.tag('v1_user')
    t.security(oauth2)
    t.operationId('get_my_user')

    t.response(200, (t) => {
      t.describe('Show an user')
      t.content('application/json', user)
    })
    t.response(401, UnauthorizedResponse)
  })

//////////////// User Rates
doc
  .addPath('/api/user_rates/{type}/cleanup', {
    type: (t) => t.schema(z.enum(['anime', 'manga'])),
  })
  .delete((t) => {
    t.tag('v1_user')
    t.describe('Delete entire user rates and history')
    t.security(oauth2, ['user_rates'])
    t.operationId('delete_user_rates_cleanup')
    t.response(200, (t) => {
      t.content('application/json', z.object({notice: z.string()}))
    })
  })

doc
  .addPath('/api/user_rates/{type}/reset', {
    type: (t) => t.schema(z.enum(['anime', 'manga'])),
  })
  .delete((t) => {
    t.tag('v1_user')
    t.describe('Reset all user scores to 0')
    t.security(oauth2, ['user_rates'])
    t.operationId('delete_user_rates_reset')
    t.response(200, (t) => {
      t.content('application/json', z.object({notice: z.string()}))
    })
  })

//////////////// User Rates 2
doc
  .addPath('/api/v2/user_rates') //
  .parameter('query', 'user_id', (t) => t.schema(userRatesQuery.shape.user_id))
  .parameter('query', 'target_id', (t) => t.schema(userRatesQuery.shape.target_id))
  .parameter('query', 'target_type', (t) => t.schema(userRatesQuery.shape.target_type))
  .parameter('query', 'status', (t) => t.schema(userRatesQuery.shape.status))
  .parameter('query', 'page', (t) => t.schema(userRatesQuery.shape.page))
  .parameter('query', 'limit', (t) => t.schema(userRatesQuery.shape.limit))
  .get((t) => {
    t.tag('v2_user')
    t.describe('List user rates')
    t.operationId('list_user_rates')

    t.response(200, (t) => {
      t.content('application/json', userRatesList)
    })
    t.response(401, UnauthorizedResponse)
    t.response(404, NotFoundResponse)
  })
  .post((t) => {
    t.tag('v2_user')
    t.describe('Create an user rate')
    t.security(oauth2, ['user_rates'])
    t.operationId('update_user_rates')

    t.requestBody((t) => {
      t.content('application/json', userRatesCreateParams) //
        .example('Example', (t) => {
          t.value({
            user_id: 23456789,
            target_id: 15,
            target_type: 'Anime',
            status: 'completed',
            score: 10,
            chapters: 4,
            episodes: 2,
            volumes: 3,
            rewatches: 5,
            text: 'test',
          })
        })
    })
    t.response(200, (t) => {
      t.content('application/json', userRates)
    })
    t.response(401, UnauthorizedResponse)
  })

doc
  .addPath('/api/v2/user_rates/{id}', {
    id: (t) => t.schema(userRates.shape.id),
  })
  .get((t) => {
    t.tag('v2_user')
    t.describe('Show an user rate')
    t.operationId('list_user_rate')

    t.response(200, (t) => {
      t.content('application/json', userRates)
    })
    t.response(401, UnauthorizedResponse)
    t.response(404, NotFoundResponse)
  })
  .patch((t) => {
    t.tag('v2_user')
    t.describe('Update an user rate')
    t.security(oauth2, ['user_rates'])
    t.operationId('edit_user_rate')

    t.requestBody((t) => {
      t.content('application/json', userRatesUpdateParams)
    })
    t.response(200, (t) => {
      t.content('application/json', userRates)
    })
    t.response(401, UnauthorizedResponse)
  })
  .put((t) => {
    t.tag('v2_user')
    t.describe('Update an user rate')
    t.security(oauth2, ['user_rates'])
    t.operationId('update_user_rate')

    t.requestBody((t) => {
      t.content('application/json', userRatesUpdateParams)
    })
    t.response(200, (t) => {
      t.content('application/json', userRates)
    })
    t.response(401, UnauthorizedResponse)
  })
  .delete((t) => {
    t.tag('v2_user')
    t.describe('Destroy an user rate')
    t.security(oauth2, ['user_rates'])
    t.operationId('delete_user_rate')

    t.response(204, (t) => {})
  })

doc
  .addPath('/api/v2/user_rates/{id}/increment', {
    id: (t) => t.schema(userRates.shape.id),
  })
  .post((t) => {
    t.tag('v2_user')
    t.describe('Increment episodes/chapters by 1')
    t.security(oauth2, ['user_rates'])
    t.operationId('increment_user_rates')

    t.response(201, (t) => {
      t.content('application/json', userRates)
    })
    t.response(401, UnauthorizedResponse)
  })

//////////////// Videos
doc
  .addPath('/api/animes/{anime_id}/videos', {
    anime_id: (t) => t.schema(animeID),
  })
  .get((t) => {
    t.tag('videos')
    t.describe('List videos')
    t.operationId('get_video')

    t.response(200, (t) => {
      t.content('application/json', videos)
    })
  })
  .post((t) => {
    t.tag('videos')
    t.describe('Create a video')
    t.security(oauth2, ['content'])
    t.operationId('add_video')

    t.requestBody((t) => {
      t.content(
        'application/json',
        video.pick({
          kind: true,
          name: true,
          url: true,
        }),
      )
    })
    t.response(200, (t) => {
      t.content('application/json', video)
    })
  })

doc
  .addPath('/api/animes/{anime_id}/videos/{id}', {
    anime_id: (t) => t.schema(animeID),
    id: (t) => t.schema(ID),
  })
  .delete((t) => {
    t.tag('videos')
    t.describe('Destroy a video')
    t.security(oauth2, ['content'])
    t.operationId('delete_video')

    t.response(200, (t) => {})
  })
