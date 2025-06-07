import z from 'zod/v4'
import {doc} from './openapi.ts'
import {
  autocomplete,
  forbidden,
  limit,
  notFound,
  only,
  page,
  post,
  postID,
  posts,
  postsLimit,
  unauthorized,
  user,
  userID,
  users,
} from './schema.ts'

export {doc} from './openapi.ts'

//////////////////////////////// Schemas
// doc.addSchema()
doc.addSchema('autocomplete', autocomplete)
doc.addSchema('forbidden', forbidden)
doc.addSchema('limit', limit)
doc.addSchema('notFound', notFound)
doc.addSchema('only', only)
doc.addSchema('page', page)
doc.addSchema('post', post)
doc.addSchema('postID', postID)
doc.addSchema('posts', posts)
doc.addSchema('postsLimit', postsLimit)
doc.addSchema('unauthorized', unauthorized)
doc.addSchema('user', user)
doc.addSchema('users', users)
doc.addSchema('userID', userID)

//////////////////////////////// Responses
const BadRequest = doc.addResponse('BadRequest', (t) => {
  t.describe('The given parameters could not be parsed')
  t.content('application/json', z.any())
})
const Unauthorized = doc.addResponse('Unauthorized', (t) => {
  t.describe('Authentication failed')
  t.content('application/json', unauthorized) //
  // .example('OAuth2 token invalid', (t) => {
  //   t.value({
  //     error: 'invalid_token',
  //     error_description: 'The access token is invalid',
  //     state: 'unauthorized',
  //   })
  // })
})
const ForbiddenResponse = doc.addResponse('Forbidden', (t) => {
  t.describe('Access denied')
  t.content('application/json', forbidden)
})
const NotFound = doc.addResponse('NotFound', (t) => {
  t.describe('Not Found')
  t.content('application/json', notFound)
})

//////////////////////////////// Parameters
const pageQueryParam = doc.addParameter('Page', 'query', 'page', (t) => t.schema(page))
const onlyQueryParam = doc.addParameter('Only', 'query', 'only', (t) => {
  t.schema(only) //
    .example('Get all fields', (t) => t.value(''))
    .example('Get id,created_at,file_url', (t) => t.value('id,created_at,file_url'))
})

const tagQueryParam = doc.addParameter('Tags', 'query', 'tags', (t) => {
  t.schema(z.string())
    .style('spaceDelimited') //
    .example('No tags', (t) => t.value(''))
    .example('Daily top', (t) => t.value('order:rank'))
    .example('Weekly top by score', (t) => t.value('order:score -rating:e,q age:<7d'))
    .example('Weekly top by favorites', (t) => t.value('order:favcount -rating:e,q age:<7d'))
    .example('Saved searches', (t) => t.value('search:all'))
})

//////////////////////////////// Paths
//////////////// Posts
doc
  .addPath('/posts.json') //
  // .parameter('query', 'tags', (t) => {
  //   t.schema(z.string())
  //     .style('spaceDelimited') //
  //     .example('No tags', (t) => t.value(''))
  //     .example('Daily top', (t) => t.value('order:rank'))
  //     .example('Weekly top by score', (t) => t.value('order:score -rating:e,q age:<7d'))
  //     .example('Weekly top by favorites', (t) => t.value('order:favcount -rating:e,q age:<7d'))
  //     .example('Saved searches', (t) => t.value('search:all'))
  // })
  .parameter('query', 'limit', (t) => t.schema(postsLimit))
  .parameter(tagQueryParam)
  .parameter(pageQueryParam)
  .parameter(onlyQueryParam)
  .get((t) => {
    t.tag('posts')
    t.describe('Posts list')
    t.operationId('list_posts')

    t.externalDocs({
      url: 'https://danbooru.donmai.us/wiki_pages/help%3Acheatsheet',
      description: 'This cheatsheet describes how to search and tag posts',
    })

    t.response(200, (t) => {
      t.content('application/json', posts)
    })
    t.response(400, BadRequest)
    t.response(401, Unauthorized)
    t.response(404, NotFound)
  })

doc
  .addPath('/posts/{id}.json', {id: (t) => t.schema(postID)}) //
  .parameter(onlyQueryParam)
  .get((t) => {
    t.tag('posts')
    t.describe('Show post')
    t.operationId('get_post')

    t.response(200, (t) => {
      t.content('application/json', post)
    })
    t.response(400, BadRequest)
    t.response(401, Unauthorized)
    t.response(404, NotFound)
  })

doc
  .addPath('/posts/random.json') //
  .parameter(onlyQueryParam)
  .get((t) => {
    t.tag('posts')
    t.describe('Get random post')
    t.operationId('get_random_post')

    t.response(200, (t) => {
      t.content('application/json', post)
    })
    t.response(400, BadRequest)
    t.response(401, Unauthorized)
    t.response(404, NotFound)
  })

//////////////// Users

doc
  .addPath('/users.json') //
  .parameter(tagQueryParam)
  .get((t) => {
    t.tag('users')
    t.describe('Get list of users')
    t.operationId('list_users')

    t.response(200, (t) => {
      t.content('application/json', users)
    })
    t.response(400, BadRequest)
    t.response(401, Unauthorized)
    t.response(404, NotFound)
  })

doc
  .addPath('/users/{id}.json', {id: (t) => t.schema(userID)}) //
  .parameter(tagQueryParam)
  .get((t) => {
    t.tag('users')
    t.describe('Get user')
    t.operationId('get_user')

    t.response(200, (t) => {
      t.content('application/json', user)
    })
    t.response(400, BadRequest)
    t.response(401, Unauthorized)
    t.response(404, NotFound)
  })

//////////////// Autocomplete
doc
  .addPath('/autocomplete.json') //
  .parameter('query', 'search[type]', (t) => {
    t.schema(z.enum(['tag', 'user', 'artist']))
  })
  .parameter('query', 'search[query]', (t) => {
    t.schema(z.string()) //
      .example('Example', (t) => t.value('zenless zone zero'))
  })
  // .parameter('query', 'search', (t) => {
  //   t.style('form')
  //   t.content(
  //     'application/x-www-form-urlencoded',
  //     z.object({
  //       type: z.enum(['tag', 'user', 'artist']),
  //       query: z.string(),
  //     })
  //   ) //
  // })
  .parameter('query', 'limit', (t) => t.schema(limit))
  .get((t) => {
    t.tag('autocomplete')
    t.describe('Get autocomplete')
    t.operationId('get_autocomplete')

    t.response(200, (t) => {
      t.content('application/json', autocomplete)
    })
    t.response(400, BadRequest)
    t.response(401, Unauthorized)
    t.response(404, NotFound)
  })
