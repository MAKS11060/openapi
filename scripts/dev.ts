#!/usr/bin/env -S deno run -A --watch-hmr

import { OpenAPI } from '@maks11060/openapi'
import { parseArgs } from '@std/cli/parse-args'
import { promptSelect } from 'jsr:@std/cli/unstable-prompt-select'
import { expandGlobSync } from 'jsr:@std/fs'
import { basename, resolve, toFileUrl } from 'jsr:@std/path'
import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'

const serve = (doc: OpenAPI) => {
  const app = new Hono() //
    .use(cors())
    .get('/openapi.json', (c) => c.text(doc.toJSON(true), {headers: {'Content-Type': 'application/json'}}))
    .get('/openapi.yaml', (c) => c.text(doc.toYAML({lineWidth: 120 + 1})))

  Deno.serve(app.fetch)

  setTimeout(() => {
    console.log('https://swagger-next.deno.dev/?url=http://localhost:8000/openapi.yaml')
  })
}

const services = Array.from(expandGlobSync(`./src/**/mod.ts`), (entry) => {
  return basename(resolve(entry.path, './..'))
})

const args = parseArgs(Deno.args, {
  boolean: ['serve', 'verbose'],
  string: ['service'],
  alias: {
    s: 'serve',
    i: 'service',
    v: 'verbose',
  },
})

if (!args.service) {
  args.service = promptSelect('Select service:', services, {clear: true})!
}

if (args.service && !services.includes(args.service)) {
  throw new Error('Service not found')
}

const {doc} = (await import(toFileUrl(resolve(`./src/${args.service}/mod.ts`)).toString())) as {
  doc: OpenAPI
}

const oasYAML = doc.toYAML()

if (args.serve) serve(doc)
if (args.verbose) console.log(oasYAML)

console.log(`lines: %c${oasYAML.split('\n').length}`, 'color:orange')
