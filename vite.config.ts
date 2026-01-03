import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 如果您的 GitHub 網址是 https://<USERNAME>.github.io/<REPO>/
  // 請將 base 改為 '/<REPO>/'。如果是自定義網域則保持 '/'
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
});