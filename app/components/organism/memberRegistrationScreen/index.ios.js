import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, ScrollView, Text } from 'react-native'
import Separator from 'components/atom/separator'
import DefaultBlueHeader from 'components/molecules/defaultBlueHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import BorderlessDefaultCardViewStatic from 'components/molecules/borderlessDefaultCardViewStatic'

import { Column, Margin, Fonts } from 'theme'

import closeIcon from 'icons/ic-close.svg'

export default function MemberRegistrationScreen({
  onIconLeftPress,
  onButtonPress,
  title,
  instructionTitle1,
  instructionLabel1,
  instructionTitle2,
  instructionLabel2,
  buttonLabel,
  subtitle,
}) {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <DefaultBlueHeader title={title} iconLeft={closeIcon} onIconLeftPress={onIconLeftPress} />
      <View style={{ flex: 9 }}>
        <ScrollView style={{ ...Column.col_12, flexDirection: 'column' }}>
          <Image
            source={require('images/illustration-trac-04.png')}
            style={{ ...Margin.mb_20, resizeMode: 'stretch', width: '100%', height: '110%' }}
          />
          <View>
            <Text
              style={{
                ...Fonts.f_14,
                ...Fonts.semibold,
                textAlign: 'center',
                paddingHorizontal: '15%',
              }}
            >
              {subtitle}
            </Text>
          </View>
          <View style={{ flex: 1, padding: '10%' }}>
            <BorderlessDefaultCardViewStatic
              icon={require('images/banefit-member-09.png')}
              title={instructionTitle1}
              description={instructionLabel1}
            />
            <View style={{ justifyContent: 'center', padding: '5%', width: '100%' }}>
              <Separator />
            </View>
            <BorderlessDefaultCardViewStatic
              icon={require('images/banefit-member-10.png')}
              title={instructionTitle2}
              description={instructionLabel2}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 2 }}>
        <DefaultFooter buttonText={buttonLabel} onButtonPress={onButtonPress} />
      </View>
    </View>
  )
}

MemberRegistrationScreen.defaultProps = {
  onIconLeftPress: null,
  onButtonPress: null,
  title: 'Daftar Member',
  instructionTitle1: 'Car Rental Self Drive',
  instructionLabel1: 'Dengan member, anda dapat mengakses layanan Self Drive',
  instructionTitle2: 'Discount Member',
  instructionLabel2: 'Nikmati Discont khusus untuk kamu yang sudah terdaftar member',
  buttonLabel: 'Daftar',
  subtitle: 'Daftar Member Trac To Go Sekarang Juga!',
}

MemberRegistrationScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  onButtonPress: PropTypes.func,
  title: PropTypes.string,
  instructionTitle1: PropTypes.string,
  instructionLabel1: PropTypes.string,
  instructionTitle2: PropTypes.string,
  instructionLabel2: PropTypes.string,
  buttonLabel: PropTypes.string,
  subtitle: PropTypes.string,
}
