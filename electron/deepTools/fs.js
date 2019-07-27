const fs = require('fs')
const mime = require('mime-types')
const path = require('path')

/**
 * Returns the base64 of a dataURL
 * @param {*} dataURL
 */
function getBase64Data(dataURL) {
  let encoded = dataURL.replace(/^data:(.*;base64,)?/, '')

  if (encoded.length % 4 > 0) {
    encoded += '='.repeat(4 - (encoded.length % 4))
  }

  return encoded
}

module.exports = {
  /**
   *
   * @param {string} filePath
   */
  getInfo(filePath) {
    const exists = this.exists(filePath)
    const mimetype = mime.lookup(filePath)
    const { name, ext, dir } = path.parse(filePath)

    let size

    if (exists) {
      const stats = fs.statSync(filePath)
      size = stats.size / 1000000.0
    }

    return {
      exists,
      name,
      ext,
      dir,
      mimetype,
      size
    }
  },

  /**
   *
   * @param {*} path
   */
  async read(path, encoding = 'base64') {
    return fs.readFileSync(path, { encoding })
  },

  /**
   *
   * @param {*} path
   * @param {*} dataURL
   */
  async writeDataURL(path, dataURL) {
    const data = getBase64Data(dataURL)
    return fs.writeFileSync(path, data, 'base64')
  },

  /**
   *
   * @param {string} filePath
   */
  exists(filePath) {
    return fs.existsSync(filePath)
  }
}
