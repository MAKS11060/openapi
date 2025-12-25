import {z} from 'zod'
import {doc} from './openapi.ts'
import {
  artist,
  artists,
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
  tag,
  tagCategory,
  tags,
  unauthorized,
  user,
  userID,
  users,
} from './schema.ts'

export {doc} from './openapi.ts'

//////////////////////////////// Schemas
doc.addSchemas({
  artist,
  artists,
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
  tag,
  tags,
  unauthorized,
  user,
  userID,
  users,
})

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
const limitQueryParam = doc.addParameter('Limit', 'query', 'limit', (t) => t.schema(z.int().positive().max(1000)))
const postsLimitQueryParam = doc.addParameter('LimitPosts', 'query', 'limit', (t) => t.schema(postsLimit))
const pageQueryParam = doc.addParameter('Page', 'query', 'page', (t) => t.schema(page))

const tagsQueryParam = doc.addParameter('Tags', 'query', 'tags', (t) => {
  t.style('spaceDelimited')
  t.schema(z.string().or(z.string().array()))
    .example('No tags', (t) => t.value(''))
    .example('Post by ID', (t) => t.value('id:1,10294969'))
    .example('Post by MD5', (t) => t.value('md5:04399f2ed1c932d9bb8f848bf995f1f7'))
    .example('Daily top', (t) => t.value('order:rank'))
    .example('Weekly top by score', (t) => t.value('order:score is:sfw age:<7d'))
    .example('Weekly top by favorites', (t) => t.value('order:favcount is:sfw age:<7d'))
    .example('Saved searches', (t) => t.value('search:all'))
})

//////////////////////////////// Paths

// --- Posts ---
doc
  .addPath('/posts.json') //
  .parameter(tagsQueryParam)
  .parameter(pageQueryParam)
  .parameter(postsLimitQueryParam)
  .parameter('query', 'md5', (t) => {
    t.explode(false)
    t.schema(z.string().or(z.string().array()))
  })
  .parameter('query', 'only', (t) => {
    t.style('form')
    t.explode(false)
    t.schema(post.keyof().array())
      .example('Pick id,file_url', (t) => t.value(['id', 'file_url']))
  })
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
  .parameter('query', 'only', (t) => {
    t.explode(false)
    t.schema(post.keyof().array())
      .example('Pick id,file_url', (t) => t.value(['id', 'file_url']))
  })
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
  .parameter(tagsQueryParam)
  .parameter('query', 'only', (t) => {
    t.explode(false)
    t.schema(post.keyof().array())
      .example('Pick id,file_url', (t) => t.value(['id', 'file_url']))
  })
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

// --- Users ---
doc
  .addPath('/users.json') //
  .parameter('query', 'search', (t) => {
    t.style('deepObject')
    t.explode(false)
    t.schema(
      z.object({
        id: z.number().or(z.number().array()),
        name: z.string(),

        created_at: z.number(),
        updated_at: z.number(),

        // https://danbooru.donmai.us/wiki_pages/api%3Aartists#:~:text=Special%20search%20parameters
        name_matches: z.string(),
        min_level: z.string(),
        max_level: z.string(),
        current_user_first: z.string(),
        order: z.union([
          z.literal('name'),
          z.literal('post_upload_count'),
          z.literal('post_update_count'),
          z.literal('note_count'),
        ]),
      }).partial(),
    )
  })
  .parameter('query', 'only', (t) => {
    t.explode(false)
    t.schema(user.keyof().array())
      .example('Pick id,name', (t) => t.value(['id', 'name']))
  })
  .parameter(tagsQueryParam)
  .parameter(pageQueryParam)
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
  .parameter('query', 'only', (t) => {
    t.explode(false)
    t.schema(user.keyof().array())
      .example('Pick id,name', (t) => t.value(['id', 'name']))
  })
  .parameter(tagsQueryParam)
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

// --- Artists ---
doc.addPath('/artists.json')
  .parameter('query', 'search', (t) => {
    t.style('deepObject')
    t.explode(false)
    t.schema(
      z.object({
        id: z.number().or(z.number().array()),
        name: z.string(),
        group_name: z.string(),
        created_at: z.number(),
        updated_at: z.number(),
        is_deleted: z.boolean(),
        is_banned: z.boolean(),

        // https://danbooru.donmai.us/wiki_pages/api%3Aartists#:~:text=Special%20search%20parameters
        any_other_name_like: z.string(),
        any_name_matches: z.string(),
        url_matches: z.string(),
        any_name_or_url_matches: z.string(),
        order: z.union([
          z.literal('name'),
          z.literal('updated_at'),
          z.literal('post_count'),
          z.literal('custom'),
        ]),
      }).partial(),
    )
      .example('Use ID', (t) => t.value({id: 188101}))
      .example('Use array ID', (t) => t.value({id: [188101, 210615]}))
  })
  .parameter('query', 'only', (t) => {
    t.explode(false)
    t.schema(artist.keyof().array())
      .example('Pick id,name', (t) => t.value(['id', 'name']))
      .example('Pick id,name,urls', (t) => t.value(['id', 'name', 'urls']))
  })
  .parameter(limitQueryParam)
  .parameter(pageQueryParam)
  .get((t) => {
    t.tag('artists')
    t.operationId('list_artists')

    t.response(200, (t) => {
      t.content('application/json', artists)
    })
  })

