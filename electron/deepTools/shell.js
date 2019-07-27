const { remote } = require('electron')

const { app, shell } = remote

module.exports = {
  /**
   * Open the given file in the desktop's default manner.
   * https://electronjs.org/docs/api/shell#shellopenitemfullpath
   *
   * @param {string} fullPath
   */
  openItem(fullPath) {
    return shell.openItem(fullPath)
  },

  /**
   * Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).
   * https://electronjs.org/docs/api/shell#shellopenexternalurl-options
   *
   * @param {string} url
   */
  openExternal(url) {
    return shell.openExternal(url)
  }
}
