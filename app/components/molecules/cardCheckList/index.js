import React from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import Styles from './styles'
import { SvgXml } from 'react-native-svg'
import Ic_Seat from 'icons/ic-chair.svg'
import Ic_Cover from 'icons/ic-koper.svg'
import CheckBox from 'components/atom/checkBox'
import { responsiveWidth as wp } from 'react-native-responsive-dimensions'
import { Margin, Fonts, Padding, Row } from 'theme'
import { ScrollView } from 'react-native-gesture-handler'

export default class CardOrderDetail extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      brand,
      seat,
      cover,
      transmition,
      driver,
      carRentalLabel,
      rentalDriverLabel,
      placeLabel,
      dateLabel,
      basePriceLabel,
      currId,
      amount,
      daylabel,
      sumAmount,
      sumLabel,
      onCheck,
      imageSource,
    } = this.props

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          ...Row.row_12,
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
        }}>
        <ScrollView style={{
          width: '100%',  
          ...Padding.ph_12,
        }}>
          <View style={Styles.Container}>
            <View style={{ padding: '5%' }}>
              <CheckBox
                checked={true}
                onCheck={onCheck}
                value="1234 👍 💯"
                // label='tester coy '
                // color='#e67e22'
                // disabled={true}
              >
                <View>
                  <Text style={Fonts.f_14}>
                    {carRentalLabel} - {rentalDriverLabel}
                  </Text>
                  <Text style={Fonts.f_10}>
                    {placeLabel} | {dateLabel}
                  </Text>
                </View>
              </CheckBox>
            </View>
            <View
              style={{
                ...Margin.ml_12,
                ...Margin.mr_12,
                borderBottomWidth: 2,
                borderBottomColor: '#ecf0f1',
              }}
            />

            <View style={Styles.Content}>
              <View style={{ flex: 1, padding: '5%', paddingRight: 1 }}>
                <Text style={{ ...Fonts.f_14 }}>{brand}</Text>

                <View style={{ flexDirection: 'row', ...Margin.mt_12 }}>
                  <View style={{ flex: 1 }}>
                    <View style={Styles.list}>
                      <SvgXml xml={Ic_Seat} width={wp(3)} height={wp(3)} />
                      {/* <Image source={require('assets/Images/seat_icon.png')} /> */}
                      <Text style={{ ...Styles.label }}>{seat}</Text>
                    </View>

                    <View style={Styles.list}>
                      <SvgXml xml={Ic_Cover} width={wp(3)} height={wp(3)} />
                      {/* <Image source={require('assets/Images/cover_icon.png')} /> */}
                      <Text style={Styles.label}>{cover}</Text>
                    </View>
                  </View>

                  <View style={{ ...Margin.ml_8, flex: 1 }}>
                    <View style={Styles.list}>
                      {/* <SvgXml xml={Ic_Cover} width={wp(3)} height={wp(3)} /> */}
                      <Image source={require('images/transmition_icon.png')} />
                      <Text style={Styles.label}>{transmition}</Text>
                    </View>
                  </View>
                </View>

                <View style={{ ...Margin.mt_12 }}>
                  <Text style={Styles.priceLabel}>{basePriceLabel}</Text>
                  <Text style={Styles.price}>
                    {currId} {amount}
                    <Text style={Styles.dayLabel}> /{daylabel}</Text>
                  </Text>
                  <Text style={Styles.total}>
                    {currId} {sumAmount}
                    <Text> {sumLabel}</Text>
                  </Text>
                </View>
              </View>

              <View style={{ flex: 1.3, overflow: 'hidden', justifyContent: 'center' }}>
                <Image source={imageSource} style={{ width: 200, height: 200, resizeMode: 'cover' }} />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

CardOrderDetail.defaultProps = {
  brand: 'TOYOTA NEW INNOVA',
  seat: '5 Seat',
  cover: '3 Suitcase',
  transmition: 'Manual',
  driver: 'Tanpa Supir',
  carRentalLabel: 'Sewa Mobil',
  rentalDriverLabel: 'Tanpa Supir',
  placeLabel: 'Bandung',
  dateLabel: '26 - 27 Januari 2020',
  basePriceLabel: 'Harga dasar',
  currId: 'Rp.',
  amount: '350.000',
  daylabel: 'hari',
  sumAmount: '350.000',
  sumLabel: 'Total',
  imageSource: require('images/newinnova_12.png'),
  onCheck: (a, b, c) => alert('checked : ' + a.toString() + ', label :' + c + ', value_id :' + b),
}

CardOrderDetail.propTypes = {
  brand: PropTypes.string,
  seat: PropTypes.string,
  cover: PropTypes.string,
  transmition: PropTypes.string,
  driver: PropTypes.string,
  carRentalLabel: PropTypes.string,
  rentalDriverLabel: PropTypes.string,
  placeLabel: PropTypes.string,
  dateLabel: PropTypes.string,
  basePriceLabel: PropTypes.string,
  currId: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  daylabel: PropTypes.string,
  sumAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sumLabel: PropTypes.string,
  imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  onCheck: PropTypes.func,
}