doc.addPath('/artists/{id}.json', {id: (t) => t.schema(artist.shape.id)})
  .parameter('query', 'only', (t) => {
    t.explode(false)
    t.schema(artist.keyof().array())
      .example('Pick id,name,urls', (t) => t.value(['id', 'name', 'urls']))
  })
  .get((t) => {
    t.tag('artists')
    t.operationId('get_artist')
    t.describe('Get artist')

    t.response(200, (t) => {
      t.content('application/json', artist)
    })
  })

// --- Tags ---
doc.addPath('/tags.json')
  .parameter('query', 'search', (t) => {
    t.style('deepObject')
    t.explode(false)
    t.schema(
      z.object({
        id: z.number().or(z.number().array()),
        name: z.string(),
        category: tagCategory.or(tagCategory.array()), // 1 / [0, 1]
        post_count: z.number().positive(),
        is_deprecated: z.boolean(),
        created_at: z.number(),
        updated_at: z.number(),

        // https://danbooru.donmai.us/wiki_pages/api%3Atags#:~:text=Special%20search%20parameters
        fuzzy_name_matches: z.string(),
        name_matches: z.string(),
        name_normalize: z.string().or(z.string().array()),
        name_or_alias_matches: z.string(),
        hide_empty: z.string(),
        is_empty: z.string(),

        order: z.union([
          z.literal('name'),
          z.literal('date'),
          z.literal('count'),
          z.literal('similarity'),
          z.literal('custom'),
        ]),
      }).partial(),
    )
      .example('Use ID', (t) => t.value({id: 188101}))
      .example('Use array ID', (t) => t.value({id: [188101, 210615]}))
  })
  .parameter('query', 'only', (t) => {
    t.explode(false)
    t.schema(tag.keyof().array())
      .example('Pick id,name', (t) => t.value(['id', 'name']))
      .example('Pick id,name,category', (t) => t.value(['id', 'name', 'category']))
  })
  .parameter(limitQueryParam)
  .parameter(pageQueryParam)
  .get((t) => {
    t.tag('tags')
    t.operationId('list_tags')

    t.response(200, (t) => {
      t.content('application/json', tags)
    })
  })

doc.addPath('/tags/{id}.json', {id: (t) => t.schema(tag.shape.id)})
  .parameter('query', 'only', (t) => {
    t.explode(false)
    t.schema(tag.keyof().array())
      .example('Pick id,name,category', (t) => t.value(['id', 'name', 'category']))
  })
  .get((t) => {
    t.tag('tags')
    t.operationId('get_tag')
    t.describe('Get tag')

    t.response(200, (t) => {
      t.content('application/json', tag)
    })
  })

// --- Reverse search ---
doc
  .addPath('/iqdb_queries.json') //
  .parameter('query', 'search', (t) => {
    t.style('deepObject')
    t.explode(false)
    t.schema(
      z.object({
        id: postID,
        url: z.string(),
        hash: z.string().describe('The IQDB hash'),
        // TODO: file: ?
      }).partial(),
    )
      .example('Use ID', (t) => t.value({id: 10294969}))
      .example('Use URL', (t) => t.value({url: 'https://example.com'}))
      .example('Use IQDB', (t) =>
        t.value({
          // deno-fmt-ignore
          hash: 'iqdb_3fe037e0804fa2e23fa801eee79596303f775005ad0e315ef0f9f780fa80fbfdfc00fc7dfcfbfd80fdf5fdf9fe00fef9ff00ff7efff4fffcfffeffff00030007000f00830087008e0180018101830187018f028303000307030e0402050b06800681068e0d800d83e77ef1f1f877f880f9fef9fffc6dfc80fca0fcfbfd7afd7dfdfbfdfefe61fe78fef3fefdff6dff7efff8fff9fffc000100020005000a0013008300870101018101820183018702810318038406080704e57ef1f1f320f877f96df97ef97ff980f9f8fc6dfc7efc80fca0fe6dfe7efe7ffe80fefdff00ff78fffcfffeffff0008008100820083008701830184018701880318060006010602061306880e3d1882',
        }))
  })
  .parameter(limitQueryParam)
  .get((t) => {
    t.tag('search image')
    t.response(200, (t) => {
      t.content(
        'application/json',
        z.object({
          hash: z.string(),
          post_id: postID,
          score: z.number().min(0).max(100),
          signature: z.object({
            avglf: z.tuple([z.number(), z.number(), z.number()]),
            sig: z.tuple([
              z.array(z.number()),
              z.array(z.number()),
              z.array(z.number()),
            ]),
          }),
          post,
        }),
      )
    })
  })

// --- Autocomplete ---
doc
  .addPath('/autocomplete.json') //
  .parameter('query', 'search', (t) => {
    t.style('deepObject')
    t.explode(false)
    t.schema(z.object({
      type: z.union([
        z.literal('tag'),
        z.literal('user'),
        z.literal('artist'),
      ]),
      query: z.string(),
    }))
      .example('Search Tag', (t) => t.value({type: 'tag', query: 'zenless zone zero'}))
      .example('Search Artists', (t) => t.value({type: 'artist', query: 'lunacle'}))
  })
  .parameter(limitQueryParam)
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
