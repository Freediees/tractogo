import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import Timeline from 'components/molecules/timelineMolecule'
import { Fonts, ImageSize, Margin, Padding, Flex, Colors } from 'theme'
import Column from '../../../theme/Column'
import backIcon from 'icons/ic-back.svg'

export default function VerifikasiKYC({
  title,
  footerLabel,
  onFooterPress,
  informationLabel,
  timelineLabel,
  timelineStep,
  onBack,
  statusKYC,
}) {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <DefaultHeader border={false} title={title} iconLeft={backIcon} onIconLeftPress={onBack} />

      <View style={{ ...Flex.flex_9 }}>
        <View
          style={{
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            resizeMode={'contain'}
            source={require('images/daftar-member-05.png')}
          />
        </View>
        <View style={{ flex: 3, alignItems: 'center' }}>
          <Text
            style={{
              ...Fonts.f12,
              textAlign: 'center',
              ...Padding.ph_16,
              ...Padding.pv_16,
              width: '70%',
              ...Fonts.semibold,
            }}
          >
            {informationLabel}
          </Text>
          {statusKYC == 0 ? (
            <View
              style={{
                ...Padding.pv_16,
                ...Margin.mt_16,
                flex: 1,
                ...Padding.ph_16,
                ...Column.col_9,
                alignSelf: 'center',
              }}
            >
              <Timeline
                direction={'vertical'}
                stepCount={timelineStep}
                labels={timelineLabel}
                defaultColor={Colors.blue}
                failed={false}
                labelAlign={'flex-start'}
                failed={true}
              />
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>

      <DefaultFooter buttonText={footerLabel} onButtonPress={onFooterPress} />
    </View>
  )
}

VerifikasiKYC.defaultProps = {
  title: 'Data Verification',
  footerLabel: 'Back',
  onFooterPress: () => {},
  informationLabel: 'Our system is cheking the data that you have sent',
  timelineLabel: ['Verifikasi SIM', 'Verifikasi KTP', 'Verifikasi Wajah', 'Member TRAC To Go'],
  timelineStep: 4,
  onBack: () => {},
  statusKYC: null,
}

VerifikasiKYC.propTypes = {
  title: PropTypes.string,
  footerLabel: PropTypes.string,
  onFooterPress: PropTypes.func,
  informationLabel: PropTypes.string,
  timelineLabel: PropTypes.array,
  stepCount: PropTypes.number,
  onBack: PropTypes.func,
  statusKYC: PropTypes.number,
}
