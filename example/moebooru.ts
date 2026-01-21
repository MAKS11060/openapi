import createClient from 'openapi-fetch'
import type {components, paths} from './moebooru.oas.ts'

export type Moebooru = components['schemas']

export const api = createClient<paths>({
  baseUrl: 'https://yande.re',
  // baseUrl: 'https://konachan.com',
  // baseUrl: 'https://konachan.net',
})

api.use({ // merge two query parameters '?ver=2?tags=id:1' => '?ver=2&tags=id:1'
  onRequest({request}) {
    const url = new URL(request.url)
    if (url.search.slice(1).includes('?')) {
      url.search = url.search.slice(1).replace('?', '&')
    }
    return new Request(url, request)
  },
})

Deno.test('Test 597456', async (t) => {
  const {data} = await api.GET('/post.json?api_version=2', {
    params: {
      query: {
        limit: 1,
        include_tags: 1,
      },
    },
  })

  console.dir(data, {depth: null})
})
