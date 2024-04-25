<template>
  <div>
    <div id="autocomplete"></div>
  </div>
</template>

<script setup lang="ts">
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js"
import algoliasearch from "algoliasearch"
import "@algolia/autocomplete-theme-classic"

onMounted(() => {
  const searchClient = algoliasearch(config.algoliaApid, config.algoliaApiKey)
  autocomplete({
    container: "#autocomplete",
    placeholder: "",
    insights: true,
    detachedMediaQuery: "",
    defaultActiveItemId: 0,
    debug: false,

    getSources({ query }) {
      return [
        {
          sourceId: "hits",
          getItems({ query }) {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: config.algoliaIndexName,
                  query,
                  params: {
                    hitsPerPage: 10,
                    attributesToSnippet: ["title:10", "content:35"],
                  },
                },
              ],
            })
          },
          getItemUrl({ item }) {
            return item.url
          },
          templates: {
            item({ item, components, html }) {
              return html`<div class="aa-ItemWrapper">
                <div class="aa-ItemContent">
                  <div class="aa-ItemContentBody">
                    <div class="aa-ItemContentTitle">
                      ${components.Highlight({
                        hit: item,
                        attribute: "title",
                      })}
                    </div>
                    <div class="aa-category-title">${item.category_title}</div>
                    <div class="aa-ItemContent">
                      ${components.Snippet({
                        hit: item,
                        attribute: "content",
                      })}
                    </div>
                  </div>
                  <div class="aa-ItemActions">
                    <button
                      class="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                      type="button"
                      title="Select"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>`
            },
          },
        },
      ]
    },
  })
})
</script>

<style lang="stylus">
@import './index.styl'
</style>
