import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchKtp: ['payload'],
  fetchSim: ['payload'],
  fetchFace: ['payload'],
  putImage: ['payload'],
  putImageSuccess: null,
  putImageLoading: null,
  resetImage: null,
})

export const ImageTypes = Types
export default Creators
