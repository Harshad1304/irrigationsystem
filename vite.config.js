import { defineConfig, resolve } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(), react()],
  resolve: {
    alias: {
      'react-icons': resolve(__dirname, 'node_modules/react-icons')
    }
  }
})
