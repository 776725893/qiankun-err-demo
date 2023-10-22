import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", //自定义主机名
    port: 729, //自定义端口
    // 是否开启 https
    https: false,
    // 是否启动时自动在浏览器中打开应用程序
    open: true,
  },
  resolve: {
    alias: {
      "~/": `${pathSrc}/`,
      "@/": `${pathSrc}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "~/styles/element/index.scss" as *;
        @use "~/styles/mixin.scss" as *;
        `,
      },
    },
  },
  build: {
    minify: "terser", // 必须开启：使用terserOptions才有效果
    terserOptions: {
      compress: {
        // 打包移除console和debugger
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [
    vue({
      script:{
        defineModel: true,
        propsDestructure: true
      }
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
      dts: "src/components.d.ts",
    }),
  ],
});
