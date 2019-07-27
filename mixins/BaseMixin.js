import _ from 'lodash'
import tippy from 'tippy.js'
import nudity from '~/modules/nudity'

export default {
  directives: {
    tooltip: {
      inserted(el, binding) {
        let settings = {}

        if (_.isString(binding.value)) {
          settings.content = binding.value
        } else {
          settings = binding.value
        }

        tippy(el, settings)
      }
    }
  },

  filters: {},

  data: () => ({
    app: {
      name: process.env.APP_NAME,
      version: process.env.APP_VERSION,
      status: process.env.APP_STATUS
    },

    $nudity: nudity,

    $deepTools: window.deepTools
  })
}
