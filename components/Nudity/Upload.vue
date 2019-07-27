<template>
  <div class="c-nudity-upload">
    <!-- Dropzone -->
    <div
      class="upload-dropzone"
      :class="{'is-dragging': isDraggingFile}"
      @dragenter="onDragEnter"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop">
      <p class="dropzone-hint">Drag and drop a photo here or select the button below. </p>
    </div>

    <!-- Hidden input -->
    <input
      v-show="false"
      ref="photo"
      type="file"
      accept="image/jpeg, image/png"
      @change="onPhotoSelected" />

    <!-- Action button -->
    <button class="button" @click.prevent="$refs.photo.click()">
      Select photo
    </button>
  </div>
</template>

<script>
import _ from 'lodash'
import { ModelPhoto } from '~/modules/models'
import { File } from '~/modules'

export default {
  props: {
    model: {
      type: String,
      default: undefined
    }
  },

  data: () => ({
    // Indicates if the user is dragging a file in the window (we apply the drag style)
    isDraggingFile: false
  }),

  created() {
    // Restarts the information of a previous process
    this.$nudity.reset()
  },

  methods: {
    /**
     * File selected, start a new transformation process
     */
    start(inputFile) {
      if (_.isNil(inputFile)) {
        alert('It seems that you have not selected a photo!')
        return
      }

      // New instance of the file
      const file = File.fromPath(inputFile.path)

      // Create a photo for the model ("null" model for now)
      const modelPhoto = new ModelPhoto(null, file)

      // Get any error message from the file
      const validationErrorMessage = modelPhoto.getValidationErrorMessage()

      if (!_.isNil(validationErrorMessage)) {
        alert(validationErrorMessage)
        return
      }

      // Start the transformation process!
      this.$nudity.start(modelPhoto)

      // It's time to crop the photo
      this.$router.push('/nudity/crop')
    },

    onPhotoSelected(event) {
      const { files } = event.target

      if (files.length === 0) {
        alert('It seems that you have not selected a photo!')
        return
      }

      this.start(files[0])
      event.target.value = ''
    },

    onDragEnter(event) {
      event.dataTransfer.dropEffect = 'copy'
      this.isDraggingFile = true
    },

    onDragLeave() {
      this.isDraggingFile = false
    },

    onDragOver(event) {
      event.preventDefault()
      event.stopPropagation()
      event.dataTransfer.dropEffect = 'copy'
      this.isDraggingFile = true
    },

    onDrop(event) {
      event.preventDefault()
      event.stopPropagation()

      this.isDraggingFile = false

      const { files } = event.dataTransfer

      if (files.length === 0) {
        return
      }

      this.start(files[0])
    }
  }
}
</script>

<style lang="scss">
.c-nudity-upload {
  @apply w-full
    relative
    text-center;

  .upload-dropzone {
    @apply flex
      items-center
      justify-center
      bg-gray-100
      rounded
      mx-5
      border-transparent
      border-2
      border-dashed
      mb-5;

    height: 150px;
    transition: all 0.1s linear;

    &.is-dragging {
      @apply bg-gray-200 border-gray-500;

      .dropzone-hint {
        @apply opacity-25;
      }
    }

    .dropzone-hint {
      @apply text-gray-500 uppercase;
      transition: all 0.1s linear;
    }
  }

  &.is-dragging {
    @apply border-gray-400 border-dotted;

    .dragging-overlay {
      display: block;
    }
  }

  .dragging-overlay {
    @apply bg-white absolute top-0 left-0 right-0 bottom-0 hidden;
    opacity: 0.3;
  }

  .fu-hint {
    @apply text-sm text-gray-600;
  }
}
</style>


