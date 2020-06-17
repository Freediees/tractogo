import React from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { SvgXml } from 'react-native-svg'
import { Fonts, Margin, Padding, Border, Row, Column, Colors } from 'theme'
import PropTypes from 'prop-types'

import closeIcon from 'icons/ic-close.svg'

export default function CustomTopSheet({ children, height, title, modalVisible, changeModalVisible }) {
  return (
    <Modal
      animationType="slide" // fade
      transparent={true}
      visible={modalVisible}
    >
      <View
        style={{
          flex: 1,
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <View
          style={{
            height: height || '66%',
            zIndex: 100,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            ...Padding.pb_12,
            paddingTop: getStatusBarHeight(true),
            backgroundColor: 'white',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              ...Padding.ph_16,
              ...Padding.pt_20,
            }}
          >
            <View
              style={{
                flex: 9,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {title && <Text style={{ ...Fonts.f_16, ...Fonts.semibold }}>{title}</Text>}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  changeModalVisible(false)
                }}
              >
                <SvgXml fill={Colors.smoky_grey} xml={closeIcon} width={20} height={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, ...Column.col_12, ...Row.row_12 }}>{children}</View>
        </View>
        <TouchableOpacity
          style={{ height: '100%' }}
          onPress={() => {
            changeModalVisible(false)
          }}
        />
      </View>
    </Modal>
  )
}

CustomTopSheet.defaultProps = {
  children: null,
  modalVisible: true,
  changeModalVisible: () => {},
  title: 'Ubah Pencarian',
}

CustomTopSheet.propTypes = {
  children: PropTypes.node,
  modalVisible: PropTypes.bool,
  changeModalVisible: PropTypes.func,
  title: PropTypes.string,
}
