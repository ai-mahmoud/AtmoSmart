import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Prioritize process.env for system variables (like in Vercel)
  const apiKey = process.env.API_KEY || env.API_KEY;

  return {
    plugins: [react()],
    base: './',
    define: {
      // Expose the API_KEY to the client-side code safely
      'process.env.API_KEY': JSON.stringify(apiKey || ''),
    }
  }
})