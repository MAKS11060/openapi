import { createDoc } from '@maks11060/openapi'
import { zodPlugin } from '@maks11060/openapi/zod'
import { format } from '@std/datetime/format'

export const doc = createDoc({
  plugins: {
    schema: [zodPlugin()],
  },
  info: {
    title: 'Danbooru API',
    version: format(new Date(), 'yyyy.MM.dd'),
  },
  externalDocs: {
    url: 'https://danbooru.donmai.us/wiki_pages/help:api',
    description: 'Api Wiki',
  },
  tags: [
    //
    {name: 'posts', externalDocs: {url: 'https://danbooru.donmai.us/wiki_pages/api:posts'}},
    {name: 'users', externalDocs: {url: 'https://danbooru.donmai.us/wiki_pages/api:users'}},
    {name: 'autocomplete'},
  ],
})

doc.server({url: 'https://danbooru.donmai.us/', description: 'Main server'})
doc.server({url: 'https://testbooru.donmai.us/', description: 'Test server'})

export const anon = doc.addSecuritySchema.anonymous()
export const auth = doc.addSecuritySchema.http('auth', 'basic', '')

doc.security(anon)
doc.security(auth)
