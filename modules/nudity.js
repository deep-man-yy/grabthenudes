import Vue from 'vue'
import _ from 'lodash'
import moment from 'moment'

class Nudity {
  constructor() {
    this.reset()
  }

  /**
   *
   */
  getModel() {
    return this.model
  }

  /**
   *
   * @param {*} value
   */
  setModel(value) {
    this.model = value
    return this
  }

  /**
   *
   * @param {*} value
   */
  getModelPhoto(value) {
    this.modelPhoto = value
  }

  /**
   *
   * @param {*} value
   */
  setModelPhoto(value) {
    this.modelPhoto = value
  }

  /**
   *
   */
  hasModelPhoto() {
    return !_.isNil(this.modelPhoto)
  }

  /**
   *
   * @param {*} photo
   * @param {*} model
   */
  start(photo, model = null) {
    this.setModel(model)
    this.setModelPhoto(photo)
  }

  /**
   *
   */
  reset() {
    this.model = undefined
    this.modelPhoto = undefined
    this.transformation = {
      duration: 0,
      start: undefined
    }

    this.transformationDuration = 0
    this.transformationStart = undefined
  }

  /**
   *
   * @param {object} settings
   */
  async transform(settings) {
    this.transformation.start = moment()

    const durationFunc = () => {
      this.transformation.duration = moment().diff(
        this.transformation.start,
        'seconds'
      )
    }

    const durationInterval = setInterval(durationFunc, 1000)
    durationFunc()

    try {
      await this.modelPhoto.transform(settings)
    } catch (error) {
      throw error
    } finally {
      clearInterval(durationInterval)
    }
  }
}

export default new Nudity()
