import {createDoc} from '@maks11060/openapi'
import {zodPlugin} from '@maks11060/openapi/zod'
import {format} from '@std/datetime/format'

export const doc = createDoc({
  plugins: {
    schema: [zodPlugin()],
  },
  info: {
    title: 'Moebooru OpenAPI Spec',
    version: format(new Date(), 'yyyy.MM.dd'),
    description: 'Api spec for Moebooru-based services',
    contact: {
      url: 'https://github.com/maks11060/openapi',
    },
  },
  externalDocs: {
    url: 'https://yande.re/help/api',
    description: 'Api doc',
  },
  tags: [
    {name: 'posts'},
    {name: 'tags'},
    {name: 'artist'},
    {name: 'users'},
    {name: 'pools'},
  ],
})

doc.server({url: 'https://yande.re/', description: 'Main server'})

doc.server({url: 'https://konachan.com/', description: 'NSFW Version'})
doc.server({url: 'https://konachan.net/', description: 'SFW Version'})

export const anon = doc.addSecuritySchema.anonymous()
// export const auth = doc.addSecuritySchema.http('auth', 'basic', '')

doc.security(anon)
// doc.security(auth)
