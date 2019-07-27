import Vue from 'vue'
import moment from 'moment'
import tippy from 'tippy.js'
import BaseMixin from '~/mixins/BaseMixin'
import nudity from '~/modules/nudity'

const debug = require('debug').default('app:plugins:boot')

// Lift off!
debug('Preparing front-end...')

// Base Mixin
Vue.mixin(BaseMixin)

// MomentJS
moment.locale('en')

// Tippy default settings
tippy.setDefaults({
  delay: 100,
  arrow: true,
  arrowType: 'round'
})

localStorage.debug = 'app:*'

export default async ({ app, $axios, store, isDev }, inject) => {
  // isDev inject
  window.$isDev = isDev

  // axios - default headers
  $axios.setHeader('X-Requested-With', 'XMLHttpRequest')

  // nudity process
  window.$nudity = nudity
  app.context.$nudity = nudity
  inject('nudity', nudity)

  // Debug
  debug('The front-end is ready to render!', { app })
}
