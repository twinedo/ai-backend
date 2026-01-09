import { Elysia } from "elysia"
import { env } from "./lib/env"
import { healthRoute } from "./routes/health"

const app = new Elysia()
  .use(healthRoute)
  .listen(env.PORT)

console.log(`✅ ${env.APP_NAME} running at http://localhost:${env.PORT}`)
