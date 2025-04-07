/**
 * Eleventy watch targets
 * https://www.11ty.dev/docs/watch-serve/
 */

export default (eleventyConfig) => {
    // Watch for changes to files in the static directory
    eleventyConfig.addWatchTarget('static')
}
