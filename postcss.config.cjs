const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const purgecss = require('@fullhuman/postcss-purgecss').default

module.exports = (ctx) => {
    const isProd = ctx.env === 'production' || process.env.NODE_ENV === 'production'

    return {
        plugins: [
            autoprefixer(),
            ...(isProd ? [
                purgecss({
                    content: ['./src/**/*.{njk,md,html,js}'],
                    safelist: [
                        'active', 'show', 'fade', 'collapse', 'collapsing', 'collapsed',
                        'was-validated', 'is-invalid', 'is-valid', 'open', 'hide', 'hidden', 'invisible',
                        'position-static', 'position-relative', 'position-absolute', 'position-fixed', 'position-sticky',
                        'alert-dismissible', 'close', 'carousel-item-start', 'carousel-item-end',
                        'carousel-item-next', 'carousel-item-prev', /^bs-/, /^show-/, /^hide-/,
                        /^active$/, /^bg-/, /^text-/, /^accordion-/, /^collapsed$/, /^modal-/,
                        /^tooltip-/, /^offcanvas-/, /^popover-/, /^navbar-/, /^data-/
                    ],
                    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
                }),
                cssnano({ preset: 'default' })
            ] : [])
        ]
    }
}
