import { Elysia } from "elysia"

export const healthRoute = new Elysia().get("/health", () => ({
  ok: true,
  service: "ai-backend",
}))
