import typopo from 'typopo'
import { minify } from 'html-minifier-terser'
import { JSDOM } from 'jsdom'
import yaml from 'js-yaml'
import fs from 'fs'

const typopoLocale = locale => {
    if (!locale) return undefined

    if (locale.startsWith('en-')) return 'en-us'
    if (locale.startsWith('de-')) return 'de-de'

    const allowedLocales = new Set(['rue', 'sk', 'cs'])
    if (allowedLocales.has(locale)) return locale

    console.warn(`Unsupported locale: ${locale}. Typopo processing will be skipped.`)
    return undefined
}

/**
 * 11ty Transform: Minify HTML & Apply Typopo
 *
 * @param {string} content - The HTML content to process
 * @param {string} outputPath - The output file path
 * @returns {Promise<string>} - Processed HTML content
 */

export const htmlTypopoTransform = async (content, outputPath) => {
    // Early return if not HTML
    if (!outputPath?.endsWith('.html')) return content

    try {
        // Load meta.yaml
        let meta = {}
        try {
            meta = yaml.load(fs.readFileSync('./src/_data/meta.yaml', 'utf8'))
        } catch (metaError) {
            console.warn('Could not load meta.yaml:', metaError.message)
        }

        // Minify the HTML to normalize whitespace (always do this)
        const minified = await minify(content, {
            collapseWhitespace: true,
            preserveLineBreaks: true,
            conservativeCollapse: true,
            decodeEntities: true,
            removeComments: true,
            keepClosingSlash: true
        })

        // Get the locale
        const locale = typopoLocale(meta.locale)

        // If locale is undefined, skip Typopo processing but return minified HTML
        if (!locale) return minified

        // Parse HTML using JSDOM
        const dom = new JSDOM(minified)
        const { document } = dom.window

        // Process all text nodes (ignores scripts, styles, etc.)
        document.body.querySelectorAll('*:not(script):not(noscript):not(style)')
            .forEach(el => el.childNodes.forEach(node => {
                if (node.nodeType === 3) { // Text Node
                    const original = node.textContent
                    node.textContent = `${original.match(/^\s/) ? ' ' : ''}${typopo.fixTypos(original, locale, {
                        removeLines: true,
                        removeWhitespacesBeforeMarkdownList: true,
                        keepMarkdownCodeBlocks: false
                    })}${original.match(/\s$/) ? ' ' : ''}`
                }
            }))
        return dom.serialize()
    } catch (error) {
        console.error('Error in htmlTypopoTransform:', error)
        // Return original content if something fails
        return content
    }
}
