import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Using '.' instead of process.cwd() prevents TS errors regarding Process type definition
  const env = loadEnv(mode, '.', '');
  
  // Prioritize process.env for system variables (like in Vercel)
  // Ensure we capture the key correctly from either source
  const apiKey = process.env.API_KEY || env.API_KEY || '';

  if (!apiKey) {
    console.warn("WARNING: API_KEY not found in environment variables during build.");
  } else {
    console.log("Success: API_KEY found in environment variables during build.");
  }

  return {
    plugins: [react()],
    base: './',
    resolve: {
      alias: {
        // Use path.resolve('./') to point to project root, avoiding __dirname which is not available in ESM
        '@': path.resolve('./'),
      },
    },
    define: {
      // transform `process.env.API_KEY` to the actual string value
      // We DO NOT polyfill `process.env` here as an empty object because it can shadow this replacement
      'process.env.API_KEY': JSON.stringify(apiKey),
    }
  }
})