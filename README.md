# OpenAPI schemas

Unofficial OpenAPI schemas for some public APIs

- [Danbooru](#danbooru)
- [shikimori](#shikimori)

> [!NOTE]
>
> - **OpenAPI 3.1**
> - Code examples [`/example`](example)
> - Schemas definitions in [zod](https://zod.dev/)
> - OpenAPI Builder [`jsr:@maks11060/openapi`](https://jsr.io/@maks11060/openapi)

## Danbooru

- [Danbooru](https://danbooru.donmai.us/)
- [Code example](./example/danbooru.ts)
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
import createClient from 'npm:openapi-fetch'
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
  baseUrl: 'https://danbooru.donmai.us',
  // headers: {authorization},
  querySerializer,
})
```

## Shikimori

- [shikimori](https://shikimori.one/)
- [Code example](./example/shikimori.ts)
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

[shikimori.redoc]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml
[shikimori.swagger]: https://editor-next.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml
[danbooru.redoc]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml
[danbooru.swagger]: https://editor-next.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml

## Build

> [!NOTE]
> **Project structure**
>
> - `src/{service}/`
>   - `mod.ts` - Entry point
>   - `openapi.ts` - Config
>   - `schema.ts` - Data models

### Prerequisites

#### Install [Deno](https://github.com/denoland/deno/?tab=readme-ov-file#installation)

> Install dependencies

```ps
deno run init
```

#### Check formatting and build

```bash
deno run ok
```

#### Build OpenAPI Schemas

```bash
deno run build
```

#### Build client types in [example](./example/)

```bash
deno run build:client
```
