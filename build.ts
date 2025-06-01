#!/usr/bin/env -S deno run -A

import {parseArgs} from 'jsr:@std/cli/parse-args'
import {ensureDirSync, expandGlobSync} from 'jsr:@std/fs'
import {dirname, toFileUrl} from 'jsr:@std/path'
import {YAML} from './src/deps.ts'
import {OpenAPI} from '@maks11060/openapi'

const args = parseArgs(Deno.args, {
  boolean: ['json', 'yaml', 'release', 'verbose', 'dry-run'],
  string: ['input'],
  default: {},
  alias: {
    v: 'verbose',
    d: 'dry-run',
    r: 'release',
    i: 'input',
  },
})

if (!args['dry-run']) ensureDirSync('./gen')

for (const item of expandGlobSync(args.input ? `./src/${args.input}/mod.ts` : './src/**/mod.ts')) {
  console.error(`${item.path}`)
}

// for (const item of expandGlobSync(args.input ? `./src/${args.input}/mod.ts` : './src/**/mod.ts')) {
//   const mod = (await import(toFileUrl(item.path).toString())) as {doc: OpenAPI}
//   const oas = mod.doc.toDoc()
//   console.error(`${oas.info.title} - ${oas.info.version}`)
// }

for (const item of expandGlobSync(args.input ? `./src/${args.input}/mod.ts` : './src/**/mod.ts')) {
  const mod = (await import(toFileUrl(item.path).toString())) as {doc: OpenAPI}

  const filename =
    Deno.build.os === 'windows' ? dirname(item.path).split('\\').at(-1) : dirname(item.path).split('/').at(-1)

  if ((args.release || args.yaml) && !args['dry-run']) {
    Deno.writeTextFileSync(`./gen/${filename}.openapi.yml`, mod.doc.toYAML())
  }

  if ((args.release || args.json) && !args['dry-run']) {
    Deno.writeTextFileSync(`./gen/${filename}.openapi.json`, mod.doc.toJSON(true))
  }

  if (args.verbose) {
    console.log(`filename: %c${filename}`, 'color: orange')
    if (args.yaml) console.log(mod.doc.toYAML())
    else console.log(mod.doc.toJSON(true))
  }
}
