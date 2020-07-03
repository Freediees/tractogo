import React from 'react'
import { View, Text, Image, Modal, ScrollView } from 'react-native'
import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import backIcon from 'icons/ic-back.svg'
import PropTypes from 'prop-types'
import SummaryCard from 'components/molecules/summaryCard'
import Spinner from 'react-native-loading-spinner-overlay'

import { Column, Margin, Fonts, Colors, Padding, Row, Alignment, ImageSize, Flex } from 'theme'
import { sub } from 'react-native-reanimated'

const KYCSummary = ({
  title,
  labelInfo,
  onBack,
  onNext,
  onChangeNoKTP,
  onChangeNamaKTP,
  onChangeNoSIM,
  onChangeNamaSIM,
  valueNoKTP,
  valueNoSIM,
  valueNamaKTP,
  valueNamaSIM,
  modalVisible,
  onShowModal,
  isLoading,
  labelTitleModal,
  labelInfoModal,
  submitToHome,
}) => {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Spinner visible={isLoading} textContent={'Loading...'} />
      <DefaultHeader border={true} title={title} iconLeft={backIcon} onIconLeftPress={onBack} />
      <View style={{ flex: 9 }}>
        <ScrollView bounces={false}>
          <View style={{ ...Padding.ph_16, alignItems: 'center', ...Margin.mv_16 }}>
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>Hampir Selesai</Text>
            <Image
              source={require('images/faceKYC-11.png')}
              style={{
                ...ImageSize.img_xs,
                backgroundColor: 'white',
                borderRadius: 50,
                ...Margin.mv_16,
              }}
            />
            <Text style={{ ...Fonts.f_10, textAlign: 'center' }}>{labelInfo}</Text>
          </View>

          <SummaryCard
            title={'eKTP / Paspor'}
            firstLabel={'nomor eKTP / Paspor'}
            firstValue={valueNoKTP}
            secondLabel={'Nama sesuai KTP'}
            secondValue={valueNamaKTP}
            firstInformation={'Mohon periksa kembali NIK anda diatas'}
            secondInformation={'Masukan nama sesuai KTP tanpa gelar'}
            onChangeFirst={onChangeNoKTP}
            onChangeSecond={onChangeNamaKTP}
          />
          <SummaryCard
            title={'SIM'}
            firstLabel={'Nomor SIM'}
            firstValue={valueNoSIM}
            secondLabel={'Nama sesuai SIM'}
            secondValue={valueNamaSIM}
            firstInformation={'Mohon periksa kembali no SIM anda diatas'}
            secondInformation={'Masukan nama sesuai SIM tanpa gelar'}
            onChangeFirst={onChangeNoSIM}
            onChangeSecond={onChangeNamaSIM}
          />
        </ScrollView>
      </View>
      <DefaultFooter buttonText={'Submit'} onButtonPress={onNext} />
      <Modal visible={modalVisible} animationType={'slide'}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <Image
              source={require('images/illustration-trac-11.png')}
              style={{ ...ImageSize.img_l, ...Margin.mv_16 }}
              resizeMode={'contain'}
            />
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold, ...Margin.mv_8, textAlign: 'center' }}>
              {labelTitleModal}
            </Text>
            <Text style={{ ...Fonts.f_10, ...Margin.mv_8, textAlign: 'center' }}>
              {labelInfoModal}
            </Text>
          </View>
          <DefaultFooter buttonText={'Submit'} onButtonPress={submitToHome.bind(this)} />
        </View>
      </Modal>
    </View>
  )
}

KYCSummary.defaultProps = {
  title: 'Verifikasi Identitas',
  labelInfo:
    'Scan wajah berhasil, silahkan isi data dibawah untuk segera menikmati fitur member Trac To Go',
  onBack: () => {},
  onNext: () => {},
  labelTitleModal: 'Yeay! Pendaftaran kamu telah terkirim',
  labelInfoModal: 'Kami sedang mengecek kelengkapan data yang telah kamu kirim, tunggu 1 x 24 Hour',
  submitToHome: () => {},
}

KYCSummary.propTypes = {
  title: PropTypes.string,
  labelInfo: PropTypes.string,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  labelTitleModal: PropTypes.string,
  labelInfoModal: PropTypes.string,
  submitToHome: PropTypes.func,
}
export default KYCSummary
