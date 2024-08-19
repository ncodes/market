import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let define = {};
  if (command != "build") {
    define = {
      global: { Buffer: Buffer },
    };
  }

  if (command == "build") {
    globalThis.Buffer = Buffer;
  }

  return {
    define,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: true,
    },
    plugins: [react()],
  };
});
