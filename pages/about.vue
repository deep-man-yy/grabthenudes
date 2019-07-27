<template>
  <div class="about" >
    <app-title>
      <h1 class="title">
        About {{ app.name }}
      </h1>

    </app-title>

    <div ref="body" class="content-body markdown-content" v-html="aboutHtml" >
    </div>
  </div>
</template>

<script>
import { markdown } from 'markdown'

export default {
  data: () => ({
    aboutHtml: ''
  }),

  created() {
    const content = require('raw-loader!~/assets/etc/ABOUT.md').default
    this.aboutHtml = markdown.toHTML(content)
  },

  mounted() {
    this.$nextTick(() => {
      const links = this.$refs.body.querySelectorAll('a')

      for (const el of links) {
        el.addEventListener('click', this.openLink)
      }
    })
  },

  methods: {
    openLink(e) {
      e.preventDefault()
      window.deepTools.shell.openExternal(e.target.href)
    }
  }
}
</script>


<style lang="scss">
.about {
}
</style>
