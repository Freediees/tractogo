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
import CustomBottomSheet from 'components/molecules/customBottomSheet'
import OkCancelButton from 'components/molecules/okCancelButton'

// native base imports
import { Input } from 'native-base'
import SearchInput, { createFilter } from 'react-native-search-filter'
// import from 'react-native-status-bar-height'

import caret from 'icons/ic-CTADown.svg'
import closeIcon from 'icons/ic-close.svg'
import searchIcon from 'icons/ic-search.svg'

// Default render of country flag
export default function ItemDropDownPicker({
  placeholder,
  onSelect,
  headerLabel,
  modalLabel,
  selectList,
  defaultSelectLabel,
}) {
  const [selectContent, setSelectContent] = useState({
    title: 'Rp 20.000',
    value: 1,
  })
  const onSelectContent = (val) => {
    onSelect(val)
    setSelectContent(val)
    modalSelect.close()
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.itemStyle}>
              {/* country flag */}
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <View
                  style={{ flex: 1, flexDirection: 'row', alignItems: 'center', ...Padding.ph_8 }}
                >
                  <View style={{ flex: 5, ...Padding.pl_8 }}>
                    <Text style={{ ...Fonts.f_14, ...Fonts.text_green }}>
                      {selectContent.title || defaultSelectLabel}
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity
                      name="md-arrow-dropdown"
                      style={[styles.iconStyle]}
                      onPress={() => modalSelect.open()}
                    >
                      <SvgXml xml={caret} width={16} height={16} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <CustomBottomSheet title={modalLabel} botSheetRef={(ref) => (modalSelect = ref)}>
          <View style={{ flexDirection: 'column', width: '100%' }}>
            {selectList.map((val) => {
              return (
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...Padding.ph_20,
                    ...Padding.pv_20,
                  }}
                  onPress={() => onSelectContent(val)}
                >
                  <Text>{val.title}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </CustomBottomSheet>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    ...Fonts.f_12,
    ...Fonts.text_black,
    ...Padding.ph_16,
    ...Padding.pv_16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5059ae',
  },
})

ItemDropDownPicker.defaultProps = {
  selectList: [
    {
      title: 'Rp 20.000',
      value: 1,
    },
    {
      title: 'Rp 50.000',
      value: 1,
    },
    {
      title: 'Rp 100.000',
      value: 1,
    },
    {
      title: 'Rp 200.000',
      value: 2,
    },
  ],
  defaultSelectLabel: 'Mr.',
  modalLabel: 'Title',
  headerLabel: 'Name',
  modalVisible: false,
  placeholder: 'Input Text',
  onChangeText: () => {},
  onSelect: () => {},
}

ItemDropDownPicker.propTypes = {
  selectList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  modalLabel: PropTypes.string,
  defaultSelectLabel: PropTypes.string,
  headerLabel: PropTypes.string,
  placeholder: PropTypes.string,
  modalVisible: PropTypes.bool,
  onChangeText: PropTypes.func,
  onSelect: PropTypes.func,
}
