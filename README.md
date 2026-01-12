# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:8080/ with your browser to see the result.

## Test API (curl)
```bash
curl -s http://localhost:8080/health
```

```bash
curl -s http://localhost:8080/v1/chat \
  -H 'content-type: application/json' \
  -H 'x-api-key: dev-key' \
  -H 'X-Request-ID: test-123' \
  -d '{"message":"halo"}'
```
