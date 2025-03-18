/**
 * Add Eleventy filters here
 * https://www.11ty.dev/docs/filters/
 */

import markdownIt from 'markdown-it'
import { DateTime } from 'luxon'
import yaml from 'js-yaml'
import fs from 'fs'
import util from 'util'

const meta = yaml.load(fs.readFileSync('./src/_data/meta.yaml', 'utf8')) // import locale from meta.yaml

export default {

    pprint: eleventyConfig => {
        eleventyConfig.addFilter('pprint', function(value) {
            return util.inspect(value)
        })
    },

    dateToFormat: eleventyConfig => {
        eleventyConfig.addFilter('dateToFormat', (date, format) =>
            DateTime.fromJSDate(date).setLocale(meta.locale).toLocaleString(String(format))
        )
    },

    dateToISO: eleventyConfig => {
        eleventyConfig.addFilter('dateToISO', date =>
            DateTime.fromJSDate(date, { zone: 'UTC' }).setLocale(meta.locale).toISO({
                includeOffset: false,
                suppressMilliseconds: true
            })
        )
    },

    dateStringToDate: eleventyConfig => {
        eleventyConfig.addFilter('dateStringToDate', (dateString) => {
            if (!dateString) return null
            const date = DateTime.fromISO(dateString)
            return date.isValid ? date.toJSDate() : null
        })
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
    },

    filterOutCurrentPage: eleventyConfig => {
        eleventyConfig.addFilter('filterOutCurrentPage', function(collection) {
            const currentPage = this.ctx.page
            if (!currentPage) return collection
            return collection.filter(item => item.url !== currentPage.url)
        })
    }
}
