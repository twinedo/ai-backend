import { Elysia, t } from "elysia"
import { getRequestId } from "../lib/http"

export const chatRoute = new Elysia().post(
  "/chat",
  ({ set, body }) => {
    return {
      request_id: getRequestId(set),
      output_text: `OK (dummy). Kamu kirim: ${body.message}`,
      model: "dummy",
    }
  },
  {
    body: t.Object({
      message: t.String(),
    }),
  }
)
