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


import caret from 'icons/ic-CTADown.svg'


// Default render of country flag
export default function PhoneFieldInput({
  placeholder,
  onSelect,
  headerLabel,
  modalLabel,
  selectList,
  defaultSelectLabel,
  onNameChange,
  onSelectTitle,
  value,
  title,
}) {
  const onSelectContent = (val) => {

    console.log('Hello', title)
    onSelectTitle(val)
    setSelectContent(val)
    modalSelect.close()
  }

  const onChangeText = (val) => {
    onNameChange(val)
    setContent(val)
  }

  const [content, setContent] = useState('')
  const [selectContent, setSelectContent] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container} behavior="padding" enabled>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.itemStyle}>
              {/* country flag */}
              <Text style={{ ...Fonts.f_12 }}>{headerLabel}</Text>
              <View
                style={{ flexDirection: 'row' }}
              >
                <View
                  style={{ flex: 1, flexDirection: 'row', alignItems: 'center', ...Padding.ph_8 }}
                >
                  <Text style={{ ...Fonts.f_14, ...Fonts.text_grey }}>
                    { title == 0 ? 'Mr.' : 'Ms.'}
                  </Text>
                  <TouchableOpacity
                    name="md-arrow-dropdown"
                    style={[styles.iconStyle]}
                    onPress={() => modalSelect.open()}
                  >
                    <SvgXml xml={caret} width={16} height={16} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 7, ...Padding.ph_8 }}>
                  <TextInput
                    value={value}
                    color={'black'}
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.grey}
                    returnKeyType="done"
                    autoCorrect={false}
                    secureTextEntry={false}
                    onChangeText={(val) => {
                      onChangeText(val)
                    }
                    }
                  />
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
                  onPress={() => onSelectContent(val.value)}
                >
                  <Text>{val.title}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </CustomBottomSheet>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
   // justifyContent: 'center',
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
    paddingHorizontal: 30,
    backgroundColor: '#5059ae',
  },
  itemStyle: {
    marginBottom: 0,
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
  title: 'Mr',
  selectList: [
    {
      title: 'Mr.',
      value: 0,
    },
    {
      title: 'Ms.',
      value: 1,
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

PhoneFieldInput.propTypes = {
  selectList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  modalLabel: PropTypes.string,
  defaultSelectLabel: PropTypes.string,
  headerLabel: PropTypes.string,
  placeholder: PropTypes.string,
  modalVisible: PropTypes.bool,
  onChangeText: PropTypes.func,
  onSelect: PropTypes.func,
  title: PropTypes.string,
}
