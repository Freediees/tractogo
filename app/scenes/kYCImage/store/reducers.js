import { INITIAL_STATE } from './initialState'
import { createReducer } from 'reduxsauce'
import { ImageTypes } from './actions'

export const fetchKtp = (state, { payload }) => ({
  ...state,
  imageKTP: payload,
  // imageKTP: 'https://www.wowkeren.com/display/images/photo/2020/06/02/00313495.jpg',
  // imageKTP: null,
})

export const fetchSim = (state, { payload }) => ({
  ...state,
  imageSIM: payload,
  // imageSIM: 'https://cdn0-production-images-kly.akamaized.net/e08lIRUzy_89eqprlBe0OpozI6s=/375x500/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2857519/original/008757300_1563472341-mina4.jpg',
  // imageSIM: null,
})

export const fetchFace = (state, { payload }) => ({
  ...state,
  imageFace: payload,
  // imageFace: 'https://kpopping.com/uploads/documents/kpics_gallery/xLIV_9008_.jpeg.keep.fff.png.pagespeed.ic.ihrVDNLB6l.webp'
  // imageFace: null,
})

export const putImageSuccess = (state) => ({
  ...state,
  imageIsLoading: false,
  showModal: true,
})

export const putImageLoading = (state) => ({
  ...state,
  imageIsLoading: true,
})

export const setCardData = (state, { payload }) => ({
  ...state,
  namaKTP: payload.namaKTP,
  namaSIM: payload.namaSIM,
  noKTP: payload.noKTP,
  noSIM: payload.noSIM,
})

export const toggleModal = (state) => ({
  ...state,
  showModal: !showModal,
})

export const resetImage = (state) => ({
  ...state,
  imageSuccess: false,
  imageIsLoading: false,
  imageErrorMessage: null,
  imageKTP: null,
  imageSIM: null,
  imageFace: null,
  namaKTP: null,
  namaSIM: null,
  noKTP: null,
  noSIM: null,
  showModal: false,
})

export const reducer = createReducer(INITIAL_STATE, {
  [ImageTypes.FETCH_KTP]: fetchKtp,
  [ImageTypes.FETCH_SIM]: fetchSim,
  [ImageTypes.FETCH_FACE]: fetchFace,
  [ImageTypes.PUT_IMAGE_SUCCESS]: putImageSuccess,
  [ImageTypes.PUT_IMAGE_LOADING]: putImageLoading,
  [ImageTypes.RESET_IMAGE]: resetImage,
  [ImageTypes.SET_CARD_DATA]: setCardData,
  [ImageTypes.TOGGLE_MODAL]: toggleModal,
})
