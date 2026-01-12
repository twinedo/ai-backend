Kita sudah selesai Step 1–5: Bun + Elysia project sudah jalan, /health OK.
Sekarang lanjut Step 6: tambahkan
1) API Key auth via header x-api-key (pakai .env API_KEY)
2) Request ID: pakai header X-Request-ID, generate kalau tidak ada, dan selalu return request_id di response
3) Rate limit: 20 request/minute untuk semua /v1 routes
4) Error shape konsisten: { request_id, error, detail? } dan status yang benar (401/429/500)
5) Buat endpoint dummy POST /v1/chat (body: { message: string }) return { request_id, output_text, model:"dummy" }
Kerjakan dengan struktur folder rapi: src/lib, src/routes, src/plugins.
Jalankan dan update command untuk test curl.
Gunakan perubahan minimal, jangan ubah Step 1–5 yang sudah beres.
