/**
 * Add Eleventy transforms here
 * https://www.11ty.dev/docs/transforms/
 */

import { htmlTypopoTransform } from './transforms/htmlTypopoTransform.js'
import fs from 'fs'
import yaml from 'js-yaml'

const meta = yaml.load(fs.readFileSync('./src/_data/meta.yaml', 'utf8')) // import locale from meta.yaml

const typopoLocale = locale => {
    if (locale.startsWith('en-')) return 'en-us'
    if (locale.startsWith('de-')) return 'de-de'

    const allowedLocales = new Set(['rue', 'sk', 'cs'])
    if (allowedLocales.has(locale)) return locale

    console.warn("Locale wasn’t found")
    return undefined
}

export default {
    typopo: eleventyConfig => {
        // if (process.env.NODE_ENV === 'production') return // uncomment to process only on production
        eleventyConfig.addTransform(
            'typopo',
            content => htmlTypopoTransform(content, {
                    typopoOptions: {
                        language: typopoLocale(meta.lang),
                    }
                }
            )
        )
    }
}
