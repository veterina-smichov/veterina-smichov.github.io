const typopo = require('typopo')
const { JSDOM } = require('jsdom')

/**
 * Transform to apply Typopo fixes to text content in HTML
 * @param {Object} config - Configuration options
 * @param {string} config.language - Language code for Typopo (e.g., 'en', 'cs')
 * @param {string[]} config.excludeSelectors - CSS selectors to exclude from processing
 * @returns {function} - 11ty transform function
 */
const typopoTransform = ({ language = 'en', excludeSelectors = ['pre', 'code'] } = {}) => {
    return (content, outputPath) => {
        // Skip non-HTML files
        if (!outputPath || !outputPath.endsWith('.html')) return content

        // Instead of full DOM parsing, use a more targeted approach
        // Split content into text and HTML tags
        let fragments = content.split(/(<[^>]*>)/)
        let inExcludedTag = false
        let excludeStack = []

        // Process each fragment
        fragments = fragments.map(fragment => {
            // Check if this is an opening or closing tag
            const isOpeningTag = /^<([a-z][a-z0-9]*)\b[^>]*>$/i.test(fragment)
            const isClosingTag = /^<\/([a-z][a-z0-9]*)\b[^>]*>$/i.test(fragment)
            const tagName = isOpeningTag
                ? fragment.match(/^<([a-z][a-z0-9]*)\b[^>]*>$/i)?.[1]?.toLowerCase()
                : isClosingTag
                    ? fragment.match(/^<\/([a-z][a-z0-9]*)\b[^>]*>$/i)?.[1]?.toLowerCase()
                    : null

            // For opening tags, check if it's in the exclude list
            if (isOpeningTag && excludeSelectors.includes(tagName)) {
                excludeStack.push(tagName)
                inExcludedTag = true
            }

            // For closing tags, check if we're exiting an excluded tag
            if (isClosingTag && excludeStack.length && excludeStack[excludeStack.length - 1] === tagName) {
                excludeStack.pop()
                inExcludedTag = excludeStack.length > 0
            }

            // If it's a tag, return it unchanged
            if (fragment.startsWith('<') && fragment.endsWith('>')) {
                return fragment
            }

            // If we're in an excluded tag or if the fragment is empty, return it unchanged
            if (inExcludedTag || !fragment.trim()) {
                return fragment
            }

            // Process text content with Typopo
            return typopo.fixTypos(fragment, language)
        })

        return fragments.join('')
    }
}

module.exports = typopoTransform
