<template>
  <div class="nudity-settings" style=" -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;">
    <div class="content-body">
      <nudity-preview class="mb-5" type="cropped" />

      <div v-if="!isLoading" class="settings-fields">
        <!-- Process with -->
        <section>
          <div class="field">
            <label class="label">Process Device:</label>

            <div class="field">
              <input v-model="settings.useCpu" type="checkbox" />
              CPU
              <p class="field-help">Force CPU processing. (Slower) Select this option if <strong>you do not have</strong> an NVIDIA GPU!</p>
            </div>

            <div v-for="(gpu,index) in gpuList" :key="index" class="field">
              <input v-model="settings.useGpus" :value="index" type="checkbox" :disabled="settings.useCpu" />
              {{ gpu.Caption || gpu.Name || gpu.Description || gpu.VideoProcessor }}
            </div>

            <div class="field">
              <input v-model="settings.useCustomGpu" type="checkbox" :disabled="settings.useCpu" />
              Custom GPU ID
              <p class="field-help">Select this option if you want to use a GPU that is not in the list.</p>
            </div>

            <div class="field">
              <input v-if="settings.useCustomGpu" v-model="settings.customGpuId" class="input" type="number" min="0" />
            </div>
          </div>
        </section>

        <!-- Options -->
        <section>
          <div class="field">
            <label class="label">Options:</label>

            <div class="field">
              <input v-model="settings.enablePubes" type="checkbox" />
              Enable Pubic Hair
            </div>
          </div>
        </section>

        <!-- TODO: waifu2x -->
        <section v-if="false">
          <div v-if="!settings.useCpu" class="field">
            <label class="label">Use waifu2x:</label>
            <input v-model="settings.useWaifu" type="checkbox" /> Yes, why not?
            <p class="field-help">waifu2x will try to resize your transformed photo to <strong>1024x1024</strong> with the least possible quality loss. Keep in mind that as its name indicates, the program is not designed to work with real people so there may be some minor changes in your photo.</p>
          </div>
        </section>

        <div class="buttons">
          <nuxt-link to="/nudity/crop" class="button is-danger">Back</nuxt-link>
          <button class="button" @click.prevent="transform">Start!</button>
        </div>
      </div>

      <!-- Loading -->
      <div v-else class="settings-loading">
        <h1 class="title">{{ $nudity.transformation.duration }}s</h1>

        <h1 class="title">Loading...</h1>

        <h3 class="subtitle">Transforming your photo with the power of your {{ deviceName }}!</h3>

        <div ref="cli" class="settings-cli">
          <p v-for="(line, index) in $nudity.modelPhoto.cliLines" :key="index" class="cli-line">{{ line }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

export default {
  middleware: 'nudity',

  data: () => ({
    // Indicates if the processing is running
    isLoading: false,

    // List of GPUs detected in the system
    gpuList: [],

    // Process Settings
    settings: {
      useCpu: false,
      useGpus: [],
      useWaifu: false, // weebs out 😡👉🚪
      enablePubes: true,

      useCustomGpu: false,
      customGpuId: 0
    }
  }),

  computed: {
    /**
     *
     */
    deviceName() {
      return this.settings.useCpu ? 'CPU' : 'GPU'
    }
  },

  watch: {
    '$nudity.modelPhoto.cliLines'() {
      this.$nextTick(() => {
        this.$refs.cli.scrollTo(0, this.$refs.cli.scrollHeight)
      })
    }
  },

  async created() {
    await this.getGpusList()

    this.restoreSettings()
  },

  methods: {
    getConfig(name, defaultValue) {
      let settings = localStorage.getItem('process-settings')

      if (_.isNil(settings)) {
        settings = {}
      } else {
        settings = JSON.parse(settings)
      }

      let value = _.get(settings, name)

      if (_.isNil(value)) {
        if (_.isFunction(defaultValue)) {
          value = defaultValue.call(this)
        } else {
          value = defaultValue
        }

        this.setConfig(name, value)
      }

      return value
    },

    setConfig(name, value) {
      let settings = localStorage.getItem('process-settings')

      if (_.isNil(settings)) {
        settings = {}
      } else {
        settings = JSON.parse(settings)
      }

      settings[name] = value
      localStorage.setItem('process-settings', JSON.stringify(settings))
    },

    restoreSettings() {
      this.settings = {
        useCpu: this.getConfig('useCpu', this.gpuList.length === 0),
        useGpus: this.getConfig('useGpus', () => {
          return this.gpuList.length > 0 ? [0] : []
        }),
        useWaifu: this.getConfig('useWaifu', false),
        enablePubes: this.getConfig('enablePubes', true),
        useCustomGpu: this.getConfig('useCustomGpu', false),
        customGpuId: this.getConfig('customGpuId', 0)
      }
    },

    saveSettings() {
      localStorage.setItem('process-settings', JSON.stringify(this.settings))
    },

    async getGpusList() {
      try {
        const gpus = await window.deepTools.getGpusList()
        this.gpuList = _.filter(gpus, { AdapterCompatibility: 'NVIDIA' })
      } catch (error) {}
    },

    async transform() {
      // Save settings
      this.saveSettings()

      if (this.settings.useCustomGpu) {
        this.settings.useGpus.push(this.settings.customGpuId)
      }

      this.isLoading = true

      try {
        await this.$nudity.transform(this.settings)
        this.$router.push('/nudity/results')
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
.nudity-settings {
  .settings-fields {
    @apply overflow-hidden overflow-y-auto flex flex-wrap;

    section {
      @apply w-6/12 mb-3 px-3;
    }
  }

  .settings-loading {
    @apply text-center;

    .title {
      @apply font-bold text-3xl;
    }

    .subtitle {
      @apply text-gray-600 text-xl;
    }
  }

  .settings-cli {
    @apply mt-6 bg-black p-4 w-full font-mono overflow-y-auto;
    height: 150px;

    .cli-line {
      @apply block text-white;
    }
  }
}
</style>
