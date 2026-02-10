#!/usr/bin/env -S deno run -A --env-file

import {getInternal, type OpenAPI} from '@maks11060/openapi'
import {parseArgs} from '@std/cli/parse-args'
import {promptSelect} from '@std/cli/unstable-prompt-select'
import {expandGlobSync} from '@std/fs'
import {basename, resolve, toFileUrl} from '@std/path'
import {Hono} from 'hono'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'

// proxy requests in case of problems with CORS
const proxyServices = new Set([
  'moebooru',
])

const getCodespaceUrl = (port: number = 8000) => {
  const domain = Deno.env.get('GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN')
  const name = Deno.env.get('CODESPACE_NAME') // app.github.dev
  if (!name || !domain) return undefined

  return `https://${name}-${port}.${domain}`
}

const serve = (doc: OpenAPI, config?: {proxy?: boolean; logger?: boolean}) => {
  const app = new Hono()
  app.use(cors({origin: '*'}))
  app.get('/openapi.json', (c) => c.text(doc.toJSON(true), {headers: {'Content-Type': 'application/json'}}))
  app.get('/openapi.yaml', (c) => c.text(doc.toYAML({lineWidth: 120 + 1})))

  if (config?.proxy) {
    if (config?.logger) app.use(logger())
    app.all('*', async (c) => {
      const url = new URL(c.req.url)
      const target = url.href.slice(url.origin.length + 1)

      const res = await fetch(target, {
        method: c.req.method,
        headers: c.req.raw.headers,
        body: c.req.raw.body,
      })
      return res
    })
  }

  const onListen = (localAddr: Deno.NetAddr) => {
    const baseUrl = getCodespaceUrl() ?? `${localAddr.port === 443 ? 'https' : 'http'}://localhost:${localAddr.port}`
    const docUrl = `${baseUrl}/openapi.yaml`

    if (config?.proxy) {
      const servers = getInternal(doc).servers
      const originalServers = structuredClone(servers)
      for (const server of servers) server.url = `${baseUrl}/${server.url}`
      for (const server of originalServers) servers.add(server)
    }

    if (config?.proxy) console.log(`%cProxy on %c${baseUrl}/`, 'color: blue', 'color: green')
    console.log(`%chttps://swagger-next.deno.dev/?url=${docUrl}`, 'color: orange')
    console.log(`%chttps://redocly.github.io/redoc/?url=${docUrl}&nocors`, 'color: orange')
  }

  Deno.serve({onListen}, app.fetch)
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

  serve(doc, {proxy: proxyServices.has(args.service)})
  stats(doc)
}
