#!/usr/bin/env -S deno run -A --watch

import {serve} from '../serve.ts'
import {doc} from './openapi.ts'

if (import.meta.main) {
  setTimeout(() => {
    let oas = doc.toYAML()
    console.log(oas)
    console.log(`lines: %c${oas.split('\n').length}`, 'color:orange')
  })

  serve(doc)
}
