import yaml from 'js-yaml'

// Import configurations
import collections from './config/collections.js'
import plugins from './config/plugins.js'
import shortcodes from './config/shortcodes.js'
import filters from './config/filters.js'
import transforms from './config/transforms.js'
import passthroughs from './config/passthroughs.js'
import templatelanguages from './config/templateLanguages.js'
import ignores from './config/ignores.js'
import watchtargets from './config/watchtargets.js'
import vite from './config/vite.js'

export default eleventyConfig => {
    // Apply all configuration modules
    collections(eleventyConfig)
    plugins(eleventyConfig)
    shortcodes(eleventyConfig)
    filters(eleventyConfig)
    transforms(eleventyConfig)
    passthroughs(eleventyConfig)
    templatelanguages(eleventyConfig)
    ignores(eleventyConfig)
    watchtargets(eleventyConfig)
    vite(eleventyConfig)

    // use only something.11tydata.js or json files
    eleventyConfig.setDataFileSuffixes(['.11tydata'])

    // add yaml with yaml processing as a data file
    eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents))

    // enable quiet mode
    eleventyConfig.setQuietMode(true)

    return {
        templateFormats: ['md', 'njk'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            layouts: '_layouts',
            data: '_data'
        }
    }
}
