/**
 * Add Eleventy transforms here
 * https://www.11ty.dev/docs/transforms/
 */

import typopoTransform from './transforms/typopo.js'

export default {
    typopo: eleventyConfig => {
        if (process.env.NODE_ENV === 'production') {
            eleventyConfig.addTransform(
                'typopo',
                typopoTransform({
                        language: 'cs'
                    }
                )
            )
        }
    }
}
