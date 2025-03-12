/**
 * Eleventy Vite plugin configuration
 * https://www.11ty.dev/docs/server-vite/
 */

import EleventyVitePlugin from '@11ty/eleventy-plugin-vite'

export default function(eleventyConfig) {

    eleventyConfig.addPlugin(EleventyVitePlugin, {
        // Vite options (equal to vite.config.js inside project root)
        viteOptions: {
            publicDir: false,
            clearScreen: false,
            server: {
                mode: 'development',
                middlewareMode: true
            },
            appType: 'custom',
            assetsInclude: ['**/*.xml', '**/*.txt'],
            build: {
                assetsDir: 'assets',
                outDir: '_site/assets',
                mode: 'production',
                sourcemap: true,
                manifest: true,
                rollupOptions: {
                    output: {
                        assetFileNames: 'assets/[name].[hash][extname]',
                        chunkFileNames: 'assets/[name].[hash].js',
                        entryFileNames: 'assets/[name].[hash].js'
                    }
                }
            }
        }
    })
}
