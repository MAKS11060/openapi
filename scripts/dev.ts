#!/usr/bin/env -S deno run -A --env-file

import {OpenAPI} from '@maks11060/openapi'
import {parseArgs} from '@std/cli/parse-args'
import {promptSelect} from 'jsr:@std/cli/unstable-prompt-select'
import {expandGlobSync} from 'jsr:@std/fs'
import {basename, resolve, toFileUrl} from 'jsr:@std/path'
import {Hono} from 'npm:hono'
import {cors} from 'npm:hono/cors'

const serve = (doc: OpenAPI) => {
  const app = new Hono() //
    // .use(cors({origin: (origin) => origin}))
    .use(cors({
      origin: '*',
    }))
    .get('/openapi.json', (c) => c.text(doc.toJSON(true), {headers: {'Content-Type': 'application/json'}}))
    .get('/openapi.yaml', (c) => c.text(doc.toYAML({lineWidth: 120 + 1})))

  const onListen = (localAddr: Deno.NetAddr) => {
    const baseUrl = `${localAddr.port === 443 ? 'https' : 'http'}://localhost:${localAddr.port}`
    const docUrl = `${baseUrl}/openapi.yaml`

    console.log(`%chttps://swagger-next.deno.dev/?url=${docUrl}`, 'color: orange')
    console.log(`%chttps://redocly.github.io/redoc/?url=${docUrl}&nocors`, 'color: orange')
  }

  Deno.serve({onListen}, app.fetch)
  // if (Deno.env.has('KEY') && Deno.env.has('CERT')) {
  //   const key = Deno.readTextFileSync(Deno.env.get('KEY')!)
  //   const cert = Deno.readTextFileSync(Deno.env.get('CERT')!)
  //   Deno.serve({port: 443, key, cert, onListen}, app.fetch)
  // } else {
  //   Deno.serve({onListen}, app.fetch)
  // }
}

const stats = (doc: OpenAPI) => {
  console.log(`YAML lines: %c${doc.toYAML().split('\n').length}`, 'color:orange')
  // console.log(`JSON lines: %c${doc.toJSON(true).split('\n').length}`, 'color:orange')
  // const yaml = doc.toYAML()
  // const json = doc.toJSON(true)
  // console.table({
  //   YAML: {
  //     lines: yaml.split('\n').length,
  //     bytes: new TextEncoder().encode(yaml).byteLength,
  //   },
  //   JSON: {
  //     lines: json.split('\n').length,
  //     bytes: new TextEncoder().encode(json).byteLength,
  //   },
  // })
}

const args = parseArgs(Deno.args, {
  alias: {
    s: 'service',
  },
  string: ['service'],
})

if (!args.service) { // main
  const services = Array.from(
    expandGlobSync(`./src/**/mod.ts`),
    (entry) => basename(resolve(entry.path, '..')),
  )
  args.service = promptSelect('Select service:', services, {clear: true})!

  new Deno.Command(Deno.execPath(), {
    // deno-fmt-ignore
    args: [
      'run', '-A', '--env-file', '--watch', './scripts/dev.ts',
      '--service', args.service,
    ],
    stdout: 'inherit',
    stderr: 'inherit',
  }).outputSync()
} else { // sub proc with watch mode
  console.log(`%cServe %c${args.service}`, 'color: blue', 'color: green')
  const {doc} = await import(
    toFileUrl(resolve(`./src/${args.service}/mod.ts`)).toString()
  ) as {doc: OpenAPI}

  serve(doc)
  stats(doc)
}
