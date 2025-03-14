/**
 * Eleventy Vite plugin configuration
 * https://www.11ty.dev/docs/server-vite/
 */

import EleventyPluginVite from '@11ty/eleventy-plugin-vite'

export default function(eleventyConfig) {
    eleventyConfig.addPlugin(EleventyPluginVite, {
        // Vite options (equal to vite.config.js inside project root)
        viteOptions: {
            server: {
                mode: 'development'
            },
            // base: './',
            appType: 'custom',
            assetsInclude: ['**/*.xml', '**/*.txt'],
            publicDir: 'static', // default is 'public'
            build: {
                // assetsDir: 'assets-test', // output dir for processed assets and has no effect when using rollupOptions output
                mode: 'production',
                sourcemap: false,
                manifest: true,
                rollupOptions: {
                    output: {
                        assetFileNames: 'assets/[name][extname]', // .[hash]
                        chunkFileNames: 'assets/scripts/[name].js', // .[hash]
                        entryFileNames: 'assets/scripts/[name].js' // .[hash]
                    }
                }
            },
            css: {
                postcss: './postcss.config.cjs',
                devSourcemap: true
            }
        }
    })
}
