<template>
  <div class="layout">
    <layout-navigation />

    <div class="content">
      <nuxt />
    </div>

    <layout-jobs v-if="false" />
  </div>
</template>

<style lang="scss">
.layout {
  @apply flex h-screen;

  .content {
    @apply flex-1 h-screen overflow-hidden overflow-y-auto;
  }
}
</style>
