const siteName = 'veterina-smichov.cz'

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

// Import configuration loader
import { configLoad } from './config/configLoader.js'

export default config => {
    // Tasks to run, in order, with icon and name
    // Set echo to false if you don't want to log the task to the console
    const tasks = [
        { name: 'Collections', config: collections, echo: true },
        { name: 'Plugins', config: plugins, echo: true },
        { name: 'Shortcodes', config: shortcodes, echo: true },
        { name: 'Filters', config: filters, echo: true },
        { name: 'Transforms', config: transforms, echo: true },
        { name: 'Passthroughs', config: passthroughs, echo: true },
        { name: 'Template Languages', config: templatelanguages, echo: true },
        { name: 'Ignores', config: ignores, echo: true },
        { name: 'Watch Targets', config: watchtargets, echo: true }
    ]
    // Log the build process
    configLoad({ siteName, tasks, config })

    // Add build configuration
    vite(config)

    config.setDataFileSuffixes(['.11tydata']) // use only something.11tydata.js or json files
    // Enable quiet mode
    config.setQuietMode(true)

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
