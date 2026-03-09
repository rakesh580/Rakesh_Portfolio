import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const hfKey = env.MISTRAL_API_KEY || process.env.MISTRAL_API_KEY || '';
    return {
      base: '/Rakesh_Portfolio/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(hfKey),
        'process.env.MISTRAL_API_KEY': JSON.stringify(hfKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
