#!/usr/bin/env -S deno run -A

import {encodeBase64} from 'jsr:@std/encoding/base64'
import createClient from 'npm:openapi-fetch'
import type {paths} from './danbooru.d.ts'

// Many API endpoints do not require authentication.
// Register api key: https://danbooru.donmai.us/profile => API Key
const login = ''
const apiKey = ''
const authorization = encodeBase64(`${login}:${apiKey}`)

export const danbooruApi = createClient<paths>({
  baseUrl: 'https://danbooru.donmai.us',
  // headers: {authorization},
})

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

// Find user
{
  const {data} = await danbooruApi.GET('/autocomplete.json', {
    params: {
      query: {
        'search[type]': 'user',
        'search[query]': 'maks11060',
      },
    },
  })
  console.log(data)
}

// Get user posts
{
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
}

// Get random user post
{
  const {data} = await danbooruApi.GET('/posts/random.json', {
    params: {
      query: {
        tags: 'ordfav:maks11060', // user favorites
      },
    },
  })
  console.log(data)
}
