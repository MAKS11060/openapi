// https://cdn.jsdelivr.net/gh/swagger-api/swagger-editor@next/src/index.jsx

import type {Context} from 'npm:hono'
import type {CustomSwaggerUIOptions} from './types.ts'

const CDN_LINK = 'https://cdn.jsdelivr.net/npm/swagger-editor-dist'
const DEFAULT_VERSION = '4.13.1'

export const MODERN_NORMALIZE_CSS = () => {
  return `
*,
::before,
::after {
    box-sizing: border-box;
}

html {
    font-family:
        system-ui,
        'Segoe UI',
        Roboto,
        Helvetica,
        Arial,
        sans-serif,
        'Apple Color Emoji',
        'Segoe UI Emoji';
    line-height: 1.15; /* 1. Correct the line height in all browsers. */
    -webkit-text-size-adjust: 100%; /* 2. Prevent adjustments of font size after orientation changes in iOS. */
    tab-size: 4; /* 3. Use a more readable tab size (opinionated). */
}

body {
    margin: 0;
}

b,
strong {
    font-weight: bolder;
}

code,
kbd,
samp,
pre {
    font-family:
        ui-monospace,
        SFMono-Regular,
        Consolas,
        'Liberation Mono',
        Menlo,
        monospace; /* 1 */
    font-size: 1em; /* 2 */
}

small {
    font-size: 80%;
}

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sub {
    bottom: -0.25em;
}

sup {
    top: -0.5em;
}

table {
    border-color: currentcolor;
}

button,
input,
optgroup,
select,
textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
    -webkit-appearance: button;
}

legend {
    padding: 0;
}

progress {
    vertical-align: baseline;
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
    height: auto;
}

[type='search'] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
}

::-webkit-search-decoration {
    -webkit-appearance: none;
}

::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
}

summary {
    display: list-item;
}

.Pane2 {
    overflow-y: scroll;
}
`
}

function getUrl(version: string = DEFAULT_VERSION) {
  return `${CDN_LINK}@${version}`
}

export interface SwaggerEditorOptions extends CustomSwaggerUIOptions {
  version?: string
}

const css = Deno.readTextFileSync('./editor/dist/swagger-editor.css')
const html = Deno.readTextFileSync('./editor/index.html')
  .replace('/* CSS */', css)
  .replace('/* CSS2 */', MODERN_NORMALIZE_CSS())

export function swaggerEditor(options: SwaggerEditorOptions = {}) {
  const url = getUrl(options.version)
  // const url = 'https://cdn.jsdelivr.net/gh/swagger-api/swagger-editor@next/src/index.jsx'

  options.layout = 'StandaloneLayout'

  const optionString = Object.entries(options)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}:'${value}'`
      }
      if (Array.isArray(value)) {
        return `${key}:${value.map((v) => `${v}`).join(', ')}`
      }
      if (typeof value === 'object') {
        return `${key}:${JSON.stringify(value)}`
      }

      return `${key}: ${value}`
    })
    .join(',')

  return (c: Context) => c.html(html)
}
