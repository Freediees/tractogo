/* eslint-disable no-console */
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera'
import { setImage } from 'function'
import RNFetchBlob from 'react-native-fetch-blob'
import { connect } from 'react-redux'
import ModalCamera from 'components/molecules/modalCamera'
import { Fonts, ImageSize, Margin, Padding, Flex } from 'theme'

import ImageAction from 'scenes/kYCImage/store/actions'
import { SafeAreaView } from 'react-navigation'

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
}

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
}

const landmarkSize = 2

class CameraScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flash: 'off',
      zoom: 0,
      autoFocus: 'on',
      autoFocusPoint: {
        normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
        drawRectPosition: {
          x: Dimensions.get('window').width * 0.5 - 32,
          y: Dimensions.get('window').height * 0.5 - 32,
        },
      },
      depth: 0,
      type: 'back',
      whiteBalance: 'auto',
      ratio: '16:9',
      recordOptions: {
        mute: false,
        maxDuration: 5,
        quality: RNCamera.Constants.VideoQuality['288p'],
      },
      isRecording: false,
      canDetectFaces: false,
      canDetectText: false,
      canDetectBarcode: false,
      faces: [],
      textBlocks: [],
      barcodes: [],
      modalState: false,
      sequenceImage: 1,
      tempUri: '',
      noKTP: '',
      noSIM: '',
      namaKTP: '',
      namaSIM: '',
    }
  }

  onChangeNoKTP = (value) => {
    this.setState({ noKTP: value })
  }

  onChangeNoSIM = (value) => {
    this.setState({ noSIM: value })
  }

  onChangeNamaKTP = (value) => {
    this.setState({ namaKTP: value })
  }

  onChangeNamaSIM = (value) => {
    this.setState({ namaSIM: value })
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    })
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    })
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    })
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    })
  }

  touchToFocus(event) {
    const { pageX, pageY } = event.nativeEvent
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const isPortrait = screenHeight > screenWidth

    let x = pageX / screenWidth
    let y = pageY / screenHeight
    // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
    if (isPortrait) {
      x = pageY / screenHeight
      y = -(pageX / screenWidth) + 1
    }

    this.setState({
      autoFocusPoint: {
        normalized: { x, y },
        drawRectPosition: { x: pageX, y: pageY },
      },
    })
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    })
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    })
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    })
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync()
      //console.warn('takePicture ', data)

      //let key = this.props.navigation.state.params.key
      if (this.state.sequenceImage == 1) {
        setImage('face', data.uri)
      } else if (this.state.sequenceImage == 2) {
        setImage('ktp', data.uri)
      } else if (this.state.sequenceImage == 3) {
        setImage('sim', data.uri)
      }

      const fs = RNFetchBlob.fs
      let imagePath = null
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', data.uri)
        .then((resp) => {
          imagePath = resp.path()
          return resp.readFile('base64')
        })
        .then((base64Data) => {
          //console.log(base64Data)
          return fs.unlink(imagePath)
        })

      this.setState({ tempUri: data.uri })

      if (this.state.sequenceImage == 1) {
        this.props.fetchFace(data.uri)
        //this.props.fetchFace('https://cdn.idntimes.com/content-images/community/2019/02/dz8qvbxwkauiwua-895dcbe77a5a75ed3abeaacf5f548ba9_600x400.jpg')
      } else if (this.state.sequenceImage == 2) {
        this.props.fetchKtp(data.uri)
        //this.props.fetchKtp('https://cdn.idntimes.com/content-images/community/2019/02/dz8qvbxwkauiwua-895dcbe77a5a75ed3abeaacf5f548ba9_600x400.jpg')
      } else if (this.state.sequenceImage == 3) {
        this.props.fetchSim(data.uri)
        //this.props.fetchSim('https://cdn.idntimes.com/content-images/community/2019/02/dz8qvbxwkauiwua-895dcbe77a5a75ed3abeaacf5f548ba9_600x400.jpg')
      }

      //alert("take photo")
      this.setState({ modalState: true })
      //this.props.navigation.goBack()
    }
  }

  takeVideo = async function() {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions)

        if (promise) {
          this.setState({ isRecording: true })
          const data = await promise
          this.setState({ isRecording: false })
          console.warn('takeVideo', data)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  toggle = (value) => () => this.setState((prevState) => ({ [value]: !prevState[value] }))

  facesDetected = ({ faces }) => this.setState({ faces })

  renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
    <View
      key={faceID}
      transform={[
        { perspective: 600 },
        { rotateZ: `${rollAngle.toFixed(0)}deg` },
        { rotateY: `${yawAngle.toFixed(0)}deg` },
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    >
      <Text style={styles.faceText}>ID: {faceID}</Text>
      <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
      <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
    </View>
  )

  renderLandmarksOfFace(face) {
    const renderLandmark = (position) =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      )
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    )
  }

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  )

  renderLandmarks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  )

  renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View>
  )

  renderTextBlock = ({ bounds, value }) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  )

  textRecognized = (object) => {
    const { textBlocks } = object
    this.setState({ textBlocks })
  }

  barcodeRecognized = ({ barcodes }) => this.setState({ barcodes })

  renderBarcodes = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.barcodes.map(this.renderBarcode)}
    </View>
  )

  renderBarcode = ({ bounds, data, type }) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        <Text style={[styles.textBlock]}>{`${data} ${type}`}</Text>
      </View>
    </React.Fragment>
  )

  onCancel = () => {
    this.setState({ modalState: false })
  }

  onSubmit = () => {
    if (this.state.sequenceImage == 1) {
      //alert('Selfie Saved')
    } else if (this.state.sequenceImage == 2) {
      //alert('KTP Saved')
    } else if (this.state.sequenceImage == 3) {
      //alert('SIM Saved')
    }
    //alert(this.state.sequenceImage)
    if (this.state.sequenceImage < 3) {
      if (this.state.sequenceImage == 2) {
        if (this.state.namaKTP && this.state.noKTP) {
          var nextSeq = this.state.sequenceImage + 1
          this.setState({ sequenceImage: nextSeq })
          this.setState({ modalState: false })
        } else {
          alert('Silahkan lengkapi data KTP anda')
        }
      } else {
        var nextSeq = this.state.sequenceImage + 1
        this.setState({ sequenceImage: nextSeq })
        this.setState({ modalState: false })
      }
    } else if (this.state.sequenceImage == 3) {
      if (this.state.namaSIM && this.state.noSIM) {
        let payload = {
          namaKTP: this.state.namaKTP,
          namaSIM: this.state.namaSIM,
          noKTP: this.state.noKTP,
          noSIM: this.state.noSIM,
        }
        //console.log(this.state)
        this.props.setCardData(payload)
        this.props.navigation.navigate('KYCImage')
        this.setState({ modalState: false })
      } else {
        alert('Silahkan lengkapi data SIM anda')
      }
    }
  }

  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state

    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    }
    const { height, width } = Dimensions.get('window')
    const maskRowHeight = Math.round((height - 300) / 20)
    const maskColWidth = (width - 300) / 2

    const getTitle = () => {
      if (this.state.sequenceImage == 1) {
        return 'Selfie'
      } else if (this.state.sequenceImage == 2) {
        return 'KTP / Paspor'
      } else if (this.state.sequenceImage == 3) {
        return 'SIM'
      }
    }

    const getInfo = () => {
      if (this.state.sequenceImage == 1) {
        return 'Posisikan wajah kamu didalam oval'
      } else if (this.state.sequenceImage == 2) {
        return 'Posisikan KTP / Paspor kamu didalam kotak'
      } else if (this.state.sequenceImage == 3) {
        return 'Posisikan SIM kamu didalam kotak'
      }
    }

    return (
      <RNCamera
        ref={(ref) => {
          this.camera = ref
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        type={this.state.sequenceImage == 1 ? 'front' : 'back'}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
      >
        <View style={StyleSheet.absoluteFill}>
          <SafeAreaView
            style={{
              marginTop: 40,
              paddingTop: 10,
              paddingBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ ...Fonts.f_16, ...Fonts.text_white, ...Fonts.semibold }}>
              {getTitle()}
            </Text>
          </SafeAreaView>
          <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
          <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flex: 0.5,
            height: 72,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        />
        <View style={styles.maskOutter}>
          <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
          <View style={[{ flex: 30 }, styles.maskCenter]}>
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            <View style={this.state.sequenceImage == 1 ? styles.maskInner : styles.maskInnerCard} />
            <View style={[{ width: maskColWidth }, styles.maskFrame]} />
          </View>
          <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
        </View>

        <View style={{ bottom: '5%' }}>
          <View
            style={{
              marginBottom: 100,
              paddingTop: 10,
              paddingBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ ...Fonts.f_12, ...Fonts.text_white, ...Fonts.semibold }}>
              {getInfo()}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              padding: 5,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 100,
            }}
          >
            <TouchableOpacity
              style={[
                {
                  height: 50,
                  width: 50,
                  backgroundColor: 'white',
                  alignSelf: 'flex-end',
                  borderRadius: 40,
                },
              ]}
              onPress={this.takePicture.bind(this)}
            >
              {/* <Text style={styles.flipText}> Capture </Text> */}
            </TouchableOpacity>
          </View>
        </View>
        <ModalCamera
          sequence={this.state.sequenceImage}
          modalVisible={this.state.modalState}
          changeModalVisible={() => {}}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          link={this.state.tempUri}
          firstValue={this.state.sequenceImage == 2 ? this.state.noKTP : this.state.noSIM}
          secondValue={this.state.sequenceImage == 2 ? this.state.namaKTP : this.state.namaSIM}
          onFirstChange={this.state.sequenceImage == 2 ? this.onChangeNoKTP : this.onChangeNoSIM}
          onSecondChange={
            this.state.sequenceImage == 2 ? this.onChangeNamaKTP : this.onChangeNamaSIM
          }
        />
      </RNCamera>
    )
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 250,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 150,
  },
  maskInnerCard: {
    width: 350,
    height: 250,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
})

const mapStateToProps = (state) => ({
  kycImage: state.kycImage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchKtp: (value) => dispatch(ImageAction.fetchKtp(value)),
  fetchSim: (value) => dispatch(ImageAction.fetchSim(value)),
  fetchFace: (value) => dispatch(ImageAction.fetchFace(value)),
  setCardData: (value) => dispatch(ImageAction.setCardData(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraScreen)
