import typopo from 'typopo'
import { minify } from 'html-minifier-terser'
import { JSDOM } from 'jsdom'

/**
 * 11ty Transform: Minify HTML & Apply Typopo
 *
 * @param {string} content - The HTML content to process
 * @param {string} outputPath - The output file path
 * @param {object} options - Custom options for Typopo & Minification
 * @param {object} options.typopoOptions - Typopo options (default: language 'en-us')
 * @param {object} options.minifyOptions - Minifier options
 * @returns {Promise<string>} - Processed HTML content
 */
export const htmlTypopoTransform = async (content, options = {}, outputPath) => {
    if (!outputPath?.endsWith('.html')) return content

    // Default minify options
    const defaultMinifyOptions = {
        collapseWhitespace: true, // Collapse white space that contributes to text nodes in a document tree
        preserveLineBreaks: true, // Always collapse to 1 line break (never remove it entirely) when whitespace between tags include a line break. Must be used in conjunction with collapseWhitespace=true
        conservativeCollapse: true, // Always collapse to 1 space (never remove it entirely). Must be used in conjunction with collapseWhitespace=true
        decodeEntities: true, // Use direct Unicode characters whenever possible
        removeComments: true, // Strip HTML comments
        keepClosingSlash: true // Keep the trailing slash on singleton elements
    }

    // Default Typopo options
    const defaultTypopoOptions = {
        language: 'en-us', // default language
        removeLines: true, // remove empty lines between paragraphs
        removeWhitespacesBeforeMarkdownList: true, // remove empty lines before a nested Markdown list, set as false when you use Typopo to fix typography of Markdown files
        keepMarkdownCodeBlocks: false // markdown code blocks will be ignored from being identified as incorrectly used single quote or double quote pairs
    }

    const minifyOptions = { ...defaultMinifyOptions, ...options.minifyOptions }
    const typopoOptions = { ...defaultTypopoOptions, ...options.typopoOptions }

    // Minify the HTML to normalize whitespace
    const minified = await minify(content, minifyOptions)

    // Parse HTML using JSDOM
    const dom = new JSDOM(minified)
    const { document } = dom.window

    // Process all text nodes (ignores scripts, styles, etc.)
    document.body.querySelectorAll('*:not(script):not(noscript):not(style)')
        .forEach(el => el.childNodes.forEach(node => {
            if (node.nodeType === 3) { // Text Node
                const original = node.textContent
                node.textContent = `${original.match(/^\s/) ? ' ' : ''}${typopo.fixTypos(original, typopoOptions.language, typopoOptions)}${original.match(/\s$/) ? ' ' : ''}`
            }
        }))

    return dom.serialize()
}
