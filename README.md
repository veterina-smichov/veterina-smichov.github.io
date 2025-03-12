# Veterina Smíchov website

## Features

- Eleventy v3
- Eleventy Dev Server with live reload
- Vite v6
- Vite as Middleware in Eleventy Dev Server (uses [eleventy-plugin-vite](https://github.com/11ty/eleventy-plugin-vite/))
- Eleventy build output is post-processed by [Vite](https://vitejs.dev) (with Rollup)
- CSS/Sass post-processing with PostCSS incl. [Autoprefixer](https://github.com/postcss/autoprefixer) and cssnano
- XML sitemap

## Getting started

```sh
npm install
```

## Run dev server

The project comes with Eleventy’s built-in development server. You can start the server with

```sh
npm start
````

## Build

To trigger a production build, use

```sh
npm run build
```

## CSS

[Autoprefixer](https://github.com/postcss/autoprefixer) adds necessary browser prefixes.

The [browserslist](https://github.com/browserslist/browserslist) settings can be adjusted in `package.json`.
