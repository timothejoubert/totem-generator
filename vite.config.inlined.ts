import { defineConfig } from 'vite'
import path from "path";
// import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
    // plugins: [viteSingleFile()],
    base: "./",
    mode: 'development',
    build: {
        target: 'es2015',
        cssCodeSplit: false,
        cssMinify: false,
        minify: false,
        outDir: 'inlined-dist',
        // assetsInlineLimit: 100000000,
        rollupOptions: {
            treeshake: false,
            output: {
                minifyInternalExports: false,
                assetFileNames: `assets/[name].[ext]`,
                chunkFileNames: (id) => {
                    console.log('chunkFileNames', id.name)
                    if (['external-libraries', '_commonjsHelpers', 'modulepreload-polyfill'].some(name => name === id.name)) return 'polyfill/[name].js'
                    else if (['svg-files', 'color-inputs', 'totem-element', 'user-panel', 'utils'].some(name => name === id.name)) return 'js/[name].js'

                    return '[name].js'
                },
                manualChunks: (id) => {
                    if(id.includes('/src/assets/totem/')) return 'svg-files'
                    else if(id.includes('/node_modules/')) return 'external-libraries'

                    const filePath = path.parse(id);
                    return `${filePath.name}`;
                },
            }
        }
    },
})
