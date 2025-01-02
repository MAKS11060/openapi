#!/usr/bin/env -S deno run -A

import createClient from 'npm:openapi-fetch'
import type {paths} from './shikimori.d.ts'

// Requirements
// Add your Oauth2 Application name to User-Agent requests header.
// Don’t mimic a browser.
// Your IP address may be banned if you use API without properly set User-Agent header.
const shikimoriUserAgent = 'your-oauth2-app-name'

export const shikimoriApi = createClient<paths>({
  baseUrl: 'https://shikimori.one',
  headers: {'user-agent': shikimoriUserAgent},
})
