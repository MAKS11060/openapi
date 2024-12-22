#!/usr/bin/env -S deno run -A --watch-hmr

import 'jsr:@std/dotenv/load'
import {swaggerUI} from 'npm:@hono/swagger-ui'
import {Hono} from 'npm:hono'
import {cors} from 'npm:hono/cors'
import {logger} from 'npm:hono/logger'
import {openapi} from "./devSchema.ts"
import {YAML} from './src/deps.ts'

const app = new Hono()

app.use(logger())
app.use(cors())

app.get('/doc', swaggerUI({url: '/openapi.yml'}))
app.get('/openapi.yml', async (c) => {
  return c.text(YAML.stringify(openapi), {
    headers: {'Content-Type': 'application/yaml'},
  })
})
app.get('/openapi.json', async (c) => {
  return c.json(openapi)
})

if (Deno.env.has('KEY') && Deno.env.has('CERT')) {
  const key = Deno.readTextFileSync(Deno.env.get('KEY')!)
  const cert = Deno.readTextFileSync(Deno.env.get('CERT')!)
  Deno.serve({port: 443, key, cert}, app.fetch)
} else {
  Deno.serve({port: 80}, app.fetch)
}
