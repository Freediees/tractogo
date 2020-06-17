import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button, TouchableOpacity } from 'react-native'
import TextButton from 'components/atom/textButton'
import { Margin, Fonts, Padding } from 'theme'

import RBSheet from 'react-native-raw-bottom-sheet'
import IconButton from 'components/atom/iconButton'
import Separator from 'components/atom/separator'

import iconClose from 'icons/ic-close.svg'

export default function CustomBottomSheet({
  children,
  bsHeight,
  style,
  title,
  subtitle,
  topRightComponent,
  botSheetRef,
}) {
  return (
    <View>
      <RBSheet
        ref={botSheetRef}
        closeOnPressMask={true}
        openDuration={250}
        closeDuration={250}
        animationType={'slide'}
        customStyles={{
          container: {
            borderRadius: 20,
            height: bsHeight || '50%',
          },
        }}
      >
        <View>
          <View
            style={{ flexDirection: 'row', ...Padding.pt_16, ...Padding.ph_16, ...Margin.mb_20 }}
          >
            <View style={{ flex: 2 }}>
              <Text style={{ ...Fonts.f_14, ...Fonts.semibold }}>{title}</Text>
              {subtitle && <Text style={{ ...Fonts.f_12, ...Fonts.text_grey }}>{subtitle}</Text>}
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>{topRightComponent()}</View>
          </View>
          <Separator />
          <View style={{ ...Padding.pb_20 }}>{children}</View>
        </View>
      </RBSheet>
    </View>
  )
}

CustomBottomSheet.defaultProps = {
  children: null,
  title: null,
  subtitle: null,
  botSheetRef: null,
  bsHeight: null,
  topRightComponent: () => {},
}

CustomBottomSheet.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  botSheetRef: PropTypes.func,
  bsHeight: PropTypes.string,
  topRightComponent: PropTypes.func,
}
