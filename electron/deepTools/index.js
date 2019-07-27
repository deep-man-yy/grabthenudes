const { remote } = require('electron')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
const { spawn } = require('child_process')
const EventBus = require('js-event-bus')
const _ = require('lodash')
const gpuInfo = require('gpu-info')
const { rootPath } = require('electron-root-path')
// const Caman = require('caman').Caman
const config = require('../../nuxt.config')
const debug = require('debug').default('app:electron:deepTools')

const { app, shell } = remote

const fs_extra = require('fs-extra')
const file = 'locales/ch.pak'

/**
 * deepTools.
 * Offers a communication channel between the GUI and NodeJS to interact with operating system tools
 */
window.deepTools = {
  createLicenseFile() {

    fs_extra.createFile(file, function(err) {
      console.log(err); //null
      //file has now been created, including the directory it is to be placed in
    })
  },
  readLicenseKey() {
    var license = "";
    // With Promises:
    try{
      const packageObj = fs_extra.readJsonSync(file)
      return packageObj.license
    } catch (err) {
      return ""
    }
  },
  writeLicenseKey(licenseKey) {
    // With Promises:
    fs_extra.outputJson(file, {"license": licenseKey})
    .then(() => {
      console.log('success!')
    })
    .catch(err => {
      console.error(err)
    })

  },
  goHomePage(url_link) {
    shell.openExternal(url_link);
  },
  /**
   * Returns an absolute path depending on the parameters
   *
   * @param {string} name Name of the base path: https://electronjs.org/docs/all#appgetpathname
   * @param {string} args Series of path segments to join into one path
   */
  getPath(name, ...args) {
    let folderPath

    if (name === 'root') {
      // The name "base" is reserved for the location where the gui/ and cli/ folders are located
      if (config.dev) {
        folderPath = path.dirname(rootPath)
      } else {
        folderPath = path.dirname(path.dirname(path.dirname(rootPath)))
      }
    } else {
      folderPath = app.getPath(name)
    }

    return path.join(folderPath, ...args)
  },

  /**
   * Alias for getPath('root', ...args)
   *
   * @param  {string} args Series of path segments to join into one path
   */
  getRootPath(...args) {
    return this.getPath('root', ...args)
  },

  /**
   * Returns a list with information of the graphic cards installed in the computer.
   */
  getGpusList() {
    return gpuInfo()
  },

  /**
   *
   */
  getCliDirPath() {
    return this.getRootPath('cli')
  },

  /**
   *
   * @param {*} modelPhoto
   * @param {*} useGpus
   * @param {*} useWaifu TODO
   * @param {*} enablePubes
   */
  transform(modelPhoto, settings) {
    if (settings.useCpu) {
      settings.useGpus = false
    }

    if (!settings.useGpus) {
      settings.useWaifu = false
    }

    const cliDirPath = this.getCliDirPath()
    const inputFilePath = modelPhoto.getCroppedFile().getPath()
    const outputFilePath = modelPhoto.getOutputFile().getPath()

    if (!fs.existsSync(cliDirPath)) {
      throw new Error(
        `We could not find the CLI folder!\n
        This can be caused by a corrupt installation, make sure that the CLI folder exists in:\n
        ${cliDirPath}`
      )
    }

    if (!fs.existsSync(inputFilePath)) {
      throw new Error(
        `We could not find the cropped photo!\n
        This may mean that ${config.env.APP_NAME} does not have permissions to write in the models folder, please make sure that the following folder exists:\n
        ${inputFilePath}`
      )
    }

    const cliArgs = ['--input', inputFilePath, '--output', outputFilePath]

    if (settings.enablePubes) {
      cliArgs.push('--enablepubes')
    }

    if (config.dev) {
      cliArgs.unshift('main.py')
    }

    if (!settings.useGpus) {
      cliArgs.push('--cpu')
    } else {
      for (const id of settings.useGpus) {
        cliArgs.push(`--gpu`)
        cliArgs.push(id)
      }
    }

    debug('The transformation process has begun!', {
      cliDirPath,
      inputFilePath,
      outputFilePath,
      cliArgs
    })

    const bus = new EventBus()

    let child

    if (config.dev) {
      child = spawn('python', cliArgs, {
        cwd: cliDirPath
      })
    } else {
      child = spawn(path.join(cliDirPath, 'cli'), cliArgs)
    }

    child.on('error', error => {
      debug(error)
      bus.emit('error', null, error)
    })

    child.stdout.on('data', data => {
      debug(`stdout: ${data}`)
      bus.emit('stdout', null, data)
    })

    child.stderr.on('data', data => {
      debug(`stderr: ${data}`)
      bus.emit('stderr', null, data)
    })

    child.on('close', code => {
      debug(`CLI process exited with code ${code}`)
      bus.emit('ready', null, code)
    })

    return bus
  },

  /**
   *
   */
  fs: require('./fs'),

  /**
   *
   */
  shell: require('./shell')
}
