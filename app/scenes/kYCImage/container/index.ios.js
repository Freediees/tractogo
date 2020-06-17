import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import RNFetchBlob from 'react-native-fetch-blob'

import KYCImageScreen from 'components/organism/kYCImageScreen'
import KYCSummary from 'components/organism/kYCSummaryScreen'
import { getImage } from 'function'
import ImageAction from 'scenes/kYCImage/store/actions'

function KYCImage({
  navigation,
  fetchUser,
  user,
  userIsLoading,
  userErrorMessage,
  kycImage,
  fetchKtp,
  fetchSim,
  fetchFace,
  putImage,
}) {
  const [faceImage, setFaceImage] = useState('')
  const [simImage, setSimImage] = useState('')
  const [ktpImage, setKtpImage] = useState('')
  const [userId, setUserId] = useState('')
  const defaultUrl =
    'https://www.digopaul.com/wp-content/uploads/related_images/2015/09/08/placeholder_2.jpg'

  useEffect(() => {
    async function initialize() {
      // fetchKtp(null)
      // fetchFace(null)
      // fetchSim(null)
      console.log(await kycImage)
      setUserId(await user.Id)

    }
    initialize()
  }, [])

  const convertBase64 = async (uri) => {
    let value = null
    const fs = RNFetchBlob.fs
    let imagePath = null
    await RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', uri)
      .then((resp) => {
        imagePath = resp.path()
        return resp.readFile('base64')
      })
      .then((base64Data) => {
        value = base64Data

        return fs.unlink(imagePath)
      })

    return value
  }

  const listData = [
    {
      label: 'Foto Wajah',
      imageUrl: {
        uri: kycImage.imageFace ? `${kycImage.imageFace}` : defaultUrl,
      },
      onImage: () => {
        navigation.navigate('CameraScreen', { key: 'face' })
      },
    },
    {
      label: 'KTP',
      imageUrl: {
        uri: kycImage.imageKTP ? `${kycImage.imageKTP}` : defaultUrl,
      },
      onImage: () => {
        navigation.navigate('CameraScreen', { key: 'ktp' })
      },
    },
    {
      label: 'SIM',
      imageUrl: {
        uri: kycImage.imageSIM ? `${kycImage.imageSIM}` : defaultUrl,
      },
      onImage: () => {
        navigation.navigate('CameraScreen', { key: 'sim' })
      },
    },
  ]

  const onBack = () => {
    navigation.goBack()
  }

  const onNext = async () => {
    let payload = {
      Id: await user.Id,
      user: user,
      ImageSelfie: `data:image/gif;base64,${await convertBase64(kycImage.imageFace)}`,
      ImageKTP: `data:image/gif;base64,${await convertBase64(kycImage.imageKTP)}`,
      ImageSIM: `data:image/gif;base64,${await convertBase64(kycImage.imageSIM)}`,
    }

    await putImage(payload)
  }

  //return <KYCImageScreen listData={listData} onBack={onBack} onNext={onNext} isLoading={kycImage.imageIsLoading}/>
  return <KYCSummary onBack={onBack} onNext={onNext}/>
}

KYCImage.defaultProps = {}

KYCImage.propTypes = {}

const mapStateToProps = (state) => ({
  user: state.home.user,
  kycImage: state.kycImage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchKtp: (value) => dispatch(ImageAction.fetchKtp(value)),
  fetchSim: (value) => dispatch(ImageAction.fetchSim(value)),
  fetchFace: (value) => dispatch(ImageAction.fetchFace(value)),
  putImage: (value) => dispatch(ImageAction.putImage(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KYCImage)
