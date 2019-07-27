import _ from 'lodash'
import uuid from 'uuid/v4'
import File from '../file'

const debug = require('debug').default('app:modules:models:model-photo')

/**
 * Represents the photo to be processed of a Model.
 */
export default class ModelPhoto {
  /**
   *
   * @param {Model|null} model Model to which it belongs
   * @param {File} file Instance of the file
   */
  constructor(model, file) {
    // Unique identification and model
    this.uuid = uuid()
    this.model = model

    // Source file, this is the photo that we want to transform
    this.sourceFile = file

    // Cropped file, this is the photo cropped to 512x512
    this.croppedFile = File.fromPath(
      window.deepTools.getPath('temp', `${this.uuid}.png`)
    )

    // Output file, this is the photo already transformed!
    this.outputFile = File.fromPath(
      this.getFolderPath(this.getOutputFileName())
    )

    // CLI messages
    this.cliLines = []
    this.cliError = ''

    this.debug(`New instance of ModelPhoto`, {
      sourceFile: this.sourceFile,
      croppedFile: this.croppedFile,
      outputFile: this.outputFile
    })
  }

  /**
   *
   * @param {*} message
   * @param  {...any} args
   */
  debug(message, ...args) {
    debug(`[${this.uuid}] ${message} `, ...args)
  }

  /**
   *
   */
  isValid() {
    return _.isNil(this.getValidationErrorMessage())
  }

  /**
   * Returns the error message for an invalid file. null if there are no errors.
   */
  getValidationErrorMessage() {
    const file = this.getSourceFile()

    if (!file.exists) {
      return 'Apparently the file does not exist anymore!'
    }

    if (
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/gif'
    ) {
      return 'The selected file is not a valid photo. Only JPEG, PNG or GIF.'
    }

    if (file.size > 5) {
      return 'The selected file is big, this can generate problems. Maximum size: 5MB'
    }

    return null
  }

  /**
   *
   */
  getFolderName() {
    return _.isNil(this.model) ? 'Uncategorized' : this.model.name
  }

  /**
   *
   */
  getFolderPath(...args) {
    return window.deepTools.getPath(
      'userData',
      'models',
      this.getFolderName(),
      ...args
    )
  }

  /**
   *
   */
  getSourceFile() {
    return this.sourceFile
  }

  /**
   *
   */
  getCroppedFile() {
    return this.croppedFile
  }

  /**
   *
   */
  getOutputFile() {
    return this.outputFile
  }

  /**
   *
   */
  getOutputFileName() {
    return `${this.getSourceFile().getName()}_GrabTheNudes.png`
  }

  /**
   *
   * @param {object} settings
   */
  transform(settings) {
    return new Promise((resolve, reject) => {
      const onSpawnError = error => {
        reject(
          new Error(
            `We were unable to start the CLI for the transformation!\n
        This can be caused by a corrupt installation, please make sure that cli.exe exists and works correctly (if you are a developer, make sure that main.py works)\n
        The script has reported the following error, take a screenshot to get more information:\n
        ${error}`
          )
        )
      }

      let child

      try {
        child = window.deepTools.transform(this, settings)
      } catch (error) {
        onSpawnError(error)
      }

      child.on('error', error => {
        onSpawnError(error)
      })

      child.on('stdout', output => {
        this.cliLines.push(...output.toString().trim().split('\n'))
      })

      child.on('stderr', output => {
        this.cliLines.push(output)
        this.cliError += `${output}\n`
      })

      child.on('ready', code => {
        if (code === 0) {
          this.outputFile.update()
          resolve()
        } else {
          reject(
            new Error(
              `The transformation has been interrupted by an CLI error.\n
              This can be caused by:\n
              - A corrupt installation (commonly: The checkpoints folder was not found in cli/)\n
              - Incompatible system\n
              - If you are using GPU: The NVIDIA graphics card could not be found\n
              - If you are using CPU: Insufficient RAM. Buy more RAM!\n
              The CLI has reported the following error, take a screenshot to get more information:\n
              ${this.cliError}`
            )
          )

          this.cliLines = []
          this.cliError = ''
        }
      })
    })
  }
}
