# OpenAPI schemas

Unofficial OpenAPI schemas for some public APIs

- [Danbooru](#danbooru)
- [Moebooru](#moebooru)
- [Shikimori](#shikimori)

> [!NOTE]
>
> - **OpenAPI 3.1**
> - Code examples [`/example`](example)
> - Schemas definitions in [zod](https://zod.dev/)
> - OpenAPI Builder [`jsr:@maks11060/openapi`](https://jsr.io/@maks11060/openapi)

## Danbooru

- [Danbooru](https://danbooru.donmai.us/)
  - [Api Wiki](https://danbooru.donmai.us/wiki_pages/help:api)
  - [Search Cheatsheet](https://danbooru.donmai.us/wiki_pages/help%3Acheatsheet)
  - [Danbooru Help Table of Contents](https://danbooru.donmai.us/wiki_pages/help:toc#dtext-developer_guide)
- [Code example](./example/danbooru.ts)
- [Redoc][danbooru.redoc]
- [Swagger Editor][danbooru.swagger]

### Typescript client with [openapi-fetch](https://openapi-ts.dev/openapi-fetch/)

#### 1. Generating types from OpenAPI schema

```ps
deno run -A npm:openapi-typescript \
  https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml \
  -o ./danbooru.oas.ts
```

```ps
npx openapi-typescript \
  https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml \
  -o ./danbooru.oas.ts
```

#### 2. Create openapi-fetch client

```ts
// danbooru.ts
import createClient from 'openapi-fetch'
import type {components, paths} from './danbooru.oas.ts'

export type Danbooru = components['schemas']

// Almost all GET requests do not require authorization.
// To use 'saved searches', you need an ApiKey.
// Register api key: https://danbooru.donmai.us/profile => API Key
// const login = ''
// const apiKey = ''
// const authorization = new TextEncoder().encode(`${login}:${apiKey}`).toBase64()

export const danbooruApi = createClient<paths>({
  baseUrl: 'https://danbooru.donmai.us',
  // headers: {authorization},
  querySerializer,
})

// deep serializer / {search: {id: [1,2]}} => ?search[id]=1,2
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
```

## Moebooru

- [Redoc][moebooru.redoc]
- [Swagger Editor][moebooru.swagger]

#### A group of services based on [moebooru](https://github.com/moebooru/moebooru)

- [yande.re](https://yande.re)
  - [Api doc](https://yande.re/help/api)
- [konachan.com](https://konachan.com) | [konachan.net](https://konachan.net)

### Typescript client with [openapi-fetch](https://openapi-ts.dev/openapi-fetch/)

#### 1. Generating types from OpenAPI schema

```ps
deno run -A npm:openapi-typescript \
  https://github.com/MAKS11060/openapi/releases/latest/download/moebooru.openapi.yaml \
  -o ./moebooru.oas.ts
```

```ps
npx openapi-typescript \
  https://github.com/MAKS11060/openapi/releases/latest/download/moebooru.openapi.yaml \
  -o ./moebooru.oas.ts
```

#### 2. Create openapi-fetch client

```ts
// moebooru.ts
import createClient from 'openapi-fetch'
import type {components, paths} from './moebooru.oas.ts'

export type Moebooru = components['schemas']

export const moebooruApi = createClient<paths>({
  baseUrl: 'https://yande.re',
  // baseUrl: 'https://konachan.com',
  // baseUrl: 'https://konachan.net',
})

// handle '/post.json?api_version=2'
api.use({ // merge two query parameters '?ver=2?tags=id:1' => '?ver=2&tags=id:1'
  onRequest({request}) {
    const url = new URL(request.url)
    if (url.search.slice(1).includes('?')) {
      url.search = url.search.slice(1).replace('?', '&')
    }
    return new Request(url, request)
  },
})
```

## Shikimori

- [Shikimori](https://shikimori.one/)
  - [Developer API](https://shikimori.one/api/doc)
- [Code example](./example/shikimori.ts)
- [Redoc][shikimori.redoc]
- [Swagger Editor][shikimori.swagger]

### Typescript client with [openapi-fetch](https://openapi-ts.dev/openapi-fetch/)

#### 1. Generating types from OpenAPI schema

```ps
deno run -A npm:openapi-typescript \
  https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml \
  -o ./shikimori.oas.ts
```

```ps
npx openapi-typescript \
  https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml \
  -o ./shikimori.oas.ts
```

```ts
// shikimori.ts
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
```

[danbooru.redoc]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml
[danbooru.swagger]: https://editor.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml
[moebooru.redoc]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/moebooru.openapi.yaml
[moebooru.swagger]: https://editor.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/moebooru.openapi.yaml
[shikimori.redoc]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml
[shikimori.swagger]: https://editor.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml

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

```ps
deno run ok
```

#### Build OpenAPI Schemas

```ps
deno run build
```

#### Build client types in [example](./example/)

```ps
deno run build:client
```
