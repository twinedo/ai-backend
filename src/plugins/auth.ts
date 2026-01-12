import { Elysia } from "elysia"
import { env } from "../lib/env"
import { getRequestId, jsonErrorWithStatus } from "../lib/http"

export const authPlugin = new Elysia({ name: "auth" }).onBeforeHandle(
  ({ headers, set }) => {
    // header key di Elysia biasanya lowercase
    const apiKey = headers["x-api-key"]

    if (!apiKey || apiKey !== env.API_KEY) {
      // pakai requestID dari plugin request-id (Step berikutnya)
      return jsonErrorWithStatus({
        requestId: getRequestId(set),
        error: "invalid_api_key",
        status: 401,
      })
    }
  }
)
