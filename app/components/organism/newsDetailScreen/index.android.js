import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, Text, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { WebView } from 'react-native-webview'

import DefaultHeader from 'components/molecules/defaultHeader'
import {
  CustomStyle,
  Alignment,
  Justify,
  Padding,
  Flex,
  Margin,
  Fonts,
  Background,
} from 'theme'

import backIcon from 'icons/ic-back.svg'

export default function NewsDetailScreen({ onIconLeftPress, title, image, content }) {
  const [isScroll, changeIsScroll] = useState(true)
  const [webheight, changeWebHeigth] = useState(600)
  const webViewScript = `
  setTimeout(function() { 
    window.postMessage(document.documentElement.scrollHeight); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures`

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
      }}
    >
      {isScroll && (
        <DefaultHeader
          isBlack
          border={true}
          title={`${title}`}
          iconLeft={backIcon}
          onIconLeftPress={onIconLeftPress}
        />
      )}
      <View style={{ flex: 9 }}>
        <ScrollView style={{ ...Background.bg_light_grey }}>
          <View style={{ ...Flex.f_1 }}>
            <Image
              source={{ uri: image }}
              imageStyle={{}}
              style={{
                height: 300,
                ...CustomStyle.w_100,
                resizeMode: 'cover',
                ...CustomStyle.opacity_1,
                ...Flex.f_1,
              }}
            />
            <LinearGradient
              colors={['#ffffff', '#000000']}
              style={{
                ...CustomStyle.opacity_03,
                ...CustomStyle.w_100,
                ...CustomStyle.position_absolute,
                height: 300,
                ...Flex.f_1,
                ...Flex.flex_column,
              }}
            />
            <View
              style={{
                ...CustomStyle.h_100,
                ...Alignment.align_end,
                ...Justify.justify_end,
                ...Flex.f_1,
                ...CustomStyle.position_absolute,
                ...Padding.ph_16,
                ...Padding.pv_16,
              }}
            >
              <Text style={{ ...Fonts.text_white, ...Fonts.f_12 }}>{title}</Text>
            </View>
          </View>
          <View
            style={{
              ...Background.bg_white,
              ...Margin.mt_4,
              ...Margin.mh_4,
              ...Flex.f_8,
            }}
          >
            <View style={{ ...CustomStyle.h_100, ...Margin.mh_16, ...Flex.f_1 }}>
              <WebView
                style={{ height: webheight }}
                automaticallyAdjustContentInsets={false}
                onMessage={(event) => {
                  changeWebHeigth(parseInt(event.nativeEvent.data))
                }}
                javaScriptEnabled={true}
                injectedJavaScript={webViewScript}
                domStorageEnabled={true}
                source={{ html: content }}
              />
            </View>
            {/* <View style={{ ...Flex.flex_row, ...Margin.mv_12, ...Margin.mh_16 }}>
              <Text>{content}</Text>
            </View> */}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

NewsDetailScreen.defaultProps = {
  onIconLeftPress: () => {},
  title: 'Order Detail',
  content: '',
  image: require('images/sample-category-1.png'),
  webheight: 100,
}

NewsDetailScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  webheight: PropTypes.number,
}
