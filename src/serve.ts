import {OpenAPI} from '@maks11060/openapi'
import {Hono} from 'npm:hono'
import {cors} from 'npm:hono/cors'

export const serve = (doc: OpenAPI) => {
  const app = new Hono() //
    .use(cors())
    .get('/openapi.json', (c) => c.text(doc.toJSON(true), {headers: {'Content-Type': 'application/json'}}))
    .get('/openapi.yml', (c) => c.text(doc.toYAML({lineWidth: 100})))

  Deno.serve(app.fetch)

  setTimeout(() => {
    const oas = doc.toYAML()
    console.log(oas)
    console.log(`lines: %c${oas.split('\n').length}`, 'color:orange')
    console.log('https://swagger-next.deno.dev/?url=http://localhost:8000/openapi.yml')
  })
}
