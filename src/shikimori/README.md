The API has three versions: [`graphql`][graphql], outdated [`v2`][v2] and outdated [`v1`][v1]. Prefer using `graphql`
over `v2` / `v1` when it is possible.

**Please do not parse the main site.** Fetch all necessary data via API.

**NOTE:** New anime/manga/character/person posters available only in `graphql` API.

API works with `HTTPS` protocol only.

### Authentication

`OAuth2` is used for authentication. [`OAuth2 guide`][oauth2-guide].

All other auth methods are deprecated and will be removed after `2018-07-01.`

### Restrictions

API access is limited by `5rps` and `90rpm`

### Requirements

Add your `OAuth2` Application name to `User-Agent` requests header.

Don’t mimic a browser.

Your IP address may be banned if you use API without properly set `User-Agent` header.

[graphql]: https://shikimori.one/api/doc/graphql
[v2]: https://shikimori.one/api/doc/2.0.html
[v1]: https://shikimori.one/api/doc/1.0.html
[oauth2-guide]: https://shikimori.one/oauth
