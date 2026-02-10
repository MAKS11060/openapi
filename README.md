# OpenAPI Schemas

This repository contains **unofficial OpenAPI 3.1 specifications** for several public APIs.

The main goal of the project is to:

- Maintain accurate OpenAPI schemas
- Automatically publish them to [GitHub Releases](https://github.com/MAKS11060/openapi/releases)
- Provide easy online previews using common OpenAPI tools

The repository does **not** aim to provide SDKs or client implementations.

## Available APIs

| Service                 |          `YAML`           |          `JSON`           |          Swagger          |          Redoc          |
| ----------------------- | :-----------------------: | :-----------------------: | :-----------------------: | :---------------------: |
| [Danbooru](#danbooru)   | [yaml][dl.yaml.danbooru]  | [json][dl.json.danbooru]  | [Open][swagger.danbooru]  | [Open][redoc.danbooru]  |
| [Moebooru](#moebooru)   | [yaml][dl.yaml.moebooru]  | [json][dl.json.moebooru]  | [Open][swagger.moebooru]  | [Open][redoc.moebooru]  |
| [Shikimori](#shikimori) | [yaml][dl.yaml.shikimori] | [json][dl.json.shikimori] | [Open][swagger.shikimori] | [Open][redoc.shikimori] |
| Kemono                  |  [yaml][dl.yaml.kemono]   |  [json][dl.json.kemono]   |  [Open][swagger.kemono]   |  [Open][redoc.kemono]   |

## Danbooru

- [Danbooru](https://danbooru.donmai.us/)
  - [Developer API](https://danbooru.donmai.us/wiki_pages/help:api)
  - [Search Cheatsheet](https://danbooru.donmai.us/wiki_pages/help%3Acheatsheet)
  - [Help Table of Contents](https://danbooru.donmai.us/wiki_pages/help:toc#dtext-developer_guide:~:text=Danbooru%20Issues-,Developer%20Guide,-Danbooru%20API)

Online preview:

- [Swagger Editor][swagger.danbooru]
- [Redoc][redoc.danbooru]

## Moebooru

[Moebooru-based](https://github.com/moebooru/moebooru) services:

- [yande.re](https://yande.re)
  - [Developer API](https://yande.re/help/api)
- [konachan.com](https://konachan.com) | [konachan.net](https://konachan.net)

Online preview:

- [Swagger Editor][swagger.moebooru]
- [Redoc][redoc.moebooru]

## Shikimori

- [Shiki](https://shiki.one/) | [Shikimori](https://shikimori.one/)
  - [Developer API](https://shikimori.one/api/doc)

Online preview:

- [Swagger Editor][swagger.shikimori]
- [Redoc][redoc.shikimori]

## Releases

[dl.json.danbooru]: https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.json
[dl.json.kemono]: https://github.com/MAKS11060/openapi/releases/latest/download/kemono.openapi.json
[dl.json.moebooru]: https://github.com/MAKS11060/openapi/releases/latest/download/moebooru.openapi.json
[dl.json.shikimori]: https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.json
[dl.yaml.danbooru]: https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml
[dl.yaml.kemono]: https://github.com/MAKS11060/openapi/releases/latest/download/kemono.openapi.yaml
[dl.yaml.moebooru]: https://github.com/MAKS11060/openapi/releases/latest/download/moebooru.openapi.yaml
[dl.yaml.shikimori]: https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml
[redoc.danbooru]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml
[redoc.kemono]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/kemono.openapi.yaml
[redoc.moebooru]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/moebooru.openapi.yaml
[redoc.shikimori]: https://redocly.github.io/redoc/?url=https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml
[swagger.danbooru]: https://editor.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/danbooru.openapi.yaml
[swagger.kemono]: https://editor.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/kemono.openapi.yaml
[swagger.moebooru]: https://editor.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/moebooru.openapi.yaml
[swagger.shikimori]: https://editor.swagger.io/?url=https://no-cors.deno.dev/https://github.com/MAKS11060/openapi/releases/latest/download/shikimori.openapi.yaml

All OpenAPI schemas are **automatically built and published** to
[GitHub Releases.](https://github.com/MAKS11060/openapi/releases)

Each release contains standalone `.yaml` and `.json` files ready to be used with:

- Client generators
- Documentation generators
- API explorers
- Validators
