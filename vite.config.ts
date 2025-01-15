import {defineConfig} from 'vite'

export default defineConfig({
    // omit
    server: {
        port: 3000
    },
    // build: {
    //     cssCodeSplit: false,
    //     cssMinify: false,
    //     minify: false,
    //     rollupOptions: {
    //         output: {
    //             inlineDynamicImports : true,
    //             entryFileNames: `assets/[name].js`,
    //             chunkFileNames: `assets/[name].js`,
    //             assetFileNames: `assets/[name].[ext]`,
    //         }
    //     }
    // },
})
