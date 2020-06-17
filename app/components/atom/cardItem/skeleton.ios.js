import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { SvgXml } from 'react-native-svg'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { Row, Border, Padding, Fonts, Colors, Margin } from 'theme'
import { LabelNumberFormat } from 'function/numberFormat'

import icSeat from 'icons/ic-chair.svg'
import icDriver from 'icons/ic-driver.svg'
import icSuitcase from 'icons/ic-koper.svg'
import icAssurance from 'icons/ic-asuransi.svg'
import icQuality from 'icons/ic-quality.svg'
import icTransmisi from 'icons/ic-transmisi.svg'

const borderStyle = {
  ...Border.border_rad_8,
}

const noBorderTopStyle = {
  borderBottomLeftRadius: 32,
  borderBottomRightRadius: 32,
}

export default function CardItemSkeleton({ style, noBorderTop }) {
  return (
    <View
      style={{
        ...Row.row_2_5,
        ...style,
      }}
    >
      {noBorderTop ? (
        <View
          style={{
            flex: 1,
            ...Padding.pb_8,
            flexDirection: 'row',
            width: '100%',
            backgroundColor: Colors.white,
            ...noBorderTopStyle,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'column', ...Padding.ph_16, ...Padding.pv_20 }}>
            <Text style={{ ...Fonts.f_12, ...Fonts.bold }}></Text>
            <View style={{ flexDirection: 'row', ...Margin.mt_12 }}>
              <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...Margin.mt_8,
                  }}
                >
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...Margin.mt_8,
                  }}
                >
                </View>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                
              </View>
            </View>
            <Text style={{ ...Margin.mt_16, ...Fonts.f_8, ...Fonts.bold }}></Text>
            <Text style={{ ...Margin.mt_8 }}>
            </Text>
            <Text style={{ ...Margin.mt_4 }}>
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', ...Padding.pt_20 }}
          >
            <View style={{ flex: 1, width: '100%', height: '100%' }}>
            </View>
            <View
              style={{
                flex: 1,
                ...Padding.ph_12,
                flexDirection: 'row',
                ...Margin.mt_8,
                alignItems: 'center',
              }}
            >
            </View>
          </View>
        </View>
      ) : (
        <TouchableHighlight
          underlayColor={Colors.light_grey}
          style={[
            {
              width: '96%',
              ...Margin.mh_8,
              flexDirection: 'row',
              backgroundColor: Colors.white,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 5,
            },
            noBorderTop ? noBorderTopStyle : borderStyle,
          ]}
        >
          <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
            <View style={{ flex: 1, flexDirection: 'column', ...Padding.ph_16, ...Padding.pv_20 }}>
              <Text style={{ ...Fonts.f_12, ...Fonts.bold }}></Text>
              <View style={{ flexDirection: 'row', ...Margin.mt_12 }}>
                <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                  <View
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                  >
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...Margin.mt_8,
                    }}>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...Margin.mt_8,
                    }}
                  >
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
                ...Padding.pt_20,
              }}
            >
              <View style={{ flex: 1, width: '100%', height: '100%' }}>
                <Image
                  source={uriImage ? { uri: uriImage } : itemImage}
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  ...Padding.ph_12,
                  flexDirection: 'row',
                  ...Margin.mt_8,
                  alignItems: 'center',
                }}
              >
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )}
    </View>
  )
}

CardItemSkeleton.defaultProps = {
  style: {},
  noBorderTop: false,
}

CardItemSkeleton.propTypes = {
  style: PropTypes.shape({}),
  noBorderTop: PropTypes.bool,
}
