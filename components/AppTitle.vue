<template>
  <div class="app-title">
    <slot />
  </div>
</template>

<style lang="scss">
.app-title {
  @apply flex flex-col justify-center border-b border-gray-300 px-4 py-2;
  min-height: 90px;

  .title {
    @apply font-bold text-xl;

    sup {
      @apply text-gray-600;
    }
  }

  .subtitle {
    @apply text-lg text-gray-600;
  }

  a {
    @apply underline;
  }
}
</style>
