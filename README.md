# Veterina Smíchov website

## Features

- [Eleventy 3](https://www.11ty.dev/)
- [Vite 6](https://vite.dev/)
- CSS/Sass post-processing with PostCSS incl. [Autoprefixer](https://github.com/postcss/autoprefixer), [cssnano](https://cssnano.github.io/cssnano/) and [PurgeCSS](https://purgecss.com/)
- [Bootstrap 5.3](https://getbootstrap.com/)
- [Utopia.fyi](https://utopia.fyi/) [Sass library](https://github.com/trys/utopia-core-scss)
- [Decap CMS](https://decapcms.org/) or [Sveltia CMS](https://github.com/sveltia/sveltia-cms)
- [Typopo](https://typopo.org/) for nicer typography
- XML sitemap
- Redirects
- Actions to deploy to GitHub Pages

## Getting started

```sh
npm install
```

## Run dev server

The project comes with Eleventy’s built-in development server.
You can start the server with
```sh
npm start
````

## Build

To trigger a production build
```sh
npm run build
```

## Clean

Delete content of output directory.
```sh
npm run clean
```
Note: this is run before dev server starts and before build.

## CSS

[Autoprefixer](https://github.com/postcss/autoprefixer) adds necessary browser prefixes.

The [browserslist](https://github.com/browserslist/browserslist) settings can be adjusted in `package.json`.

## Structure

```bash
├─ _site/                          # 11ty output directory
├─ src/                            # 11ty input directory, place any static pages directly into it
│ ├─ _data/                        # 11ty data directory (data available globally)
│ │ ├─ meta.json                   # data for meta tags
│ │ ├─ navigation.json             # data for generating navigation
│ │ └─ redirects.js                # data containing redirects (for redirects.njk)
│ ├─ _includes/                    # 11ty includes directory (partials to be used with include template tag)
│ │ ├─ footer.njk
│ │ ├─ header.njk
│ │ └─ navigation.njk
│ ├─ _layouts/                     # 11ty layouts directory (basic templates to be used for whole pages)
│ │ ├─ article.njk
│ │ └─ page.njk                    # base template for most pages
│ ├─ _special-urls/                # special pages/files
│ │ ├─ 404.html.njk                # 404 template
│ │ ├─ _special-urls.11tydata.json # directory specific settings
│ │ ├─ build.txt.11tydata.js       # data for build.txt
│ │ ├─ build.txt.njk               # build.txt template
│ │ ├─ redirects.njk               # template that will generate page for each redirect
│ │ ├─ robots.txt.njk              # robots.txt template
│ │ └─ sitemap.xml.njk             # sitemap.xml template
│ ├─ articles/                     # articles directory
│ │ ├─ 2020-04-12-sample-post.md   # article
│ │ └─ articles.11tydata.json      # directory specific settings
│ ├─ assets/                       # processed assets
│ │ ├─ images/                     # images directory
│ │ │  └─ logo.svg
│ │ ├─ scripts                     # JavaScript  directory
│ │ │  ├─ modules/                 # JavaScript modules  directory
│ │ │  │  └─ nav.js
│ │ │  └─ scripts.js               # main styles file (assets/scripts/scripts.css will be generated)
│ │ └─ styles/                     # CSS/Sass  directory
│ │     └─ styles.scss             # main styles file (assets/style.css will be generated)
│ ├─ admin.11tydata.json           # admin template data (to avoid frontmatter in admin.njk)
│ ├─ admin.njk                     # admin template: will be generated to _site/admin/
│ ├─ articles.njk                  # articles template
│ ├─ contact.md                    # contact template in markdown format
│ ├─ index.njk                     # homepage template
│ └─ src.11tydata.json             # directory specific settings (yes for all files)
├─ static/                         # assets that will not be processed, just copied as they are into `_site`
│ ├─ admin/                        # admin directory
│ │  └─ config.yml                 # Decap CMS config
│ └─ assets/                       # to be copied to `_site/assets` internal structure is up to you
│     ├─ favicon/                  # favicon directory
│     ├─ fonts/                    # fonts directory
│     └─ site.webmanifest          # manifest
└─ postcss.config.cjs              # PostCSS configuration
```
