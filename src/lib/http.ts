export function jsonError(params: {
  requestId: string
  error: string
  detail?: string
}) {
  return new Response(
    JSON.stringify({
      request_id: params.requestId,
      error: params.error,
      detail: params.detail,
    }),
    {
      status: 400,
      headers: { "content-type": "application/json" },
    }
  )
}

export function getRequestId(set: { headers: Record<string, string | number> }) {
  const value = set.headers["X-Request-ID"] ?? set.headers["x-request-id"]

  if (typeof value === "number") {
    return String(value)
  }

  if (typeof value === "string" && value.length > 0) {
    return value
  }

  return "unknown"
}

export function jsonErrorWithStatus(params: {
  requestId: string
  error: string
  detail?: string
  status: number
}) {
  return new Response(
    JSON.stringify({
      request_id: params.requestId,
      error: params.error,
      detail: params.detail,
    }),
    {
      status: params.status,
      headers: { "content-type": "application/json" },
    }
  )
}
