/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/filters/
 */

import markdownIt from 'markdown-it'
import { DateTime } from 'luxon'

export default {
    dateToFormat: eleventyConfig => {
        eleventyConfig.addFilter('dateToFormat', (date, format) =>
            DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(String(format))
        )
    },

    dateToISO: eleventyConfig => {
        eleventyConfig.addFilter('dateToISO', date =>
            DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
                includeOffset: false,
                suppressMilliseconds: true
            })
        )
    },

    markdown: eleventyConfig => {
        const options = {
            html: true,
            breaks: true,
            linkify: true
        }
        const markdownLib = markdownIt(options)

        eleventyConfig.addFilter('markdown', value => markdownLib.render(value))
    },

    filterTagList: eleventyConfig => {
        eleventyConfig.addFilter('filterTagList', tags =>
            (tags || []).filter(tag => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1)
        )
    }
}
