/**
 * Eleventy filters
 * https://www.11ty.dev/docs/filters/
 */

import markdownIt from 'markdown-it'
import { DateTime } from 'luxon'
import yaml from 'js-yaml'
import fs from 'fs'
import util from 'util'

const meta = yaml.load(fs.readFileSync('./src/_data/meta.yaml', 'utf8')) // import locale from meta.yaml

export default (eleventyConfig) => {
    eleventyConfig.addFilter('pprint', value => util.inspect(value))

    eleventyConfig.addFilter('dateToFormat', (date, format) => DateTime.fromJSDate(date).setLocale(meta.locale).toLocaleString(String(format)))

    eleventyConfig.addFilter('dateToISO', date => DateTime.fromJSDate(date, { zone: 'UTC' }).setLocale(meta.locale).toISO({ includeOffset: false, suppressMilliseconds: true }))

    eleventyConfig.addFilter('dateForSitemap', date => DateTime.fromJSDate(date, { zone: 'UTC' }).toFormat('yyyy-MM-dd'))

    eleventyConfig.addFilter('dateStringToDate', (dateString) => {
        if (!dateString) return null
        if (dateString instanceof Date) return dateString
        const date = DateTime.fromISO(dateString)
        return date.isValid ? date.toJSDate() : null
    })

    eleventyConfig.addFilter('markdown', value => markdownIt({ html: true, breaks: true, linkify: true }).render(value))

    eleventyConfig.addFilter('filterTagList', tags => (tags || []).filter(tag => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1))

    eleventyConfig.addFilter('filterOutCurrentPage', (collection, currentPageUrl) => {
        if (!currentPageUrl) return collection
        return collection.filter(item => item.url !== currentPageUrl)
    })
}
