import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import TextButton from 'components/atom/textButton'
import { Margin, Fonts } from 'theme'

export default function CarouselTitle({ children, onMorePress, title, more, style }) {
  return (
    <View
      style={{
        flex: 12,
        paddingHorizontal: '5%',
        width: '95%',
        flexDirection: 'row',
        ...Margin.mb_8,
        ...style,
        height: null,
      }}
    >
      <View style={{ flex: 6, alignItems: 'flex-start' }}>
        <Text
          style={{
            flex: 6,
            textAlign: 'left',
            ...Fonts.f_14,
            ...Fonts.text_blue,
            ...Fonts.semibold,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ flex: 6 }}>
        <TextButton
          style={{ alignSelf: 'flex-end', textAlign: 'right' }}
          onPress={onMorePress}
          text={more}
        />
      </View>
    </View>
  )
}

CarouselTitle.defaultProps = {
  children: null,
  onMorePress: null,
  more: null,
  title: null,
}

CarouselTitle.propTypes = {
  children: PropTypes.node,
  onMorePress: PropTypes.func,
  more: PropTypes.string,
  title: PropTypes.string,
}
