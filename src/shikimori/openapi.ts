import {createDoc} from '@maks11060/openapi'
import {zodPlugin} from '@maks11060/openapi/zod'

const README = Deno.readTextFileSync('./src/shikimori/README.md').replaceAll('\r\n', '\n')

export const doc = createDoc({
  plugins: {
    schema: [zodPlugin()],
  },
  info: {
    title: 'Shikimori API',
    version: '0.0.5',
    description: README,
  },
  externalDocs: {
    url: 'https://shikimori.one/api/doc',
    description: 'Official Shikimori API',
  },
  tags: [
    //
    {name: 'anime'},
    // {name: 'manga'},
    // {name: 'ranobe'},

    {name: 'v1_user'},
    {name: 'v2_user'},

    {name: 'achievements'},

    {name: 'characters'},
    {name: 'people'},

    {name: 'constants'},
    {name: 'genres'},
    {name: 'studios'},

    {name: 'videos'},

    {name: 'manga', description: 'WIP'},
    {name: 'ranobe', description: 'WIP'},
  ],
})

doc.server({
  url: 'https://shikimori.one/',
  description: 'Main server',
})

export const anon = doc.addSecuritySchema.anonymous()
export const oauth2 = doc.addSecuritySchema.oauth2('OAuth2', {
  authorizationCode: {
    authorizationUrl: 'https://shikimori.one/oauth/authorize',
    tokenUrl: 'https://shikimori.one/oauth/token',
    refreshUrl: 'https://shikimori.one/oauth/token',
    scopes: {
      user_rates: '',
      email: '',
      messages: '',
      comments: '',
      topics: '',
      content: '',
      clubs: '',
      friends: '',
      ignores: '',
    },
  },
})

doc.security(anon)
doc.security(oauth2)
