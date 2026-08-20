import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    // base: "/tfe/",
    root: "src",
    publicDir: "../assets",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                avarice: resolve(__dirname, "src/avarice.html"),
                colere: resolve(__dirname, "src/colere.html"),
                envie: resolve(__dirname, "src/envie.html"),
                gourmandise: resolve(__dirname, "src/gourmandise.html"),
                luxure: resolve(__dirname, "src/luxure.html"),
                orgueil: resolve(__dirname, "src/orgueil.html"),
                paresse: resolve(__dirname, "src/paresse.html"),
            },
        },
    },
    server: {
        open: true,
    },
});
