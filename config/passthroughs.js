/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
 */

export default {
    admin: eleventyConfig => eleventyConfig.addPassthroughCopy('static/admin'),
    staticAssets: eleventyConfig => eleventyConfig.addPassthroughCopy('static/assets'),
    srcAssets: eleventyConfig => eleventyConfig.addPassthroughCopy('src/assets'),
}
