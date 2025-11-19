#!/usr/bin/env -S deno run -A

import 'jsr:@std/dotenv/load'
import createClient, {createPathBasedClient} from 'npm:openapi-fetch'
import type {paths} from './danbooru.oas.ts'

// Almost all GET requests do not require authorization.
// To use 'saved searches', you need an ApiKey.
// Register api key: https://danbooru.donmai.us/profile => API Key
const login = ''
const apiKey = ''
const authorization = new TextEncoder().encode(`${login}:${apiKey}`).toBase64()

// deep serializer /  {search: {id: [1,2]}} => ?search[id]=1,2
function querySerializer(
  obj: Record<string, unknown>,
  params: URLSearchParams = new URLSearchParams(),
  prefix = '',
): string {
  for (const [key, value] of Object.entries(obj)) {
    const encodedKey = encodeURIComponent(key)
    const paramKey = prefix ? `${prefix}[${encodedKey}]` : encodedKey
    if (value == null) continue
    if (Array.isArray(value)) {
      if (value.length === 0) continue
      params.append(paramKey, value.map(String).join(','))
    } else if (typeof value === 'object' && value !== null) {
      querySerializer(value as Record<string, unknown>, params, paramKey)
    } else {
      params.append(paramKey, String(value))
    }
  }

  return params.toString()
}

export const danbooruApi = createClient<paths>({
  baseUrl: Deno.env.get('DANBOORU_BASE_URL') ?? 'https://danbooru.donmai.us',
  // headers: {authorization},
  querySerializer,
})

export const danbooru = createPathBasedClient<paths>({
  baseUrl: Deno.env.get('DANBOORU_BASE_URL') ?? 'https://danbooru.donmai.us',
  // headers: {authorization},
  querySerializer,
})

// Find user
Deno.test('/autocomplete.json user', async (t) => {
  const {data} = await danbooruApi.GET('/autocomplete.json', {
    params: {
      query: {
        search: {
          type: 'user',
          query: 'maks11060',
        },
      },
    },
  })
  console.log(data)
})

Deno.test('/autocomplete.json tag', async (t) => {
  const {data} = await danbooruApi.GET('/autocomplete.json', {
    params: {
      query: {
        search: {
          type: 'tag',
          query: 'zzz',
        },
      },
    },
  })
  console.log(data)
})

// Get user posts
Deno.test('/posts.json', async (t) => {
  const {data} = await danbooruApi.GET('/posts.json', {
    params: {
      query: {
        // tags: 'search:all', // Saved searched. Auth required
        tags: 'ordfav:maks11060', // user favorites
        limit: 2,
        only: [
          'id',
          'file_url',
          'fav_count',
          'rating',
        ],
      },
    },
  })
  console.log(data)
})

// Get random user post
Deno.test('/posts/random.json', async (t) => {
  const {data} = await danbooruApi.GET('/posts/random.json', {
    params: {
      query: {
        tags: 'ordfav:maks11060', // user favorites
      },
    },
  })
  console.log(data)
})

Deno.test('/artists.json', async (t) => {
  const {data} = await danbooruApi.GET('/artists.json', {
    params: {
      query: {
        search: {
          // order: 'post_count',
          // id: 32203,
          // id: 188101,
          id: [188101, 210615],
        },
        limit: 2,
        only: [
          'id',
          'name',
          'members',
          'urls',
          'wiki_page',
          'tag_alias',
          'tag',
        ],
      },
    },
  })
  if (data) console.log(data)
})

Deno.test('/artists/{id}.json', async (t) => {
  const {data} = await danbooruApi.GET('/artists/{id}.json', {
    params: {
      path: {
        id: 32203,
      },
      query: {
        only: [
          'id',
          'name',
          'other_names',
          'urls',
        ],
      },
    },
  })
  if (data) console.log(data)
})
