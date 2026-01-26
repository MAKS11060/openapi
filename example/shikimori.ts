import createClient from 'openapi-fetch'
import type {components, paths} from './shikimori.oas.ts'

export type Shikimori = components['schemas']

// Requirements
// Add your Oauth2 Application name to User-Agent requests header.
// Don’t mimic a browser.
// Your IP address may be banned if you use API without properly set User-Agent header.
const shikimoriUserAgent = 'your-oauth2-app-name'

export const shikimoriApi = createClient<paths>({
  baseUrl: 'https://shikimori.one',
  // headers: {'user-agent': shikimoriUserAgent},
  querySerializer: {
    array: {explode: false, style: 'form'},
  },
})

shikimoriApi.use({
  onRequest({request}) {
    for (const [k, v] of new URL(request.url).searchParams) {
      console.log([k, v])
    }
  },
})

Deno.test('Test 691467', async (t) => {
  console.dir(
    (await shikimoriApi.GET('/api/animes', {
      params: {
        query: {
          // kind: [
          //   'movie',
          //   'special',
          // ],
          // kind: 'movie',
          // status: 'released',
          // status: ['released'],
          limit: 5,
          kind: ['movie'],
        },
      },
    })).data,
    {depth: null},
  )
})
