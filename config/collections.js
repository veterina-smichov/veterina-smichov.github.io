/**
 * Add Eleventy collections here
 * https://www.11ty.dev/docs/collections/
 */

export default {
    articles: eleventyConfig => {
      eleventyConfig.addCollection('articles', collectionApi =>
        collectionApi.getFilteredByTag('articles')
      )
    },

    /*
    pages: eleventyConfig => {
      eleventyConfig.addCollection('pages', collectionApi =>
        collectionApi.getFilteredByGlob('src/content/pages/!**!/!*.md')
      )
    },
    */

    pages: eleventyConfig => {
        eleventyConfig.addCollection('pages', collectionApi =>
            collectionApi.getFilteredByTag('pages')
        )
    }

}
