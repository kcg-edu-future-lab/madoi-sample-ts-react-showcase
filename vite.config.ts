import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  plugins: [react({ tsDecorators: true })],
  base: "./",
  server: { open: true },
});
