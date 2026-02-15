import { defineConfig } from 'vite' // This is the missing line!
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true, // Prevents port hopping
    allowedHosts: true
  }
})
