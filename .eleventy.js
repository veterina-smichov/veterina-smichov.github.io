import markdownIt from 'markdown-it'

import EleventyPluginNavigation from '@11ty/eleventy-navigation'
import EleventyPluginRss from '@11ty/eleventy-plugin-rss'
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite'

import filters from './utils/filters.js'
import transforms from './utils/transforms.js'
import shortcodes from './utils/shortcodes.js'

export default function (eleventyConfig) {
    eleventyConfig.setServerPassthroughCopyBehavior('copy')
    eleventyConfig.addPassthroughCopy('public')

    // Plugins
    eleventyConfig.addPlugin(EleventyPluginNavigation)
    eleventyConfig.addPlugin(EleventyPluginRss)
    eleventyConfig.addPlugin(EleventyVitePlugin, {
        tempFolderName: '.11ty-vite', // Default name of the temp folder

        // Vite options (equal to vite.config.js inside project root)
        viteOptions: {
            publicDir: 'public',
            clearScreen: false,
            server: {
                mode: 'development',
                middlewareMode: true,
            },
            appType: 'custom',
            assetsInclude: ['**/*.xml', '**/*.txt'],
            build: {
                mode: 'production',
                sourcemap: 'true',
                manifest: true,
                // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
                rollupOptions: {
                    output: {
                        assetFileNames: 'assets/css/main.[hash].css',
                        chunkFileNames: 'assets/js/[name].[hash].js',
                        entryFileNames: 'assets/js/[name].[hash].js'
                    }
                }
            }
        }
    })

    // Filters
    Object.keys(filters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, filters[filterName])
    })

    // Transforms
    Object.keys(transforms).forEach((transformName) => {
        eleventyConfig.addTransform(transformName, transforms[transformName])
    })

    // Shortcodes
    Object.keys(shortcodes).forEach((shortcodeName) => {
        eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
    })

    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

    // Customize Markdown library and settings:
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    })
    eleventyConfig.setLibrary('md', markdownLibrary)

    // Layouts
    eleventyConfig.addLayoutAlias('base', 'base.njk')
    eleventyConfig.addLayoutAlias('post', 'post.njk')
    eleventyConfig.addCollection("pages", collection => {
        return collection.getFilteredByTag("pages")
    });


    // Copy/pass-through files
    eleventyConfig.addPassthroughCopy('src/assets/css')
    eleventyConfig.addPassthroughCopy('src/assets/js')

    return {
        templateFormats: ['md', 'njk', 'html'],
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            layouts: '_layouts',
            data: '_data'
        }
    }
}
