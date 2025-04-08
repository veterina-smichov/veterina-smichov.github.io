# Veterina Smíchov website

## Features

- [Eleventy 3](https://www.11ty.dev/)
- [Vite 6](https://vite.dev/)
- CSS/Sass post-processing with PostCSS incl. [Autoprefixer](https://github.com/postcss/autoprefixer), [cssnano](https://cssnano.github.io/cssnano/) and [PurgeCSS](https://purgecss.com/)
- [Bootstrap 5.3](https://getbootstrap.com/)
- [Utopia.fyi](https://utopia.fyi/) [Sass library](https://github.com/trys/utopia-core-scss)
- [Sveltia CMS](https://github.com/sveltia/sveltia-cms)
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

Delete content of output directory. This runs before build or start commands.
```sh
npm run clean
```
Note: this is run before dev server starts and before build.

## CSS

[Autoprefixer](https://github.com/postcss/autoprefixer) adds necessary browser prefixes.

The [browserslist](https://github.com/browserslist/browserslist) settings can be adjusted in `package.json`.

## Structure

```bash
├─ _site/                            # 11ty output directory
├─ config/                           # configuration files
│  ├─ transforms/                    # transforms folder
│  │  └─ htmlTypopoTransform.js      # typopo transformation
│  ├─ collections.js                 # collections config
│  ├─ filters.js                     # filters config
│  ├─ ignores.js                     # ignores config
│  ├─ passthroughs.js                # passthroughs config
│  ├─ plugins.js                     # plugins config
│  ├─ shortcodes.js                  # shortcodes config
│  ├─ templateLanguages.js           # template languages config
│  ├─ transforms.js                  # transforms config
│  ├─ vite.js                        # vite config
│  └─ watchtargets.js                # watchtargets config
├─ src/                              # 11ty input directory
│  ├─ _data/                         # 11ty data directory (data available globally)
│  │  ├─ build.js                    # data about build
│  │  ├─ eleventyComputed.js         # global computed values (has access to other data in _data/*)
│  │  ├─ footer.js                   # data for footer content
│  │  ├─ generalAnnouncements.json   # data for general announcements
│  │  ├─ meta.json                   # data for meta tags and <head> in general
│  │  ├─ openingHours.js             # data about opening hours
│  │  └─ redirects.yaml              # redirect data
│  ├─ _includes/                     # 11ty includes di
│  │  ├─ macros/                     # nunjucks macros
│  │  ├─ article-list.njk
│  │  ├─ favicon.njk
│  │  ├─ meta.njk
│  │  └─ opening-hours.njk
│  ├─ _layouts/                      # 11ty layouts directory (basic templates to be used for whole pages)
│  │  ├─ _base.njk                   # templates starting with _ are not used directly
│  │  ├─ 404.njk
│  │  ├─ base.njk
│  │  ├─ homepage.njk
│  │  ├─ ordinacni-hodiny.njk
│  │  ├─ article.njk
│  │  ├─ articles.njk
│  │  └─ page.njk                    # base template for most pages
│  ├─ _special-urls/                 # special pages/files
│  │  ├─ _special-urls.11tydata.json # directory specific settings
│  │  ├─ 404.html.njk                # 404 template
│  │  ├─ build.txt.njk               # build.txt template
│  │  ├─ redirects.njk               # template that will generate page for each redirect and also contains redirects data
│  │  ├─ robots.txt.njk              # robots.txt template
│  │  └─ sitemap.xml.njk             # sitemap.xml template
│  ├─ articles/                      # articles directory
│  │  ├─ article-slug.md             # article
│  │  └─ articles.11tydata.json      # directory specific settings
│  ├─ assets/                        # processed assets
│  │  ├─ images/                     # images directory
│  │  │  ├─ cms-managed/             # images available to CMS (Sveltia)
│  │  │  │  └─ example.svg
│  │  │  └─ example.svg              # image not available to CMS but available in templates (logo etc.)
│  │  ├─ scripts                     # JavaScript  directory
│  │  │  ├─ modules/                 # JavaScript modules directory
│  │  │  │  └─ example.js
│  │  │  └─ scripts.js               # main styles file (assets/scripts/scripts.css will be generated)
│  │  └─ styles/                     # CSS/Sass  directory
│  │     └─ styles.scss              # main styles file (assets/style.css will be generated)
│  └─ pages/                         # pages directory
│     ├─ admin.11tydata.json         # admin template data (to avoid frontmatter in admin.njk)
│     ├─ admin.njk                   # admin template: will be generated to _site/admin/
│     ├─ clanky.njk                  # articles template in nunjucks format
│     ├─ kontakty.md                 # contact template in markdown format
│     ├─ index.njk                   # homepage template
│     └─ pages.11tydata.json         # directory specific settings
├─ static/                           # assets that will not be processed, just copied as they are into `_site`
│  ├─ admin/                         # admin directory
│  │  └─ config.yml                  # Decap CMS config
│  └─ assets/                        # to be copied to `_site/assets` internal structure is up to you
│     ├─ favicon/                    # favicon directory
│     ├─ fonts/                      # fonts directory
│     └─ site.webmanifest            # manifest
├─ .eleventy.js                      # 11ty main configuration file
└─ postcss.config.cjs                # PostCSS configuration
```
