import React from 'react'
import { View, Text, Image } from 'react-native'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import backIcon from 'icons/ic-back.svg'
import PropTypes from 'prop-types'
import SummaryCard from 'components/molecules/summaryCard'

import { Column, Margin, Fonts, Colors, Padding, Row, Alignment, ImageSize, Flex } from 'theme'

const KYCSummary = ({ title, labelInfo, onBack, onNext }) => {
  return (
    <View style={{ flex: 1 }}>
      <DefaultHeader border={true} title={title} iconLeft={backIcon} onIconLeftPress={onBack} />
      <View style={{ flex: 9 }}>
        <View style={{ ...Padding.ph_16, alignItems: 'center', ...Margin.mv_16 }}>
          <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>Hampir Selesai</Text>
          <Image
            source={require('images/TOM.png')}
            style={{
              ...ImageSize.img_xs,
              backgroundColor: 'white',
              borderRadius: 50,
              ...Margin.mv_16,
            }}
          />
          <Text style={{ ...Fonts.f_10, textAlign: 'center' }}>{labelInfo}</Text>
        </View>

        <SummaryCard />
      </View>

      <DefaultFooter buttonText={'Submit'} onButtonPress={onNext} />
    </View>
  )
}

KYCSummary.defaultProps = {
  title: 'Verifikasi Identitas',
  labelInfo:
    'Scan wajah berhasil, silahkan isi data dibawah untuk segera menikmati fitur member Trac To Go',
  onBack: () => {},
  onNext: () => {},
}

KYCSummary.propTypes = {
  title: PropTypes.string,
  labelInfo: PropTypes.string,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
}
export default KYCSummary
