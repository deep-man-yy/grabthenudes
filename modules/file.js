import _ from 'lodash'
import path from 'path'

const debug = require('debug').default('app:modules:file')

export default class File {
  constructor(path) {
    this.update(path)
  }

  /**
   *
   * @param {*} path
   * @param {*} dataURL
   */
  static async fromDataURL(path, dataURL) {
    await window.deepTools.fs.write(path, dataURL)
    return new this(path)
  }

  /**
   *
   * @param {*} path
   */
  static fromPath(path) {
    return new this(path)
  }

  /**
   *
   * @param {*} path
   */
  update(path) {
    if (_.isNil(path)) {
      path = this.getPath()
    }

    const info = window.deepTools.fs.getInfo(path)

    this.name = info.name
    this.ext = info.ext
    this.dir = info.dir
    this.mimetype = info.mimetype
    this.size = info.size
    this._exists = info.exists

    // debug(`[${path}]`, { file: this })
  }

  /**
   *
   */
  getPath() {
    return path.join(this.dir, `${this.name}${this.ext}`)
  }

  /**
   *
   */
  getName() {
    return this.name
  }

  /**
   *
   */
  getExt() {
    return this.ext
  }

  /**
   *
   */
  getDir() {
    return this.dir
  }

  /**
   *
   */
  getMimetype() {
    return this.mimetype
  }

  /**
   *
   */
  getSize() {
    return this.size
  }

  /**
   *
   */
  exists() {
    return this._exists
  }

  /**
   *
   */
  async readAsDataURL() {
    if (!this.exists()) {
      return undefined
    }

    const data = await window.deepTools.fs.read(this.getPath())
    return `data:${this.getMimetype()};base64,${data}`
  }

  /**
   *
   */
  async writeDataURL(dataURL) {
    await window.deepTools.fs.writeDataURL(this.getPath(), dataURL)
    this.update(this.getPath())
  }
}
