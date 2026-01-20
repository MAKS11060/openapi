import {z} from 'zod'
import {doc} from './openapi.ts'
import {artists, page, poolPosts, pools, posts, postV2, tagRelated, tags, users} from './schema.ts'

export {doc} from './openapi.ts'

// --- Global schemas ---
doc.addSchemas({
  artists,
  page,
  poolPosts,
  pools,
  posts,
  postV2,
  tagRelated,
  tags,
  users,
})

// --- Global parameters ---
const limitQueryParam = doc.addParameter('Limit', 'query', 'limit', (t) => {
  t.schema(z.int().positive().max(100))
})
const pageQueryParam = doc.addParameter('Page', 'query', 'page', (t) => t.schema(page))
const tagsQueryParam = doc.addParameter('Tags', 'query', 'tags', (t) => {
  t.style('spaceDelimited')
  t.schema(z.string().or(z.string().array()))
    //     .example('No tags', (t) => t.value(''))
    .example('Post by ID', (t) => t.value('id:3,1252961'))
    .example('Post by MD5', (t) => t.value('md5:04399f2ed1c932d9bb8f848bf995f1f7'))
  //     .example('Daily top', (t) => t.value('order:rank'))
  //     .example('Weekly top by score', (t) => t.value('order:score is:sfw age:<7d'))
  //     .example('Weekly top by favorites', (t) => t.value('order:favcount is:sfw age:<7d'))
  //     .example('Saved searches', (t) => t.value('search:all'))
})

// --- Posts ---
doc.addPath('/post.json')
  .parameter(limitQueryParam)
  .parameter(pageQueryParam)
  .parameter(tagsQueryParam)
  .get((t) => {
    t.tag('posts')
    t.describe('Posts list')
    t.operationId('list_posts')

    t.response(200, (t) => {
      t.content('application/json', posts)
    })
  })

doc.addPath('/post.json?api_version=2')
  .parameter(limitQueryParam)
  .parameter(pageQueryParam)
  .parameter(tagsQueryParam)
  .parameter('query', 'include_tags', (t) => t.schema(z.union([z.literal(0), z.literal(1)])))
  .parameter('query', 'include_votes', (t) => t.schema(z.union([z.literal(0), z.literal(1)])))
  .parameter('query', 'include_pools', (t) => t.schema(z.union([z.literal(0), z.literal(1)])))
  .parameter('query', 'filter', (t) => t.schema(z.union([z.literal(0), z.literal(1)])))
  .get((t) => {
    t.tag('posts')
    t.describe('Posts list v2')
    t.operationId('list_posts_v2')
    t.externalDocs({url: 'https://yande.re/wiki/show?title=api_v2'})

    t.response(200, (t) => {
      t.content('application/json', postV2)
    })
  })

// --- Tags ---
doc.addPath('/tag.json')
  .parameter(pageQueryParam)
  .parameter('query', 'limit', (t) => {
    t.schema(z.int().positive())
      .example('Set limit 10', (t) => t.value(10))
      .example('Set 0 return every tag', (t) => t.value(0))
  })
  .parameter('query', 'order', (t) => t.schema(z.enum(['date', 'count', 'name'])))
  .parameter('query', 'id', (t) => t.schema(z.coerce.number()))
  .parameter('query', 'after_id', (t) => t.schema(z.coerce.number()))
  .parameter('query', 'name', (t) => t.schema(z.string()))
  .parameter('query', 'name_pattern', (t) => t.schema(z.string()))
  .get((t) => {
    t.tag('tags')
    t.describe('Tags list')
    t.operationId('list_tags')

    t.response(200, (t) => {
      t.content('application/json', tags)
    })
  })

doc.addPath('/tag/related.json')
  .parameter(limitQueryParam)
  .parameter(pageQueryParam)
  .parameter('query', 'order', (t) => t.schema(z.enum(['date', 'count', 'name'])))
  .parameter('query', 'id', (t) => t.schema(z.coerce.number()))
  .parameter('query', 'after_id', (t) => t.schema(z.coerce.number()))
  .parameter('query', 'name', (t) => t.schema(z.string()))
  .parameter('query', 'name_pattern', (t) => t.schema(z.string()))
  .get((t) => {
    t.tag('tags')
    t.describe('Tags list')
    t.operationId('list_related_tags')

    t.response(200, (t) => {
      t.content('application/json', tagRelated)
    })
  })

// --- Artist ---
doc.addPath('/artist.json')
  .parameter(pageQueryParam)
  .parameter('query', 'name', (t) => t.schema(z.string()))
  .parameter('query', 'order', (t) => t.schema(z.enum(['date', 'name'])))
  .get((t) => {
    t.tag('artist')
    t.describe('Artist list')
    t.operationId('list_artist')

    t.response(200, (t) => {
      t.content('application/json', artists)
    })
  })

// --- Users ---
doc.addPath('/user.json')
  .parameter('query', 'id', (t) => t.schema(z.coerce.number()))
  .parameter('query', 'name', (t) => t.schema(z.string()))
  .get((t) => {
    t.tag('users')
    t.describe('Users list')
    t.operationId('list_users')

    t.response(200, (t) => {
      t.content('application/json', users)
    })
  })

// --- Pools ---
doc.addPath('/pool.json')
  .parameter('query', 'query', (t) => t.schema(z.string()))
  .parameter(pageQueryParam)
  .get((t) => {
    t.tag('pools')
    t.describe('Pool list')
    t.operationId('list_pools')

    t.response(200, (t) => {
      t.content('application/json', pools)
    })
  })

doc.addPath('/pool/show.json')
  .parameter('query', 'id', (t) => t.required().schema(z.coerce.number()))
  .parameter(pageQueryParam)
  .get((t) => {
    t.tag('pools')
    t.describe('Pool posts list')
    t.operationId('list_pool_posts')

    t.response(200, (t) => {
      t.content('application/json', poolPosts)
    })
  })
