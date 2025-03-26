/**
 * Eleventy plugins
 * https://www.11ty.dev/docs/plugins/image/
 */

import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import EleventyPluginNavigation from '@11ty/eleventy-navigation'
import EleventyPluginRss from '@11ty/eleventy-plugin-rss'

export default (eleventyConfig) => {
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        extensions: 'html', // default, comma separated list of file extensions of template output files to process
        formats: ['auto'], // default, keep original format
        // Attributes assigned on <img> override these values.
        defaultAttributes: {
            // loading: 'lazy',
            // decoding: 'async',
        }
    })
    eleventyConfig.addPlugin(EleventyPluginNavigation)
    eleventyConfig.addPlugin(EleventyPluginRss)
}
