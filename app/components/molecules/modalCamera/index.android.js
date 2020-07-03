import React from 'react'
import { View, Text, TouchableOpacity, Modal, ScrollView, Image, TextInput } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { SvgXml } from 'react-native-svg'
import { Fonts, Margin, Padding, Border, Row, Column, Colors, Background, Alignment } from 'theme'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import CustomAccordionCard from 'components/atom/customAccordionCard'

import closeIcon from 'icons/ic-close.svg'

export default function ModalCamera({
  children,
  title,
  modalVisible,
  changeModalVisible,
  items,
  onCancel,
  onSubmit,
  link,
  labelInformation,
  sequence,
  onFirstChange,
  onSecondChange,
  firstValue,
  secondValue,
}) {
  const renderInputText = () => {
    if (sequence == 2) {
      return (
        <View style={{ pading: 8, margin: 16 }}>
          <Text style={{ ...Fonts.f12, ...Margin.mb_4 }}>No KTP</Text>
          <TextInput
            value={firstValue}
            style={{ ...Fonts.f12, ...Margin.mb_16 }}
            placeholder="Input Nomor KTP"
            keyboardType="number-pad"
            onChangeText={(text) => onFirstChange(text)}
          />
          <Text style={{ ...Fonts.f12, ...Margin.mb_4 }}>Nama KTP</Text>
          <TextInput
            value={secondValue}
            style={{ ...Fonts.f12 }}
            placeholder="Input Nama KTP"
            onChangeText={(text) => onSecondChange(text)}
          />
        </View>
      )
    } else if (sequence == 3) {
      return (
        <View style={{ pading: 8, margin: 16 }}>
          <Text style={{ ...Fonts.f12, ...Margin.mb_4 }}>No SIM</Text>
          <TextInput
            value={firstValue}
            style={{ ...Fonts.f12, ...Margin.mb_16 }}
            keyboardType="number-pad"
            placeholder="Input Nomor SIM"
            onChangeText={(text) => onFirstChange(text)}
          />
          <Text style={{ ...Fonts.f12, ...Margin.mb_4 }}>Nama SIM</Text>
          <TextInput
            value={secondValue}
            style={{ ...Fonts.f12 }}
            placeholder="Input Nama SIM"
            onChangeText={(text) => onSecondChange(text)}
          />
        </View>
      )
    } else {
      return <View />
    }
  }
  return (
    <Modal
      // animationType="slide" // fade
      visible={modalVisible}
      style={{ backgroundColor: '#fff' }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 9 }}>
          <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <KeyboardAwareScrollView>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  padding: 16,
                }}
              >
                <Image
                  style={{ aspectRatio: 1, width: '100%' }}
                  resizeMode={'contain'}
                  source={{
                    uri: link,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 2,
                }}
              >
                {renderInputText()}
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ ...Fonts.f_12, textAlign: 'center' }}>{labelInformation}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                  }}
                >
                  <TouchableOpacity
                    onPress={onCancel.bind(this)}
                    style={{
                      flex: 1,
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      ...Background.bg_white,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.2,
                      shadowRadius: 5,
                      elevation: 5,
                      margin: 5,
                    }}
                  >
                    <Text>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onSubmit.bind(this)}
                    style={{
                      flex: 1,
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      ...Background.bg_amber,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.2,
                      shadowRadius: 5,
                      elevation: 5,
                      margin: 5,
                    }}
                  >
                    <Text>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    </Modal>
  )
}

ModalCamera.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
  children: null,
  modalVisible: true,
  changeModalVisible: () => {},
  title: 'Syarat dan Ketentuan Sewa',
  link: '',
  labelInformation: 'Mohon pastikan seluruh informasi terlihat dengan jelas',
  onFirstChange: () => {},
  onSecondChange: () => {},
  firstValue: '',
  secondValue: '',
}

ModalCamera.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
  modalVisible: PropTypes.bool,
  changeModalVisible: PropTypes.func,
  title: PropTypes.string,
  link: PropTypes.string,
  labelInformation: PropTypes.string,
  onFirstChange: PropTypes.func,
  onSecondChange: PropTypes.func,
  firstValue: PropTypes.string,
  secondValue: PropTypes.string,
}
