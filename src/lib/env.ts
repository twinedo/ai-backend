export const env = {
  PORT: Number(process.env.PORT ?? 8080),
  APP_NAME: process.env.APP_NAME ?? "ai-backend",
  API_KEY: process.env.API_KEY ?? "dev-key",
}
