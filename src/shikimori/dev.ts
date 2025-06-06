#!/usr/bin/env -S deno run -A --watch

import {serve} from '../serve.ts'
import {doc} from './mod.ts'

if (import.meta.main) {
  serve(doc)
}
