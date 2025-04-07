/**
 * Eleventy Vite plugin configuration
 * https://www.11ty.dev/docs/server-vite/
 */

import EleventyPluginVite from '@11ty/eleventy-plugin-vite'

export default (eleventyConfig) => {
    eleventyConfig.addPlugin(EleventyPluginVite, {
        // Vite options (equal to vite.config.js inside project root)
        viteOptions: {
            server: {
                mode: 'development',
                watch: {
                    usePolling: true,    // enabling polling to work better with WSL2
                    interval: 100,       // polling interval
                    binaryIntervAl: 300  // binary files check interval
                }
            },
            appType: 'custom',
            assetsInclude: ['**/*.xml', '**/*.txt'],
            publicDir: 'static', // default is 'public'
            css: {
                postcss: './postcss.config.cjs',
                devSourcemap: true,
                preprocessorOptions: {
                    scss: {
                        silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin'],
                        quietDeps: true
                    }
                }
            },
            build: {
                // assetsDir: 'assets-test', // output dir for processed assets and has no effect when using rollupOptions output
                mode: 'production',
                sourcemap: false,
                manifest: true,
                rollupOptions: {
                    output: {
                        assetFileNames: 'assets/[name].[hash][extname]',
                        chunkFileNames: 'assets/scripts/[name].[hash].js',
                        entryFileNames: 'assets/scripts/[name].[hash].js'
                    }
                }
            }
        }
    })
}
