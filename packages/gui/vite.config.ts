import { defineConfig } from 'vite';
import { resolve } from 'path';
import { config } from 'dotenv';

config();

const devMode = process.env.NODE_ENV === 'development';
const isProduction = !devMode;
const outputPath = resolve(process.cwd(), isProduction ? '../../docs' : 'dist');
const SERVER = process.env.SERVER || 'localhost';
const publicPath = isProduction ? 'https://github.io/erikvullings/mithril-app' : '';
const APP_TITLE = process.env.APP_TITLE || 'MITHRIL-APP';
const APP_DESC = process.env.APP_DESC || 'APPLICATION_DESCRIPTION';
const APP_PORT = parseInt(process.env.APP_PORT || '65533', 10);

console.log(
  `Running in ${
    isProduction ? 'production' : 'development'
  } mode, serving from ${SERVER} and public path ${publicPath}, output directed to ${outputPath}.`
);

export default defineConfig({
  build: {
    outDir: outputPath,
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: isProduction,
    rollupOptions: {
      output: {
        entryFileNames: '[name].bundle.js',
        chunkFileNames: '[name].bundle.js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  server: {
    port: APP_PORT,
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.wasm'],
  },
  define: {
    'process.env.SERVER': JSON.stringify(isProduction ? publicPath : `http://localhost:${APP_PORT}`),
  },
});
