import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer'; // visualizer 플러그인 import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    compression({
      // Gzip 방식으로 압축
      algorithm: 'gzip',
      // 원하는 경우 'brotliCompress'로 변경 가능
      // 아래의 threshold 옵션으로 특정 크기 이상의 파일만 압축 가능
      threshold: 1024, // 파일 크기 (바이트 단위)
    }),
    visualizer({
      // visualizer 플러그인 추가
      open: true, // 빌드 후 자동으로 브라우저에서 보고서 열기
      filename: 'stats.html', // 생성되는 분석 파일 이름
      gzipSize: true, // gzip 크기 표시
      brotliSize: true, // brotli 크기 표시
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'window',
  },
  build: {
    sourcemap: true,
  },
});
