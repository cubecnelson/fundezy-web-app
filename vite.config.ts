import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/match-trader': {
        target: 'https://broker-api-prop.match-trade.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/match-trader/, ''),
      },
    },
  },
}); 