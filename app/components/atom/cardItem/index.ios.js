import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { SvgXml } from 'react-native-svg'
import { TouchableHighlight, Text, View, Image } from 'react-native'
import { Border, Padding, Fonts, Colors, Margin, Background } from 'theme'
import { LabelNumberFormat } from 'function/numberFormat'
import CheckBox from 'components/atom/checkBox'
import Separator from 'components/atom/separator'
import CardHeaderCart from 'components/atom/cardHeaderCart'

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

export default function CardItem({
  onPress,
  cardTitle,
  carRentalLabel,
  rentalDriverLabel,
  placeLabel,
  dateLabel,
  seatAmount,
  seatLabel,
  driverLabel,
  suitcaseAmount,
  suitcaseLabel,
  basePriceLabel,
  priceAmount,
  priceUnit,
  itemImage,
  uriImage,
  style,
  isAssurance,
  assuranceLabel,
  quality,
  noBorderTop,
  transmision,
  isDriver,
  isCart,
  discountPercent,
  discountedPrice,
  selected,
  changeSelected,
}) {
  const [selectedItem, changeChecked] = useState(true)

  return (
    <View
      style={{
        ...Margin.mt_20,
        ...style,
      }}
    >
      {noBorderTop ? (
        <View
          style={{
            flex: 1,
            ...Padding.pb_8,
            flexDirection: 'column',
            width: '100%',
            backgroundColor: Colors.white,
            ...noBorderTopStyle,
          }}
        >
          {isCart && (
            <View style={{ flexDirection: 'column', width: '100%' }}>
              <View>
                <CheckBox
                  checked={selected}
                  onCheck={(isCheck) => {
                    changeSelected(isCheck)
                  }}
                  renderHeader={() => {
                    return (
                      <CardHeaderCart
                        carRentalLabel={carRentalLabel}
                        rentalDriverLabel={rentalDriverLabel}
                        placeLabel={placeLabel}
                        dateLabel={dateLabel}
                      />
                    )
                  }}
                />
                <Separator />
              </View>
            </View>
          )}
          <View
            style={{
              flex: 1,
              ...Padding.pb_8,
              flexDirection: 'column',
              width: '100%',
              backgroundColor: Colors.white,
              ...noBorderTopStyle,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}
            >
              <View
                style={{ flex: 1, flexDirection: 'column', ...Padding.ph_16, ...Padding.pv_20 }}
              >
                <Text style={{ ...Fonts.f_12, ...Fonts.bold }}>{cardTitle}</Text>
                <View style={{ flexDirection: 'row', ...Margin.mt_12 }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SvgXml xml={icSeat} width={12} height={12} />
                      <Text
                        style={{ ...Fonts.f_8, ...Margin.ml_4 }}
                      >{`${seatAmount} ${seatLabel}`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...Margin.mt_8,
                      }}
                    >
                      <SvgXml xml={icSuitcase} width={12} height={12} />
                      <Text
                        style={{ ...Fonts.f_8, ...Margin.ml_4 }}
                      >{`${suitcaseAmount} ${suitcaseLabel}`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...Margin.mt_8,
                      }}
                    >
                      <SvgXml xml={icTransmisi} width={12} height={12} />
                      <Text style={{ ...Fonts.f_8, ...Margin.ml_4 }}>{`${transmision}`}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                    {isDriver && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <SvgXml xml={icDriver} width={12} height={12} />
                        <Text style={{ ...Fonts.f_8, ...Margin.ml_4 }}>{`${driverLabel}`}</Text>
                      </View>
                    )}
                    {isAssurance && (
                      <View
                        style={[
                          {
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                          },
                          isDriver ? { ...Margin.mt_8 } : { marginTop: 0 },
                        ]}
                      >
                        <SvgXml xml={icAssurance} width={12} height={12} />
                        <Text style={{ ...Fonts.f_8, ...Margin.ml_4 }}>{`${assuranceLabel}`}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text style={{ ...Margin.mt_16, ...Fonts.f_8, ...Fonts.bold }}>
                  {isCart ? 'Total' : basePriceLabel}
                </Text>
                <View style={{ ...Margin.mt_8, flexDirection: 'row', alignItems: 'center' }}>
                  {/* {discountPercent && (
                    <Fragment>
                      <Text
                        style={{
                          ...Margin.mr_8,
                          ...Fonts.f_8,
                          ...Fonts.text_green,
                          ...Background.bg_lime_green,
                        }}
                      >{`${discountPercent} %`}</Text>
                    </Fragment>
                  )} */}
                  {discountedPrice && (
                    <LabelNumberFormat
                      number={priceAmount}
                      style={{
                        ...Fonts.f_8,
                        ...Fonts.text_smoky_grey,
                        ...Fonts.linethrough,
                      }}
                    />
                  )}
                </View>
                <Text style={{ ...Margin.mt_4 }}>
                  <LabelNumberFormat
                    number={discountedPrice || priceAmount}
                    style={{ ...Fonts.f_12, ...Fonts.text_amber }}
                  />
                  {!isCart && 
                    <Text style={{ ...Margin.ml_8, ...Fonts.f_12, ...Fonts.text_smoky_grey }}>
                      {priceUnit}
                    </Text>
                  }
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <View style={{ flex: 5, width: '100%', height: '100%', ...Padding.pt_20 }}>
                  <Image
                    source={uriImage ? { uri: uriImage } : itemImage}
                    style={{ width: '100%', height: '80%', resizeMode: 'cover' }}
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
                  {quality && (
                    <Fragment>
                      <SvgXml xml={icQuality} height={16} width={16} />
                      <Text style={{ ...Margin.ml_8, ...Fonts.f_8 }}>{quality}</Text>
                    </Fragment>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <TouchableHighlight
          underlayColor={Colors.light_grey}
          style={[
            {
              width: '100%',
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
          onPress={onPress}
        >
          <View style={{ flexDirection: 'column', width: '100%' }}>
            {isCart && (
              <View style={{ flexDirection: 'column', width: '100%' }}>
                <View>
                  <CheckBox
                    checked={selected}
                    onCheck={(isCheck) => {
                      console.log('testt123')
                      console.log(isCheck)
                      changeSelected(isCheck)
                    }}
                    renderHeader={() => {
                      return (
                        <CardHeaderCart
                          carRentalLabel={carRentalLabel}
                          rentalDriverLabel={rentalDriverLabel}
                          placeLabel={placeLabel}
                          dateLabel={dateLabel}
                        />
                      )
                    }}
                  />
                  <Separator />
                </View>
              </View>
            )}
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View
                style={{ flex: 1, flexDirection: 'column', ...Padding.ph_16, ...Padding.pv_16 }}
              >
                <Text style={{ ...Fonts.f_12, ...Fonts.bold }}>{cardTitle}</Text>
                <View style={{ flexDirection: 'row', ...Margin.mt_12 }}>
                  <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SvgXml xml={icSeat} width={12} height={12} />
                      <Text
                        style={{ ...Fonts.f_8, ...Margin.ml_4 }}
                      >{`${seatAmount} ${seatLabel}`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...Margin.mt_8,
                      }}
                    >
                      <SvgXml xml={icSuitcase} width={12} height={12} />
                      <Text
                        style={{ ...Fonts.f_8, ...Margin.ml_4 }}
                      >{`${suitcaseAmount} ${suitcaseLabel}`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...Margin.mt_8,
                      }}
                    >
                      <SvgXml xml={icTransmisi} width={12} height={12} />
                      <Text style={{ ...Fonts.f_8, ...Margin.ml_4 }}>{`${transmision}`}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'column' }}>
                    {isDriver && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <SvgXml xml={icDriver} width={12} height={12} />
                        <Text style={{ ...Fonts.f_8, ...Margin.ml_4 }}>{`${driverLabel}`}</Text>
                      </View>
                    )}
                    {isAssurance && (
                      <View
                        style={[
                          {
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                          },
                          isDriver ? { ...Margin.mt_8 } : { marginTop: 0 },
                        ]}
                      >
                        <SvgXml xml={icAssurance} width={12} height={12} />
                        <Text style={{ ...Fonts.f_8, ...Margin.ml_4 }}>{`${assuranceLabel}`}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <Text style={{ ...Margin.mt_16, ...Fonts.f_8, ...Fonts.bold }}>
                  {isCart ? 'Total' : basePriceLabel}
                </Text>
                <View style={{ ...Margin.mt_8, flexDirection: 'row', alignItems: 'center' }}>
                  {discountPercent && discountPercent !== '0' && (
                    <Fragment>
                      <Text
                        style={{
                          ...Margin.mr_8,
                          ...Fonts.f_8,
                          ...Fonts.text_green,
                          ...Background.bg_lime_green,
                        }}
                      >{`${discountPercent} %`}</Text>
                    </Fragment>
                  )}
                  {discountedPrice && (
                    <LabelNumberFormat
                      number={priceAmount}
                      style={{
                        ...Fonts.f_8,
                        ...Fonts.text_smoky_grey,
                        ...Fonts.linethrough,
                      }}
                    />
                  )}
                </View>
                <Text style={{ ...Margin.mt_4 }}>
                  <LabelNumberFormat
                    number={discountedPrice || priceAmount}
                    style={{ ...Fonts.f_12, ...Fonts.text_amber }}
                  />
                  {!isCart && 
                    <Text style={{ ...Margin.ml_8, ...Fonts.f_12, ...Fonts.text_smoky_grey }}>
                      {priceUnit}
                    </Text>
                  }
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  ...Padding.pt_20,
                }}
              >
                <View style={{ flex: 2, width: '100%', height: '100%' }}>
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
                  {quality && (
                    <Fragment>
                      <SvgXml xml={icQuality} height={16} width={16} />
                      <Text style={{ ...Margin.ml_8, ...Fonts.f_8 }}>{quality}</Text>
                    </Fragment>
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )}
    </View>
  )
}

CardItem.defaultProps = {
  onCheck: () => {},
  onPress: () => {},
  cardTitle: 'TOYOTA ALPHARD',
  carRentalLabel: 'Car Rental',
  rentalDriverLabel: 'Tanpa Supir',
  placeLabel: 'Bandung',
  dateLabel: '26 - 27 Januari 2020',
  seatAmount: 5,
  seatLabel: 'Seat',
  driverLabel: 'Driver',
  suitcaseAmount: 3,
  suitcaseLabel: 'Suitcase',
  basePriceLabel: 'Basic Price',
  priceAmount: 1000000,
  priceUnit: ' / Hari',
  totalLabel: ' Total',
  itemImage: require('images/alphard-11.png'),
  uriImage: null,
  quality: 'vehicle age < 4 years',
  isAssurance: true,
  assuranceLabel: 'Vehicle Insurance',
  style: {},
  noBorderTop: false,
  transmision: 'Manual',
  isDriver: true,
  isCart: false,
  selectedItem: true,
  number: 1,
  discountPercent: 25,
  discountedPrice: 500000,
  selected: false,
  changeSelected: () => {},
}

CardItem.propTypes = {
  onCheck: PropTypes.func,
  onPress: PropTypes.func,
  cardTitle: PropTypes.string,
  carRentalLabel: PropTypes.string,
  rentalDriverLabel: PropTypes.string,
  placeLabel: PropTypes.string,
  dateLabel: PropTypes.string,
  seatAmount: PropTypes.number,
  seatLabel: PropTypes.string,
  driverLabel: PropTypes.string,
  suitcaseAmount: PropTypes.number,
  suitcaseLabel: PropTypes.string,
  basePriceLabel: PropTypes.string,
  priceAmount: PropTypes.number,
  priceUnit: PropTypes.string,
  totalLabel: PropTypes.string,
  itemImage: PropTypes.string,
  uriImage: PropTypes.string,
  quality: PropTypes.string,
  isAssurance: PropTypes.bool,
  assuranceLabel: PropTypes.string,
  style: PropTypes.shape({}),
  noBorderTop: PropTypes.bool,
  transmision: PropTypes.string,
  isDriver: PropTypes.bool,
  isCart: PropTypes.bool,
  selectedItem: PropTypes.bool,
  duration: PropTypes.number,
  discountPercent: PropTypes.number,
  discountedPrice: PropTypes.number,
  selected: PropTypes.bool,
  changeSelected: PropTypes.func,
}
