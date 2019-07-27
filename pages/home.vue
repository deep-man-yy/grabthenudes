<template>
  <div class="home" style=" -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;">
    <app-title>
      <h1 class="title" style="text-align: center;">
        Enjoy the premium version of GrabTheNudes
      </h1>

    </app-title>

    <div class="content-body" style="    padding: 0px;">
      <div class="notification is-transparent" style="  text-align: center;   border: 0px;   -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;">
        <button> <img v-bind:src="imageUrl" @click.prevent="goHomePage" style="width: 294px;"> </button>
      </div>
    </div>

    <div class="home-wip">
      <!-- Quick Upload -->
      <nudity-upload v-if="validCliDir && validCheckpointsDir" />

      <div v-if="validCliDir" style="    position: absolute;   bottom: 20px; text-align:center; color:#7F828B; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;" >
        <p>Remember that the app is only to be used for educational or demonstrative purposes only. 
        <br/>We are not liable for the content produced by users using GrabTheNudes <br/> in any way shape or form.</p>
      </div>

      <!-- CLI Dir -->
      <div v-if="!validCliDir" class="notification is-danger">
        <strong>❌ Hold on!</strong><br />
        We could not find the <strong>CLI</strong> folder!
        This can be caused by a corrupt installation, please make sure that the CLI folder exists in:
        <br><br>{{ cliDirPath }}<br><br>
        Join our GrabTheNudes for more information.
      </div>

      <!-- Checkpoints CLI Dir -->
      <div v-if="!validCheckpointsDir" class="notification is-danger">
        <strong>❌ Hold on!</strong><br />
        We could not find the <strong>checkpoints</strong> folder!
        This folder is downloaded separately, please make sure that the checkpoints folder exists in:
        <br><br>{{ checkpointsDirPath }}<br><br>
        Join our GrabTheNudes for more information.
      </div>
    </div>
  </div>
</template>

<script>
import path from 'path'

export default {
  data: () => ({
    cliDirPath: undefined,
    validCliDir: true,
    imageUrl: '/3.png',
    checkpointsDirPath: undefined,
    validCheckpointsDir: true
  }),

  created() {/*
    this.cliDirPath = window.deepTools.getCliDirPath()
    this.validCliDir = window.deepTools.fs.exists(this.cliDirPath)

    this.checkpointsDirPath = path.join(
      window.deepTools.getCliDirPath(),
      'checkpoints'
    )

    this.validCheckpointsDir = window.deepTools.fs.exists(
      this.checkpointsDirPath
    )*/
  },

  methods: {
    goHomePage() {
      window.deepTools.goHomePage("https://grabthenudes.com");
    }
  }
}
</script>

<style lang="scss">
.layout-navbar {
  @apply py-6 shadow h-screen ;
  width: 200px !important;
  visibility: visible !important;
}
.home {
  .home-wip {
    @apply flex flex-col justify-center items-center;

    a {
      @apply text-primary underline;
    }
  }
}
</style>
