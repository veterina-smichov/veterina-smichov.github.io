/**
 * Add Eleventy plugins here
 * https://www.11ty.dev/docs/plugins/
 */
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import EleventyPluginNavigation from '@11ty/eleventy-navigation'
import EleventyPluginRss from '@11ty/eleventy-plugin-rss'

export default {
    image: (eleventyConfig) => {
        eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
            outputDir: './_site/assets/images',
            urlPath: '/assets/images/',
            extensions: 'html',
            formats: ['auto'],
            // Attributes assigned on <img> override these values.
            defaultAttributes: {
                loading: 'lazy',
                decoding: 'async',
            },
        })
    },

    navigation: (eleventyConfig) => {
        eleventyConfig.addPlugin(EleventyPluginNavigation)
    },

    rss: (eleventyConfig) => {
        eleventyConfig.addPlugin(EleventyPluginRss)
    },
}
