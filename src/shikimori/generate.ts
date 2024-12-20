#!/usr/bin/env -S deno run -A --watch-hmr

import {parseArgs} from 'jsr:@std/cli/parse-args'
import {OpenApiGeneratorV31} from 'npm:@asteasolutions/zod-to-openapi'
import {YAML} from '../deps.ts'
import {registry} from './registry.ts'
import './shikimori.ts'

const args = parseArgs(Deno.args, {
  boolean: ['json', 'yaml', 'verbose', 'dry-run'],
  default: {yaml: true},
  alias: {
    v: 'verbose',
    d: 'dry-run',
  },
})

const generator = new OpenApiGeneratorV31(registry.definitions)

export const openapi = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    version: '0.0.1',
    title: 'Shikimori API',
  },
  externalDocs: {
    url: 'https://shikimori.one/api/doc',
    description: 'Official Shikimori API',
  },
  servers: [
    {
      url: 'https://shikimori.one',
      description: 'Main server',
    },
  ],
})

const filename = 'shikimori'

if (args.yaml && !args["dry-run"]) {
  Deno.writeTextFileSync(`./gen/${filename}.openapi.yml`, YAML.stringify(openapi))
}
if (args.json && !args["dry-run"]) {
  Deno.writeTextFileSync(`./gen/${filename}.openapi.json`, JSON.stringify(openapi, null, 2))
}
if (args.verbose) {
  if (args.yaml) console.log(YAML.stringify(openapi))
  else console.log(JSON.stringify(openapi, null, 2))
}
