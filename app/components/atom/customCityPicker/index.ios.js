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
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Separator from 'components/atom/separator'
import { SvgXml } from 'react-native-svg'
import { Colors, Fonts, Border, Background, Margin, Padding } from 'theme'
import PropTypes from 'prop-types'
import SearchInput, { createFilter } from 'react-native-search-filter'

import closeIcon from 'icons/ic-close.svg'
import searchIcon from 'icons/ic-search.svg'

const KEYS_TO_FILTER = ['cityName']

// Default render of country flag
export default function CustomCityPicker({
  cities,
  onCityClick,
  placeholder,
  modalVisible,
  changeModalVisible,
}) {
  const [searchTerm, changeSearchTerm] = useState('')

  const renderItem = (item) => {
    return (
      <TouchableWithoutFeedback onPress={() => onCityClick(item)}>
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
              <View style={{ flex: 10, ...Padding.pr_8 }}>
                <Text style={{ ...Fonts.f_10, ...Margin.ml_16 }}>{item.cityName ? item.cityName.toUpperCase() : ''}</Text>
              </View>
            </View>
          </View>
          <View style={{ ...Padding.pv_8 }}>
            <Separator />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const filteredData = cities.filter(createFilter(searchTerm, KEYS_TO_FILTER))

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
              inputViewStyles={{ ...Fonts.text_black, ...Padding.pv_16, ...Padding.ph_16 }}
              onChangeText={(term) => {
                changeSearchTerm(term)
              }}
              style={styles.searchInput}
              placeholder={placeholder}
            />
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                changeModalVisible(false)
                changeSearchTerm('')
              }}
            >
              <SvgXml xml={closeIcon} width={20} height={20} fill={'black'} />
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
            {filteredData &&
              filteredData.map((item) => {
                return renderItem(item)
              })}
          </ScrollView>
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

CustomCityPicker.defaultProps = {
  cities: [],
  onCityClick: () => {},
  placeholder: 'Cari Kota Sewa',
  modalVisible: true,
  changeModalVisible: () => {},
}

CustomCityPicker.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({})),
  onCityClick: PropTypes.func,
  placeholder: PropTypes.string,
  modalVisible: PropTypes.bool,
  changeModalVisible: PropTypes.func,
}
