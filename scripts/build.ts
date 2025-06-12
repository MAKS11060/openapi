#!/usr/bin/env -S deno run -A

import { OpenAPI } from '@maks11060/openapi'
import { parseArgs } from 'jsr:@std/cli/parse-args'
import { ensureDirSync, expandGlobSync } from 'jsr:@std/fs'
import { basename, join, normalize, resolve, toFileUrl } from 'jsr:@std/path'

const c = {
  green: 'color: green',
  orange: 'color: orange',
}

const args = parseArgs(Deno.args, {
  boolean: ['dry-run'],
  string: ['input', 'output'],
  default: {
    output: './gen',
  },
  alias: {
    i: 'input',
    o: 'output',
    d: 'dry-run',
  },
})

if (!args['dry-run']) ensureDirSync(args.output)

console.time('Build')
for (const entry of expandGlobSync(args.input ? `./src/${args.input}/mod.ts` : './src/**/mod.ts')) {
  const mod = (await import(toFileUrl(entry.path).toString())) as {doc: OpenAPI}
  const oas = mod.doc.toDoc()
  console.log(`${oas.info.title} - %c${oas.info.version}`, c.orange)

  const name = basename(resolve(entry.path, './..')) // '/src/{name}/mod.ts' => '{name}'
  const filenameJSON = join(normalize(args.output), `${name}.openapi.json`)
  const filenameYAML = join(normalize(args.output), `${name}.openapi.yaml`)

  if (!args['dry-run']) {
    Deno.writeTextFileSync(filenameJSON, mod.doc.toJSON(true))
    Deno.writeTextFileSync(filenameYAML, mod.doc.toYAML({lineWidth: 120 + 1}))
  } else {
    console.log(`[dry-run] write %c${filenameJSON}`, c.green)
    console.log(`[dry-run] write %c${filenameYAML}`, c.green)
  }
}
console.timeEnd('Build')
