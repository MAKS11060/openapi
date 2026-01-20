import {z} from 'zod'
import {doc} from './openapi.ts'
import {artistLinks, artistProfile, post} from './schema.ts'

export {doc} from './openapi.ts'

// --- Global schemas ---
doc.addSchemas({artistLinks, artistProfile, post})

// --- Global parameters ---
const acceptHeader = doc.addHeader('accept', (t) => {
  t.required().schema(z.literal('text/css')) // for ddos-guard
})

// --- Posts ---
doc.addPath('/v1/{service}/user/{creator_id}/posts', {
  service: (t) => t.schema(z.string()),
  creator_id: (t) => t.schema(z.string()),
})
  .get((t) => {
    t.tag('posts')
    t.describe('Get post')

    t.response(200, (t) => {
      t.content('application/json', post)
    })
    t.response(404, (t) => {})
  })

doc.addPath('/v1/{service}/user/{creator_id}/post/{post_id}', {
  service: (t) => t.schema(z.string()),
  creator_id: (t) => t.schema(z.string()),
  post_id: (t) => t.schema(z.string()),
})
  .get((t) => {
    t.tag('posts')
    t.describe('Get a specific post')

    t.response(200, (t) => {
      t.content('application/json', post)
    })
  })

// --- Users ---
doc.addPath('/v1/{service}/user/{creator_id}/profile', {
  service: (t) => t.schema(z.string()),
  creator_id: (t) => t.schema(z.string()),
})
  .get((t) => {
    t.tag('users')
    t.describe('Get creator profile')

    t.response(200, (t) => {
      t.content('application/json', artistProfile)
    })
  })

doc.addPath('/v1/{service}/user/{creator_id}/links', {
  service: (t) => t.schema(z.string()),
  creator_id: (t) => t.schema(z.string()),
})
  .get((t) => {
    t.tag('users')
    t.describe('Get creator links')

    t.response(200, (t) => {
      t.content('application/json', artistLinks)
    })
  })

// --- File Search ---
// doc.addPath('/v1/search_hash/{file_hash}', {
//   file_hash: (t) =>
//     t.schema(z.string()).describe('SHA-256 (SHA2)')
//       .example('Example 1', (t) => t.value('4aa8636cc824730d331c81eb8c33e4b1fe5947df320241fc56fc01e28aefe007')),
// })
//   .get((t) => {
//     t.tag('file search')
//     t.describe('Get post')

//     t.response(200, (t) => {
//       t.content('application/json', artistLinks)
//     })
//   })
