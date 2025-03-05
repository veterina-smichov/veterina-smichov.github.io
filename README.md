# Veterina Smíchov website

## Features

* Eleventy v3
* Eleventy Dev Server with live reload
* Vite v5
* Vite as Middleware in Eleventy Dev Server (uses [eleventy-plugin-vite](https://github.com/11ty/eleventy-plugin-vite/))
* Eleventy build output is post-processed by [Vite](https://vitejs.dev) (with Rollup)
* CSS/Sass post-processing with PostCSS incl. [Autoprefixer](https://github.com/postcss/autoprefixer) and cssnano
* Uses [my own opinionated CSS/Sass structure](https://matthiasott.com/notes/how-i-structure-my-css)
* Critical CSS, generated and inlined via [rollup-plugin-critical](https://github.com/nystudio107/rollup-plugin-critical). The main CSS file is then loaded asynchronously with [Scott Jehl’s `media` loading strategy](https://www.filamentgroup.com/lab/load-css-simpler/) (adds `media="print"` and swaps to `media="all"` once loaded)
* Example implementation of a web font loading strategy ([critical FOFT with preload](https://www.zachleat.com/web/comprehensive-webfonts/#critical-foft-preload))
* Basic fluid typography based on [Utopia](https://utopia.fyi)
* Basic dark mode support (using `prefers-color-scheme` and CSS Custom Properties)
* RSS feed 🧡
* XML sitemap

## Getting started

```sh
npm install
```

## Run dev server

The project comes with Eleventy’s built-in development server. You can start the server with

```sh
npm start
````

or

```sh
npx @11ty/eleventy --serve
````


## Build

To trigger a production build, use

```sh
npm run build
````

or

```sh
npx @11ty/eleventy
```

## CSS
By default, this starter project uses Sass with an opinionated folder structure. Feel free to replace this structure with your own. If you prefer to write standards-compliant, good old plain CSS, this is also supported. Nesting is then possible via the [PostCSS Nesting plugin](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-nesting), following the [CSS Nesting specification](https://drafts.csswg.org/css-nesting-1/).

[Autoprefixer](https://github.com/postcss/autoprefixer) adds necessary browser prefixes. The [browserslist](https://github.com/browserslist/browserslist) settings can be adjusted in `package.json`.
