/**
 * Eleventy transforms
 * https://www.11ty.dev/docs/transforms/
 */

import { htmlTypopoTransform } from './transforms/htmlTypopoTransform.js'


export default (eleventyConfig) => {
    if (process.env.NODE_ENV === 'production') {
        // transforms that run only in production
    }
    // transforms that run always
    eleventyConfig.addTransform('typopo', (content, outputPath) => htmlTypopoTransform(content, outputPath))
}
