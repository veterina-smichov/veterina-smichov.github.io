/**
 * Eleventy shortcodes
 * https://www.11ty.dev/docs/shortcodes/
 */

export default (eleventyConfig) => {
    /**
     * Date shortcode
     * By Stephanie Eckles
     * https://11ty.rocks/eleventyjs/dates/
     */
    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)
}
