<template>
  <figure class="cnudity-preview">
    <img :src="nudityPreview" :style="{ 'width': width + 'px', 'height': height + 'px' }" />
  </figure>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 312
    },

    height: {
      type: Number,
      default: 312
    },

    type: {
      type: String,
      default: 'output'
    }
  },

  data: () => ({
    nudityPreview: undefined
  }),

  async created() {
    this.nudityPreview = await this.getPreviewDataURL()
  },

  methods: {
    async getPreviewDataURL() {
      if (!this.$nudity.hasModelPhoto()) {
        return require('~/assets/images/d1hpv9d-e1c2c577-d272-41b0-bd73-a89209108efd.jpg')
      }

      if (this.type === 'output') {
        return this.$nudity.modelPhoto.getOutputFile().readAsDataURL()
      }

      if (this.type === 'cropped') {
        return this.$nudity.modelPhoto.getCroppedFile().readAsDataURL()
      }

      return this.$nudity.modelPhoto.getSourceFile().readAsDataURL()
    }
  }
}
</script>

<style lang="scss">
.cnudity-preview {
  @apply flex justify-center items-center py-5;
}
</style>
