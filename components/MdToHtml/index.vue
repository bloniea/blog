<template>
  <div class="md-to-html" v-html="mdToHtml(props.html)"></div>
</template>

<script setup lang="ts">
import { marked } from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import javascript from "highlight.js/lib/languages/javascript"

const props = defineProps({
  html: {
    type: String,
    default: "",
  },
})
hljs.registerLanguage("javascript", javascript)
const renderer = new marked.Renderer()
renderer.code = function (code: string, language: string) {
  const validLanguage = hljs.getLanguage(language) ? language : "plaintext"
  return `<pre><code class="hljs ${validLanguage}">${
    hljs.highlight(validLanguage, code).value
  }</code></pre>`
}
marked.setOptions({ renderer })
const mdToHtml = (markdown: string) => {
  return marked(markdown)
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
</style>
