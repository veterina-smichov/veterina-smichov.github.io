import typopo from 'typopo'
import { JSDOM } from 'jsdom'

/**
 * Transform to apply Typopo fixes to text content in HTML
 * @param {Object} config - Configuration options
 * @param {string} config.language - Language code for Typopo (e.g., 'en', 'cs')
 * @param {string[]} config.excludeSelectors - CSS selectors to exclude from processing
 * @returns {function} - 11ty transform function
 */
const typopoTransform = ({ language = 'en', excludeSelectors = ['pre', 'code', 'script', 'style'] } = {}) => {
    return (content, outputPath) => {
        // Skip non-HTML files
        if (!outputPath || !outputPath.endsWith('.html')) return content

        // Parse HTML
        const dom = new JSDOM(content)
        const { document } = dom.window

        // Create selectors for elements to exclude
        const excludeSelector = excludeSelectors.join(', ')
        const excludeNodes = excludeSelector ? [...document.querySelectorAll(excludeSelector)] : []

        // Process all text nodes
        const processTextNodes = (node) => {
            // Skip if this node or any parent is in the exclude list
            if (excludeNodes.some(excludeNode => excludeNode.contains(node))) return

            // Process text nodes
            if (node.nodeType === 3 && node.textContent.trim()) {
                node.textContent = typopo.fixTypos(node.textContent, language)
            }

            // Process child nodes
            if (node.childNodes) {
                node.childNodes.forEach(processTextNodes)
            }
        }

        // Start processing from body
        processTextNodes(document.body)

        return dom.serialize()
    }
}

export default typopoTransform
