import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定存放 SVG 图标的文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
      // 配置 symbolId 格式
      symbolId: "icon-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src", // 将 '@' 别名指向 src 目录
      "@components": "/src/components", // 将 '@components' 别名指向 src/components 目录
      "@assets": "/src/assets", // 将 '@assets' 别名指向 src/assets 目录
    },
  },
});
