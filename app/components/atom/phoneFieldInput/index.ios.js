/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Separator from 'components/atom/separator'
import { SvgXml } from 'react-native-svg'
import { Colors, Fonts, Border, Background, Margin, Padding } from 'theme'
import PropTypes from 'prop-types'
// native base imports
import { Input } from 'native-base'
import SearchInput, { createFilter } from 'react-native-search-filter'
// import from 'react-native-status-bar-height'

import caret from 'icons/ic-CTADown.svg'
import closeIcon from 'icons/ic-close.svg'
import searchIcon from 'icons/ic-search.svg'

import data from './Country'
import topData from './TopCountry'

const KEYS_TO_FILTERS = ['name']

// Default render of country flag
export default function PhoneFieldInput({
  flag,
  placeholder,
  phoneNumber,
  onChangeText,
  getCountry,
  countryCode,
  allCountryLabel,
  placeholderSearch,
  style,
}) {
  const [modalVisible, changeModalVisible] = useState(false)
  const [countryData, changeCountryData] = useState(data)
  const [topCountryData, changeTopCountryData] = useState(topData)
  const [searchTerm, changeSearchTerm] = useState('')
  const [selectedCountry, changeSelectedCountry] = useState(
    topData.filter((obj) => obj.name === 'Indonesia')[0].flag
  )
  const [selectedCountryCode, changeSelectedCountryCode] = useState('+62')

  const renderCountry = (item) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          getCountry(item.dial_code)
          changeSelectedCountry(item.flag)
          changeSelectedCountryCode(item.dial_code)
          changeModalVisible(false)
        }}
      >
        <View>
          <View
            style={[
              styles.countryStyle,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 24 }}>{item.flag}</Text>
              </View>
              <View style={{ flex: 10, ...Padding.pr_8 }}>
                <Text style={{ ...Fonts.f_10, ...Margin.ml_16 }}>{item.name.toUpperCase()}</Text>
              </View>
              <View style={{ flex: 2, alignItems: 'flex-end' }}>
                <Text style={{ ...Fonts.f_10 }}>{item.dial_code}</Text>
              </View>
            </View>
          </View>
          <View style={{ ...Padding.ph_12 }}>
            <Separator />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const filteredTopCountry = topCountryData.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
  const filteredCountry = countryData.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

  return (
    <SafeAreaView style={[styles.container, { ...style }]}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Phone input with native-base */}
            {/* phone section  */}
            <View style={styles.itemStyle}>
              {/* country flag */}
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <View
                  style={{ flex: 3, flexDirection: 'row', alignItems: 'center', ...Padding.ph_4 }}
                >
                  <Text style={{ ...Margin.mh_8 }}>{selectedCountry}</Text>
                  <Text style={{ ...Fonts.text_black }}>{selectedCountryCode}</Text>
                  <TouchableOpacity
                    name="md-arrow-dropdown"
                    style={[styles.iconStyle]}
                    onPress={() => changeModalVisible(true)}
                  >
                    <SvgXml xml={caret} width={16} height={16} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 7, ...Padding.ph_8 }}>
                  <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.grey}
                    keyboardType={'phone-pad'}
                    // returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={false}
                    value={phoneNumber}
                    onChangeText={(val) => {
                      // if (phoneNumber === '') {
                      //   onChangeText(countryCode + val)
                      // } else {
                      onChangeText(val)
                      // }
                    }}
                  />
                </View>
              </View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <View style={{ flex: 3, ...Padding.ph_8 }}>
                  <Separator />
                </View>
                <View style={{ flex: 7, ...Padding.ph_8 }}>
                  <Separator />
                </View>
              </View>
              {/* open modal */}
              {/* Modal for country code and flag */}
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
                      ...Padding.pv_20,
                      ...Margin.mb_20,
                    }}
                  >
                    <View
                      style={{
                        flex: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Colors.light_grey,
                        ...Margin.mr_20,
                        ...Border.border_rad_4,
                      }}
                    >
                      <View style={{ ...Padding.pl_16 }}>
                        <SvgXml xml={searchIcon} width={20} height={20} fill={Colors.smoky_grey} />
                      </View>
                      <SearchInput
                        inputViewStyles={{ ...Padding.pv_16, ...Padding.ph_16 }}
                        onChangeText={(term) => {
                          changeSearchTerm(term)
                        }}
                        style={{ color: '#000000' }}
                        placeholder={placeholderSearch}
                      />
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <TouchableOpacity
                        onPress={() => {
                          changeModalVisible(false)
                          changeSearchTerm('')
                        }}
                      >
                        <SvgXml xml={closeIcon} width={20} height={20} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      flex: 12,
                      ...Padding.ph_12,
                      backgroundColor: '#ffffff',
                      borderBottomColor: Colors.light_grey,
                    }}
                  >
                    <ScrollView>
                      {filteredTopCountry &&
                        filteredTopCountry.map((item) => {
                          return renderCountry(item)
                        })}
                      {filteredCountry && filteredCountry.length > 0 && (
                        <View style={{ ...Padding.ph_12, ...Margin.mt_20, ...Margin.mb_12 }}>
                          <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>
                            {allCountryLabel}
                          </Text>
                        </View>
                      )}
                      {filteredCountry &&
                        filteredCountry.map((item) => {
                          return renderCountry(item)
                        })}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    ...Fonts.text_black,
    ...Padding.ph_16,
    ...Padding.pv_4,
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

PhoneFieldInput.defaultProps = {
  flag: topData.filter((obj) => obj.name === 'Indonesia')[0].flag,
  modalVisible: false,
  phoneNumber: '',
  countryCode: '+62',
  placeholder: 'Input phone number',
  onChangeText: () => {},
  getCountry: () => {},
  allCountryLabel: 'All Country',
  placeholderSearch: 'Search Country Code',
  style: {},
}

PhoneFieldInput.propTypes = {
  flag: PropTypes.shape({}),
  placeholder: PropTypes.string,
  countryCode: PropTypes.string,
  modalVisible: PropTypes.bool,
  phoneNumber: PropTypes.string,
  onChangeText: PropTypes.func,
  getCountry: PropTypes.func,
  allCountryLabel: PropTypes.string,
  placeholderSearch: PropTypes.string,
  style: PropTypes.shape({}),
}
