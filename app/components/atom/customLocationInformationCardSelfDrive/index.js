import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { Column, Padding, Fonts, Colors, Margin } from 'theme'
import ToggleSwitch from 'toggle-switch-react-native'

import Separator from 'components/atom/separator'

import iconCTA from 'icons/ic-tinyCTA.svg'

export default function CustomLocationInformationCardSelfDrive({
  onPress,
  icon,
  title,
  description,
  superscript,
  isToggle,
  toggle,
  changeToggle,
  toggleLabel,
  style,
}) {
  return (
    <TouchableHighlight
      underlayColor={Colors.underlayGrey}
      style={{
        ...style,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: 'column',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            ...Padding.ph_20,
            ...Padding.pv_20,
          }}
        >
          <View
            style={{
              height: '100%',
              flex: 2,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Image source={icon} width={24} height={24} />
          </View>
          <View style={{ flex: 8, flexDirection: 'column' }}>
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Fonts.text_black }}>{title}</Text>
            <Text style={{ ...Fonts.f_10, ...Fonts.text_black, ...Margin.mt_4 }}>
              {description}
              {` `}
              <Text
                style={{
                  ...Fonts.f_14,
                  ...Fonts.text_red,
                  lineHeight: 22,
                  textAlignVertical: 'top',
                }}
              >
                {superscript}
              </Text>
            </Text>
          </View>
          <View
            style={{
              height: '100%',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgXml xml={iconCTA} height={40} width={40} />
          </View>
        </View>
        {isToggle && (
          <Fragment>
            <Separator style={{ ...Margin.mv_8, ...Margin.mh_20, padding: 0 }} />
            <View
              style={{
                flexDirection: 'row',
                ...Margin.mv_8,
                ...Margin.mh_20,  
              }}
            >
              <View style={{ flex: 9 }}>
                <Text style={{ ...Fonts.f_10 }}>{toggleLabel}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <ToggleSwitch
                  isOn={toggle}
                  onColor={Colors.blue}
                  offColor={Colors.smoky_grey}
                  size="small"
                  onToggle={(isOn) => {
                    if (isOn === true) {
                      changeToggle(true)
                    } else {
                      changeToggle(false)
                    }
                  }}
                />
              </View>
            </View>
          </Fragment>
        )}
      </View>
    </TouchableHighlight>
  )
}

CustomLocationInformationCardSelfDrive.defaultProps = {
  children: null,
  onPress: () => {},
  icon: require('icons/icon_pick.png'),
  isToggle: false,
  toggle: false,
  changeToggle: () => {},
  toggleLabel: 'Sama Dengan Penjemputan Mobil',
  title: 'Lokasi Penjemputan',
  description: 'Masukkan detail lokasi penjemputan',
  superscript: '*',
  style: {},
}

CustomLocationInformationCardSelfDrive.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  isToggle: PropTypes.bool,
  toggle: PropTypes.bool,
  changeToggle: PropTypes.string,
  toggleLabel: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  superscript: PropTypes.string,
  style: PropTypes.shape({}),
}
