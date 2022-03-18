// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

//const fs = require('fs')
//const path = require('path')

import fs from 'fs';
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const toAbsolute = (p) => path.resolve(__dirname, p)

//const manifest = require('./dist/static/ssr-manifest.json')
const manifest = JSON.parse(fs.readFileSync("./dist/static/ssr-manifest.json", 'utf8'));

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')

//fixed bug not loading in type module in package.json
fs.renameSync(
  toAbsolute('./dist/server/entry-server.js')
  ,toAbsolute('./dist/server/entry-server.cjs')
);

//const { render } = require('./dist/server/entry-server.js')

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .map((file) => {
    const name = file.replace(/\.vue$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })

;(async () => {
  const { render } = await import("./dist/server/entry-server.cjs");

  // pre-render each route...
  for (const url of routesToPrerender) {
    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }

  // done, delete ssr manifest
  fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()