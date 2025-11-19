# OpenAPI

Unofficial OpenAPI schemes for some public APIs

The OpenAPI Schema is generated based on the code in [`src`](src) and the library
[`jsr:@maks11060/openapi`](https://jsr.io/@maks11060/openapi)

- [OpenAPI](#openapi)
  - [Shikimori](#shikimori)
    - [Example](#example-openapi-fetch)
  - [Danbooru](#danbooru)
    - [Example](#example-openapi-fetch-1)

> [!NOTE]
>
> - **OpenAPI 3.1**
> - Code examples [`/example`](example)
>
> **Project structure**
>
> - `src/{service}/`
>   - `mod.ts` - Entry point
>   - `openapi.ts` - Config
>   - `schema.ts` - Data models

## Shikimori

- [Redoc][shikimori.redoc]
- [Swagger Editor][shikimori.swagger]
- [Developer API](https://shikimori.one/api/doc)

### Example [openapi-fetch](https://openapi-ts.dev/openapi-fetch/)

```sh
npx openapi-typescript https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml -o ./shikimori.oas.ts
# or
deno run -A npm:openapi-typescript https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml -o ./shikimori.oas.ts
```

```ts
// shikimori.ts
import createClient from 'npm:openapi-fetch'
import type {paths} from './shikimori.oas.ts'

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
- [Search Cheatsheet](https://danbooru.donmai.us/wiki_pages/help%3Acheatsheet)
- [Danbooru Help Table of Contents](https://danbooru.donmai.us/wiki_pages/help:toc#dtext-developer_guide)

### Example [openapi-fetch](https://openapi-ts.dev/openapi-fetch/)

```sh
npx openapi-typescript https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml -o ./danbooru.oas.ts
# or
deno run -A npm:openapi-typescript https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml -o ./danbooru.oas.ts
```

```ts
// danbooru.ts
import {encodeBase64} from 'jsr:@std/encoding/base64'
import createClient from 'npm:openapi-fetch'
import type {paths} from './danbooru.oas.ts'

// Many API endpoints do not require authentication.
// Register api key: https://danbooru.donmai.us/profile => API Key
const login = ''
const apiKey = ''
const authorization = encodeBase64(`${login}:${apiKey}`)

export const danbooruApi = createClient<paths>({
  baseUrl: 'https://danbooru.donmai.us',
  // headers: {authorization},
})
```

[shikimori.redoc]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml
[shikimori.swagger]: https://editor-next.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml
[danbooru.redoc]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml
[danbooru.swagger]: https://editor-next.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml
