/**
 * Add Eleventy passthrough file copies here
 * https://www.11ty.dev/docs/copy/
 */

export default {
    admin: eleventyConfig => {
        eleventyConfig.addPassthroughCopy({ 'src/_admin/*.*': '/admin/' })
    },


    assets: eleventyConfig => {
        eleventyConfig.addPassthroughCopy({ 'src/_assets/': '/assets' })
    },

    assetsStatic: eleventyConfig => {
        eleventyConfig.addPassthroughCopy({ 'src/_assets-static/': '/assets' }, {
            filter: path => (!path.includes('.gitkeep')) // filter out .gitkeep files
        })
    },
}
