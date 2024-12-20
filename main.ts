#!/usr/bin/env -S deno run -A --watch-hmr

import {extendZodWithOpenApi} from '@asteasolutions/zod-to-openapi'
import {parseArgs} from 'jsr:@std/cli/parse-args'
import {ensureDirSync, expandGlobSync} from 'jsr:@std/fs'
import {dirname, toFileUrl} from 'jsr:@std/path'
import {z} from 'zod'
import {YAML} from './src/deps.ts'

extendZodWithOpenApi(z)

const args = parseArgs(Deno.args, {
  boolean: ['json', 'yaml', 'release', 'verbose', 'dry-run'],
  default: {},
  alias: {
    v: 'verbose',
    d: 'dry-run',
    r: 'release',
  },
})

if (!args['dry-run']) ensureDirSync('./gen')

for (const item of expandGlobSync('./src/**/mod.ts')) {
  const mod = await import(toFileUrl(item.path).toString())
  const filename =
    Deno.build.os === 'windows'
      ? dirname(item.path).split('\\').at(-1)
      : dirname(item.path).split('/').at(-1)

  if ((args.release || args.yaml) && !args['dry-run']) {
    Deno.writeTextFileSync(
      `./gen/${filename}.openapi.yml`,
      YAML.stringify(mod.openapi)
    )
  }

  if ((args.release || args.json) && !args['dry-run']) {
    Deno.writeTextFileSync(
      `./gen/${filename}.openapi.json`,
      JSON.stringify(mod.openapi, null, 2)
    )
  }

  if (args.verbose) {
    if (args.yaml) console.log(YAML.stringify(mod.openapi))
    else console.log(JSON.stringify(mod.openapi, null, 2))
  }
}
