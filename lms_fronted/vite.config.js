import react from "@vitejs/plugin-react";
// import process from "process";
import { defineConfig } from "vite";
// import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   base: '/',
  server : {
    host: true,
    strictPort: true,
    port: 5046
 }
});
