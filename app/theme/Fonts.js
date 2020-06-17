import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Color from './Colors'

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
}
const screenHeight = 680
const fontFamily = 'Montserrat-Regular'
const fontBold = 'Montserrat-Bold'
const fontSemiBold = 'Montserrat-SemiBold'
const fontItalic = 'Montserrat-Italic'

export default StyleSheet.create({
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  normal: {
    fontSize: size.regular,
  },
  light: {
    fontWeight: '300',
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontFamily: fontBold,
  },
  semibold: {
    fontFamily: fontSemiBold,
  },
  italic: {
    fontFamily: fontItalic,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  linethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  text_white: {
    color: Color.white,
  },
  text_primary: {
    color: Color.primary,
  },
  text_success: {
    color: Color.success,
  },
  text_error: {
    color: Color.error,
  },
  text_info: {
    color: Color.info,
  },
  text_warning: {
    color: Color.warning,
  },
  text_red: {
    color: Color.red,
  },
  text_pink: {
    color: Color.pink,
  },
  text_purple: {
    color: Color.purple,
  },
  text_deep_purple: {
    color: Color.deep_orange,
  },
  text_indigo: {
    color: Color.indigo,
  },
  text_blue: {
    color: Color.blue,
  },
  text_light_blue: {
    color: Color.light_blue,
  },
  text_cyan: {
    color: Color.cyan,
  },
  text_teal: {
    color: Color.teal,
  },
  text_green: {
    color: Color.green,
  },
  text_light_green: {
    color: Color.light_green,
  },
  text_lime: {
    color: Color.lime,
  },
  text_yellow: {
    color: Color.yellow,
  },
  text_amber: {
    color: Color.amber,
  },
  text_orange: {
    color: Color.orange,
  },
  text_deep_orange: {
    color: Color.deep_orange,
  },
  text_brown: {
    color: Color.brown,
  },
  text_grey: {
    color: Color.grey,
  },
  text_smoky_grey: {
    color: Color.smoky_grey,
  },
  text_light_grey: {
    color: Color.light_grey,
  },
  text_dark_grey: {
    color: Color.dark_grey,
  },
  text_blue_grey: {
    color: Color.blue_grey,
  },
  text_black: {
    color: Color.black,
  },
  f_6: {
    fontFamily: fontFamily,
    fontSize: RFValue(6, screenHeight),
  },
  f_8: {
    fontFamily: fontFamily,
    fontSize: RFValue(8, screenHeight),
  },
  f_10: {
    fontFamily: fontFamily,
    fontSize: RFValue(10, screenHeight),
  },
  f_12: {
    fontFamily: fontFamily,
    fontSize: RFValue(12, screenHeight),
  },
  f_14: {
    fontFamily: fontFamily,
    fontSize: RFValue(14, screenHeight),
  },
  f_16: {
    fontFamily: fontFamily,
    fontSize: RFValue(16, screenHeight),
  },
  f_18: {
    fontFamily: fontFamily,
    fontSize: RFValue(18, screenHeight),
  },
  f_20: {
    fontFamily: fontFamily,
    fontSize: RFValue(20, screenHeight),
  },
  f_22: {
    fontFamily: fontFamily,
    fontSize: RFValue(22, screenHeight),
  },
  f_24: {
    fontFamily: fontFamily,
    fontSize: RFValue(24, screenHeight),
  },
  f_26: {
    fontFamily: fontFamily,
    fontSize: RFValue(26, screenHeight),
  },
  f_28: {
    fontFamily: fontFamily,
    fontSize: RFValue(28, screenHeight),
  },
  f_30: {
    fontFamily: fontFamily,
    fontSize: RFValue(30, screenHeight),
  },
  f_32: {
    fontFamily: fontFamily,
    fontSize: RFValue(32, screenHeight),
  },
  f_34: {
    fontFamily: fontFamily,
    fontSize: RFValue(34, screenHeight),
  },
  f_36: {
    fontFamily: fontFamily,
    fontSize: RFValue(36, screenHeight),
  },
})
