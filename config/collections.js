/**
 * Eleventy collections
 * https://www.11ty.dev/docs/collections/
 */

export default (eleventyConfig) => {
    eleventyConfig.addCollection('articles', collectionApi => collectionApi.getFilteredByTag('articles').filter(item => item.data.publish === true).sort((a, b) => b.data.date - a.data.date))
    eleventyConfig.addCollection('pages', collectionApi => collectionApi.getFilteredByTag('pages'))
    eleventyConfig.addCollection('ignoredPages', collectionApi => collectionApi.getFilteredByTag('pages').filter(page => page.data.sitemapIgnore))
}
