/**
 * Eleventy collections
 * https://www.11ty.dev/docs/collections/
 */

export default (eleventyConfig) => {
    eleventyConfig.addCollection('articles', collectionApi => collectionApi.getFilteredByTag('articles'))
    eleventyConfig.addCollection('pages', collectionApi => collectionApi.getFilteredByTag('pages'))
    // another option
    // eleventyConfig.addCollection('pages', collectionApi => collectionApi.getFilteredByGlob('src/content/pages/!**!/!*.md')
}
