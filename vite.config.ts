import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', // 将 '@' 别名指向 src 目录
      '@components': '/src/components', // 将 '@components' 别名指向 src/components 目录
      '@assets': '/src/assets' // 将 '@assets' 别名指向 src/assets 目录
    }
  }
})
