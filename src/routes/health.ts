import { Elysia } from "elysia"
import { getRequestId } from "../lib/http"

export const healthRoute = new Elysia().get("/health", ({ set }) => ({
  ok: true,
  service: "ai-backend",
  request_id: getRequestId(set),
}))
