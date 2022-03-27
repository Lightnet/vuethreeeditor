/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { createApp } from './main'

const { app, router } = createApp()
console.log("entry client...")
// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
})

// https://cdn.skypack.dev/vue@3.2.30/dist/vue.esm-browser.prod.js