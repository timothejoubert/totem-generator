import {defineConfig} from 'vite'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'path'

export default defineConfig({
    // omit
    base: "",
    server: {
        port: 3000
    },
    build: {
        cssCodeSplit: false,
        cssMinify: false,
        minify: false,
        rollupOptions: {
            plugins: [nodeResolve()],
            output: [
                {
                    minifyInternalExports: false,
                    hoistTransitiveImports: false,
                    dir: 'dist',
                    assetFileNames: `[name].[ext]`,
                    chunkFileNames: (id) => {
                        console.log('chunkFileNames', id.name)
                        if (['modules', '_commonjsHelpers', 'modulepreload-polyfill'].some(name => name === id.name)) return 'polyfill/[name].js'
                        else if (['svg-files', 'color-inputs', 'totem-element', 'user-panel', 'utils'].some(name => name === id.name)) return 'js/[name].js'

                        return '[name].js'
                    },
                    manualChunks: (id) => {
                        if(id.includes('/src/assets/totem/')) return 'svg-files'
                        else if(id.includes('/node_modules/')) return 'modules'

                        const filePath = path.parse(id);
                        return `${filePath.name}`;
                    },
                },
            ],
        }
    },
})
