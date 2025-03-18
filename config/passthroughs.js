/**
 * Eleventy passthrough file copies
 * https://www.11ty.dev/docs/copy/
 */

export default (eleventyConfig) => {
    eleventyConfig.addPassthroughCopy('static/admin')
    eleventyConfig.addPassthroughCopy('static/assets')
    eleventyConfig.addPassthroughCopy('src/assets')
}
