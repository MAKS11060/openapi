import {z} from 'zod'

// --- shared ---
export const limit = z.int().positive().max(100).describe('The number of results to show per page')
export const page = z.int().positive().min(1).describe('The number of results to show per page')
export const only = z.string().describe('Determines the list of attributes that will be returned')

export const ID = z.int().positive().min(1).describe('The ID')

// --- Posts ---
export const post = z.object({
  post: z.object({
    id: z.string(),
    user: z.string(),
    service: z.string(),
    title: z.string().optional(),
    content: z.string().optional(),
    embed: z.object(),
    shared_file: z.boolean(),
    added: z.iso.datetime(),
    published: z.iso.datetime(),
    edited: z.iso.datetime(),
    file: z.object({
      name: z.string(),
      path: z.string(),
    }),
    attachments: z.object({
      name: z.string(),
      path: z.string(),
    }).array(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
})

export const posts = post.array()

// --- Artist ---
export const artistProfile = z.object({
  id: z.string(),
  public_id: z.string(),
  service: z.string(),
  name: z.string(),
  indexed: z.iso.datetime(),
  updated: z.iso.datetime(),
})

export const artistsProfile = artistProfile.array()

export const artistLink = z.object({
  id: z.string(),
  public_id: z.string(),
  service: z.string(),
  name: z.string(),
  indexed: z.string(),
  updated: z.string(),
})

export const artistLinks = z.array(artistLink)
