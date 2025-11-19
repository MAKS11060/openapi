#!/usr/bin/env -S deno run -A

import 'jsr:@std/dotenv/load'
import {encodeBase64} from 'jsr:@std/encoding/base64'
import createClient from 'npm:openapi-fetch'
import type {paths} from './danbooru.oas.ts'

// Many API endpoints do not require authentication.
// Register api key: https://danbooru.donmai.us/profile => API Key
const login = ''
const apiKey = ''
const authorization = encodeBase64(`${login}:${apiKey}`)

/* { // tags examples
  tags: '',                       //

  tags: 'search:all',             // Saved searched. Auth required
  tags: `ordfav:${username}`,     // user favorites

  tags: 'order:rank',             // daily top
  tags: 'order:rank rating:g,s',  // daily top + SFW mode

  tags: 'order:favcount',         // sort by number of favorites
  tags: 'order:favcount age:<7d', // sort by number of favorites in 7 days

  tags: 'order:score',            // sort by number of score
} */

function serialize(
  obj: Record<string, unknown>,
  params: URLSearchParams,
  prefix = '',
): void {
  for (const [key, value] of Object.entries(obj)) {
    const encodedKey = encodeURIComponent(key)
    const paramKey = prefix ? `${prefix}[${encodedKey}]` : encodedKey

    if (value == null) {
      continue
    }

    if (Array.isArray(value)) {
      if (value.length === 0) continue
      params.append(paramKey, value.map(String).join(','))
    } else if (typeof value === 'object' && value !== null) {
      serialize(value as Record<string, unknown>, params, paramKey)
    } else {
      params.append(paramKey, String(value))
    }
  }
}

export const danbooruApi = createClient<paths>({
  baseUrl: Deno.env.get('DANBOORU_BASE_URL') ?? 'https://danbooru.donmai.us',
  // headers: {authorization},
  fetch(input) {
    console.log(input.url)
    return fetch(input)
  },
  querySerializer(queryParam: Record<string, unknown>): string {
    const params = new URLSearchParams()
    serialize(queryParam, params)
    return params.toString()
  },
})

// Find user
Deno.test('Test 635697', async (t) => {
  const {data} = await danbooruApi.GET('/autocomplete.json', {
    params: {
      query: {
        'search[type]': 'user',
        'search[query]': 'maks11060',
      },
    },
  })
  console.log(data)
})

// Get user posts
Deno.test('Test 292593', async (t) => {
  const {data} = await danbooruApi.GET('/posts.json', {
    params: {
      query: {
        // tags: 'search:all', // Saved searched. Auth required
        tags: 'ordfav:maks11060', // user favorites
        limit: 2,
      },
    },
  })
  console.log(data)
})

// Get random user post
Deno.test('Test 356364', async (t) => {
  const {data} = await danbooruApi.GET('/posts/random.json', {
    params: {
      query: {
        tags: 'ordfav:maks11060', // user favorites
      },
    },
  })
  console.log(data)
})

Deno.test('/autocomplete.json', async (t) => {
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
