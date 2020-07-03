import React, { Fragment } from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Separator from 'components/atom/separator'
import { SvgXml } from 'react-native-svg'
import { Colors, Fonts, Border, Margin, Padding } from 'theme'
import PropTypes from 'prop-types'

import CustomMapView from 'components/atom/customMapView'

import closeIcon from 'icons/ic-close.svg'
import currentLocationIcon from 'icons/ic-curentlocation.svg'
import locationIcon from 'icons/ic-filter1.svg'

export default function CustomLocationPicker({
  modalVisible,
  changeModalVisible,
  keyword,
  changeKeyword,
  requestSearchPrediction,
  keywordPlaceholder,
  predictions,
  predictionItemClick,
  location,
  locationPlaceHolder,
  changeLocation,
  latitude,
  longitude,
  onCloseIconPress,
}) {
  return (
    <Modal
      animationType="slide" // fade
      transparent={false}
      visible={modalVisible}
    >
      <View style={{ flex: 1, marginTop: getStatusBarHeight(true) }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderBottomColor: Colors.light_grey,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
            ...Padding.ph_16,
          }}
        >
          <View
            style={{
              flex: 10,
              flexDirection: 'row',
              alignItems: 'center',
              ...Margin.mr_20,
              ...Border.border_rad_4,
            }}
          >
            <View style={{ ...Padding.pl_16 }}>
              <SvgXml xml={currentLocationIcon} width={20} height={20} fill={Colors.black} />
            </View>
            <View
              style={{ width: '100%', flexDirection: 'column', ...Padding.ph_20, ...Padding.pv_16 }}
            >
              <TextInput
                onChangeText={(term) => {
                  changeKeyword(term)
                  if (term.length >= 3) {
                    requestSearchPrediction()
                  }
                }}
                value={keyword}
                style={{ ...Padding.pv_16, ...Fonts.text_black }}
                placeholder={keywordPlaceholder}
              />
              <View>
                <Text style={{ ...Fonts.f_12, ...Fonts.text_grey }}>
                  {location ? location.name : locationPlaceHolder}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                changeModalVisible(false)
                onCloseIconPress()
                changeKeyword('')
              }}
            >
              <SvgXml xml={closeIcon} width={20} height={20} fill={'black'} />
            </TouchableOpacity>
          </View>
        </View>
        {predictions && (
          <View style={{ width: '100%', ...Padding.pt_8, flexDirection: 'column' }}>
            {predictions.map((v, i) => {
              return (
                <Fragment>
                  <TouchableOpacity
                    onPress={() => {
                      predictionItemClick(v)
                    }}
                    style={{
                      width: '100%',
                      ...Margin.mh_20,
                      ...Padding.ph_20,
                      ...Padding.pv_12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                      <SvgXml xml={locationIcon} height={16} width={16} />
                    </View>
                    <View style={{ flex: 9 }}>
                      <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Fonts.text_black }}>
                        {v.terms[0].value}
                      </Text>
                      <Text style={{ ...Fonts.f_10, ...Fonts.text_black, ...Margin.mt_4 }}>
                        {v.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Separator style={{ ...Margin.mt_4 }} />
                </Fragment>
              )
            })}
          </View>
        )}
        <View style={{ flex: 12, borderBottomColor: Colors.light_grey }}>
          <CustomMapView
            location={location}
            changeLocation={changeLocation}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    ...Fonts.f_12,
    ...Fonts.text_black,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    ...Border.border_rad_4,
    ...Border.border_light_grey,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#5059ae',
  },
  itemStyle: {
    marginBottom: 10,
  },
  iconStyle: {
    color: Colors.amber,
    fontSize: 28,
    ...Padding.p_16,
    ...Margin.mh_8,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  textStyle: {
    ...Padding.p_4,
    ...Fonts.f_16,
    ...Fonts.bold,
    ...Fonts.text_white,
  },
  countryStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  closeButtonStyle: {
    flex: 1,
    ...Padding.p_8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.amber,
  },
})

CustomLocationPicker.defaultProps = {
  modalVisible: true,
  changeModalVisible: () => {},
  changeKeyword: () => {},
  keywordPlaceholder: 'Find Location',
  latitude: -6.2,
  longitude: 106.816666,
  location: null,
  locationPlaceHolder: 'Select Location',
  changeLocation: () => {},
  requestSearchPrediction: () => {},
  predictions: [
    {
      description:
        'Satelit Town Square, Jalan Raya Sukomanunggal Jaya, Sukomanunggal, Surabaya, Jawa Timur, Indonesia',
      terms: [
        {
          offset: 0,
          value: 'Satelit Town Square',
        },
        {
          offset: 1,
          value: 'Jalan Raya Sukomanunggal Raya',
        },
      ],
      place_id: 'ChIJg1vHPBz81y0RnqoxVuGVA4A',
    },
    {
      description: 'Satelit Makmur, Tanjungsari, Surabaya, Jawa Timur, Indonesia',
      terms: [
        {
          offset: 0,
          value: 'Satelit Makmur',
        },
        {
          offset: 1,
          value: 'Tanjungsari',
        },
      ],
      place_id: 'ChIJyaqq6p_-1y0RsAAIPAKBOkc',
    },
    {
      description:
        'Satelit Cell, Jalan Putat Jaya Lebar C, Putat Jaya, Surabaya, Jawa Timur, Indonesia',
      terms: [
        {
          offset: 0,
          value: 'Satelit Cell',
        },
        {
          offset: 14,
          value: 'Jalan Putat Jaya Lebar C',
        },
      ],
      place_id: 'ChIJQwx6G_f71y0RgAvi8rajdOA',
    },
  ],
  predictionItemClick: () => {},
  onCloseIconPress: () => {},
}

CustomLocationPicker.propTypes = {
  modalVisible: PropTypes.bool,
  changeModalVisible: PropTypes.func,
  keyword: PropTypes.string,
  changeKeyword: PropTypes.func,
  keywordPlaceholder: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  location: PropTypes.shape({}),
  locationPlaceHolder: PropTypes.string,
  changeLocation: PropTypes.func,
  requestSearchPrediction: PropTypes.func,
  predictions: PropTypes.arrayOf(PropTypes.shape({})),
  predictionItemClick: PropTypes.func,
  onCloseIconPress: PropTypes.func,
}
