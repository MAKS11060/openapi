import {createDoc} from '@maks11060/openapi'
import {zodPlugin} from '@maks11060/openapi/zod'
import {format} from '@std/datetime/format'

export const doc = createDoc({
  plugins: {
    schema: [zodPlugin()],
  },
  info: {
    title: 'Kemono OpenAPI Spec',
    version: format(new Date(), 'yyyy.MM.dd'),
  },
  externalDocs: {
    url: 'https://kemono.cr/documentation/api',
    description: 'Api doc',
  },
  tags: [
    {name: 'posts'},
    {name: 'users'},
  ],
})

doc.server({url: 'https://kemono.cr/api', description: 'Main server'})

export const anon = doc.addSecuritySchema.anonymous()
// export const auth = doc.addSecuritySchema.http('auth', 'basic', '')

doc.security(anon)
// doc.security(auth)
