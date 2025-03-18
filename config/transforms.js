/**
 * Add Eleventy transforms here
 * https://www.11ty.dev/docs/transforms/
 */

import typopoTransform from './transforms/typopoTransform.js'
import fs from 'fs'

const meta = JSON.parse(fs.readFileSync('./src/_data/meta.json', 'utf8')) // import locale from meta.json

export default {
    typopo: eleventyConfig => {
        if (process.env.NODE_ENV === 'production') {
            eleventyConfig.addTransform(
                'typopo',
                typopoTransform({
                        language: meta.lang, // Change to your content's language
                        minifyOptions: {
                            collapseWhitespace: true,
                            conservativeCollapse: true,
                            preserveLineBreaks: true,
                            decodeEntities: true,
                            removeComments: false
                        }
                    }
                )
            )
        }
    }
}
