# OpenAPI

- [OpenAPI](#openapi)
  - [Shikimori](#shikimori)


## Shikimori

```sh
deno run -A npm:openapi-typescript src/shikimori/openapi.yml -o ./gen/shikimori/openapi.d.ts
```

```ts
import createClient from 'npm:openapi-fetch'
import type {paths} from './gen/shikimori/openapi.d.ts'

const shikimoriUserAgent = ''
const shikimoriApi = createClient<paths>({baseUrl: 'https://shikimori.one'})

shikimoriApi.use({
  onRequest({request}) {
    // Requirements
    // Add your Oauth2 Application name to User-Agent requests header.
    // Don’t mimic a browser.
    // Your IP address may be banned if you use API without properly set User-Agent header.
    request.headers.set('user-agent', shikimoriUserAgent)
  },
})


```
