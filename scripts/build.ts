#!/usr/bin/env -S deno run -A

import {OpenAPI} from '@maks11060/openapi'
import {parseArgs} from 'jsr:@std/cli/parse-args'
import {ensureDirSync, expandGlobSync} from 'jsr:@std/fs'
import {basename, join, normalize, resolve, toFileUrl} from 'jsr:@std/path'

const args = parseArgs(Deno.args, {
  boolean: ['json', 'yaml', 'verbose', 'dry-run'],
  string: ['input', 'output'],
  default: {
    output: './gen',
  },
  alias: {
    i: 'input',
    o: 'output',
    v: 'verbose',
    d: 'dry-run',
  },
})

const outputDir = args.output
const c = {
  green: 'color: green',
  orange: 'color: orange',
}

if (!args['dry-run']) ensureDirSync(outputDir)

console.time('Build')
for (const entry of expandGlobSync(args.input ? `./src/${args.input}/mod.ts` : './src/**/mod.ts')) {
  const mod = (await import(toFileUrl(entry.path).toString())) as {doc: OpenAPI}
  const oas = mod.doc.toDoc()
  console.error(`${oas.info.title} - %c${oas.info.version}`, c.orange)

  const name = basename(resolve(entry.path, './..')) // '/src/{name}/mod.ts' => '{name}'
  console.error(name)

  const filenameJSON = join(normalize(outputDir), `${name}.openapi.json`)
  const filenameYAML = join(normalize(outputDir), `${name}.openapi.yml`)
  if (!args['dry-run']) {
    Deno.writeTextFileSync(filenameJSON, mod.doc.toJSON(true))
    Deno.writeTextFileSync(filenameYAML, mod.doc.toYAML())
  } else {
    console.log(`[dry-run] write to %c${filenameJSON}`, c.green)
    console.log(`[dry-run] write to %c${filenameYAML}`, c.green)
  }

  if (args.verbose) {
    console.log(`filename: %c${name}`, c.orange)
    if (args.yaml) console.log(mod.doc.toYAML())
    else console.log(mod.doc.toJSON(true))
  }
}

console.timeEnd('Build')
