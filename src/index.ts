import { Elysia } from "elysia"
import { requestID } from "elysia-requestid"
import { rateLimit } from "elysia-rate-limit"

import { env } from "./lib/env"
import { getRequestId, jsonErrorWithStatus } from "./lib/http"
import { healthRoute } from "./routes/health"
import { authPlugin } from "./plugins/auth"
import { chatRoute } from "./routes/chat"

// 1) Custom error class untuk rate limit (biar bisa ditangkap di onError)
class RateLimitError extends Error {
  status = 429
  constructor(message = "rate_limited") {
    super(message)
  }
}

const app = new Elysia()
  // 2) Request ID plugin: bikin/forward X-Request-ID :contentReference[oaicite:3]{index=3}
  .use(requestID())

  .error({
    rateLimited: RateLimitError,
  })

  // 4) Error handler global (Elysia punya onError lifecycle) :contentReference[oaicite:5]{index=5}
  .onError({ as: "global" }, ({ code, error, set }) => {
    const requestId = getRequestId(set)

    if (code === "rateLimited") {
      return jsonErrorWithStatus({
        requestId,
        error: "rate_limited",
        detail: "Too many requests",
        status: 429,
      })
    }

    return jsonErrorWithStatus({
      requestId,
      error: "server_error",
      detail: error instanceof Error ? error.message : String(error),
      status: 500,
    })
  })

  // 5) routes basic
  .use(healthRoute)

  // 6) group v1: semua yang di bawah ini wajib auth + rate limit
  .group("/v1", (v1) =>
    v1
      // Rate limit hanya untuk semua /v1 routes
      .use(
        rateLimit({
          max: 20,
          duration: 60_000, // 1 menit
          errorResponse: new RateLimitError(), // plugin akan "throw"
        })
      )
      .use(authPlugin)
      .use(chatRoute)
  )
  .listen(env.PORT)

console.log(`✅ ${env.APP_NAME} running at http://localhost:${env.PORT}`)
