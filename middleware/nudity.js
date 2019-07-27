import _ from 'lodash'

/**
 * Pages that include this middleware will only be accessible
 * if the user has selected a photo to transform.
 */
export default function({ redirect, $nudity }) {
  if (_.isNil($nudity.modelPhoto)) {
    redirect('/')
  }
}
