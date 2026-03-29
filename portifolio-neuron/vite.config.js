import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 Garante que os assets carreguem em portfolio.promptweb.com.br/
  server: {
    host: true,
    port: 5173
  }
})