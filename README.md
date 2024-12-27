# OpenAPI

Auto generated OpenAPI from [zod schema](https://zod.dev/)

- [OpenAPI](#openapi)
  - [Shikimori](#shikimori)
    - [Example](#example-openapi-fetch)
  - [Danbooru](#danbooru)
    - [Example](#example-openapi-fetch-1)

## Shikimori

- [Redoc][shikimori.redoc]
- [Swagger Editor][shikimori.swagger]
- [Developer API](https://shikimori.one/api/doc)

```sh
deno run -A npm:openapi-typescript https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yml -o ./shikimori/openapi.d.ts
# or
deno run -A npm:openapi-typescript gen/shikimori/openapi.yml -o ./shikimori/openapi.d.ts
```

### Example [openapi-fetch](https://openapi-ts.dev/openapi-fetch/)

```ts
// shikimori/shikimori.ts
import createClient from 'npm:openapi-fetch'
import type {paths} from './openapi.d.ts'

// Requirements
// Add your Oauth2 Application name to User-Agent requests header.
// Don’t mimic a browser.
// Your IP address may be banned if you use API without properly set User-Agent header.
const shikimoriUserAgent = ''

export const shikimoriApi = createClient<paths>({
  baseUrl: 'https://shikimori.one',
  headers: {'user-agent': shikimoriUserAgent},
})
```

## Danbooru

- [Redoc][danbooru.redoc]
- [Swagger Editor][danbooru.swagger]
- [Api Wiki](https://danbooru.donmai.us/wiki_pages/help:api)
- [Danbooru Help](https://danbooru.donmai.us/wiki_pages/help:toc#dtext-developer_guide)

```sh
deno run -A npm:openapi-typescript https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yml -o ./danbooru/openapi.d.ts
# or
deno run -A npm:openapi-typescript gen/danbooru/openapi.yml -o ./danbooru/openapi.d.ts
```

### Example [openapi-fetch](https://openapi-ts.dev/openapi-fetch/)

```ts
// danbooru/danbooru.ts
import {encodeBase64} from 'jsr:@std/encoding/base64'
import createClient from 'npm:openapi-fetch'
import type {paths} from './danbooru/openapi.d.ts'

const login = ''
const apiKey = ''
const authorization = encodeBase64(`${login}:${apiKey}`)

export const danbooruApi = createClient<paths>({
  baseUrl: 'https://danbooru.donmai.us',
  headers: {authorization},
})
```

[shikimori.redoc]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yml
[shikimori.swagger]: https://editor-next.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yml

[danbooru.redoc]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yml
[danbooru.swagger]: https://editor-next.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yml
