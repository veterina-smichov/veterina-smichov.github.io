// transforms/typopoTransform.js
import { minify } from 'html-minifier-terser'
import typopo from 'typopo'

/**
 * Processes HTML content with Typopo
 * @param {string} content - HTML content to process
 * @param {string} lang - Language code for Typopo processing
 * @returns {string} Processed HTML content
 */
const processHtmlWithTypopo = (content, lang = 'en') => {
    // Extract text nodes and replace with placeholders
    const placeholders = []
    let placeholderId = 0

    // Replace text nodes with placeholders
    const contentWithPlaceholders = content.replace(/>([^<]+)</g, (match, textContent) => {
        const placeholder = `__TYPOPO_PLACEHOLDER_${placeholderId}__`
        placeholders.push({
            id: placeholderId,
            content: textContent
        })
        placeholderId++
        return `>${placeholder}<`
    })

    // Process each text node with Typopo
    const processedPlaceholders = placeholders.map(placeholder => ({
        ...placeholder,
        processed: typopo.fixTypos(placeholder.content, lang)
    }))

    // Replace placeholders with processed text
    let processedContent = contentWithPlaceholders
    for (const { id, processed } of processedPlaceholders)
        processedContent = processedContent.replace(
            `__TYPOPO_PLACEHOLDER_${id}__`,
            processed
        )

    return processedContent
}

/**
 * Create a transform function for processing HTML with Typopo
 * @param {Object} options - Configuration options
 * @param {Object} options.minifyOptions - Options for html-minifier-terser
 * @param {string} options.language - Language for Typopo processing
 * @returns {Function} Transform function
 */
export default function typopoTransform(options = {}) {
    const {
        minifyOptions = {
            collapseWhitespace: true,
            conservativeCollapse: true,
            preserveLineBreaks: true,
            decodeEntities: true,
            removeComments: false,
            removeAttributeQuotes: false
        },
        language = 'en'
    } = options

    // Return the transform function
    return async (content, outputPath) => {
        // Only process HTML files
        if (!outputPath || !outputPath.endsWith('.html'))
            return content

        try {
            // Minify HTML first for consistent whitespace
            const minified = await minify(content, minifyOptions)

            // Process with Typopo
            return processHtmlWithTypopo(minified, language)
        } catch (error) {
            console.error('Error in Typopo transform:', error)
            return content // Return original content on error
        }
    }
}
