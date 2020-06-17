import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import CenterView from 'components/molecules/centerView'
import Svg, { Ellipse } from 'react-native-svg'
import { Fonts, ImageSize, Margin, Padding } from 'theme'
import styles from './styles'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function HeaderProfile({
  imageSource,
  fullName,
  email,
  phoneNo,
  editLabel,
  children,
  onEdit,
}) {
  return (
    <View style={styles.contentHeader}>
      <View style={styles.contentlayer}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={imageSource}
            style={{ ...ImageSize.img_xs, backgroundColor: Colors.white, borderRadius: ImageSize.img_xs.width }}
          />
          <View style={styles.contentProfile}>
            <View style={{ ...Margin.ml_20 }}>
              <Text style={{ ...Fonts.f_15, ...Fonts.bold, ...Fonts.text_black }}>{fullName}</Text>
              <Text style={{ ...Fonts.f_15, ...Fonts.text_dark_grey }}>{email}</Text>
              <Text style={{ ...Fonts.f_15, ...Fonts.text_dark_grey }}>{phoneNo}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={onEdit}>
                <Text style={{ ...Fonts.f_15, ...Fonts.text_amber, ...Margin.mr_16 }}>
                  {editLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>{children}</View>
      {
        //  <View style={styles.backElipse}>
        //     <View style={{ position: 'absolute', top: -50, left: 0 }}>
        //         <Svg height="200" width={responsiveWidth(120)}>
        //             <Ellipse cx={"50%"} cy={0} rx={300} ry={100} fill="red" />
        //         </Svg>
        //     </View>
        //     <View style={{ flex: 1}}>
        //         {children}
        //     </View>
        // </View>
      }
    </View>
  )
}

HeaderProfile.defaultProps = {
  imageSource: {},
  fullName: '',
  email: '@EMAIL',
  phoneNo: 'xxx-xxx',
  editLabel: '',
  children: null,
  onEdit: () => {},
}

HeaderProfile.propTypes = {
  imageSource: PropTypes.any,
  fullName: PropTypes.string,
  email: PropTypes.string,
  phoneNo: PropTypes.string,
  editLabel: PropTypes.string,
  onEdit: PropTypes.func,
  children: PropTypes.node,
}
