import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // We use process.cwd() which is standard in Node environments.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Prioritize process.env for system variables (like in Vercel)
  const apiKey = process.env.API_KEY || env.API_KEY || '';

  return {
    plugins: [react()],
    base: './', // Ensures assets are loaded correctly
    define: {
      // Polyfill process.env to prevent "process is not defined" errors in client code/libs
      'process.env': {},
      // Expose the API_KEY to the client-side code specifically
      'process.env.API_KEY': JSON.stringify(apiKey),
    }
  }
})