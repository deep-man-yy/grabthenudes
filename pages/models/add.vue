<template>
  <div class="models-creation">
    <app-title>
      <h1 class="title">
        <!--🎭 Model Creation-->
        Model Creation
      </h1>

      <h3 class="subtitle">
        Who is this person?
      </h3>
    </app-title>

    <div class="content-body">
      <div class="buttons">
        <nuxt-link to="/models" class="button is-danger">Cancel</nuxt-link>
      </div>

      <div class="fields">
        <div class="field">
          <label class="label">Name:</label>
          <input v-model="name" class="input" required />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: ''
  })
}
</script>

<style lang="scss">
.models-creation {
  .fields {
    @apply mt-5;
  }
}
</style>

