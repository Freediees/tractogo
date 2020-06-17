import React from 'react'
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { SvgXml } from 'react-native-svg'
import { Fonts, Margin, Padding, Border, Row, Column, Colors } from 'theme'
import PropTypes from 'prop-types'

import CustomAccordionCard from 'components/atom/customAccordionCard'

import closeIcon from 'icons/ic-close.svg'

export default function ModalTermsAndCondition({
  children,
  title,
  modalVisible,
  changeModalVisible,
  items,
}) {
  return (
    <Modal
      animationType="slide" // fade
      visible={modalVisible}
    >
      <View>
        <View
          style={{
            backgroundColor: '#fff',
            backgroundColor: Colors.white,
            paddingTop: getStatusBarHeight(true),
            borderBottomWidth: 1,
            borderBottomColor: Colors.light_grey,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              ...Padding.ph_20,
              ...Padding.pv_20,
            }}
          >
            <View style={{ flex: 9, flexDirection: 'row' }}>
              {title && <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{title}</Text>}
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => {
                  changeModalVisible(false)
                }}
              >
                <SvgXml xml={closeIcon} fill={'black'} width={16} height={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={{ ...Padding.ph_20, ...Margin.mt_20 }}>
          {items &&
            items.map((v, i) => {
              return (
                <View style={{ ...Margin.mv_8, ...Padding.ph_8 }}>
                  <CustomAccordionCard title={v.title}>
                    <View style={{ marginTop: 16 }}>
                      <Text style={{ ...Fonts.f_10 }}>{v.description}</Text>
                    </View>
                  </CustomAccordionCard>
                </View>
              )
            })}
        </ScrollView>
      </View>
    </Modal>
  )
}

ModalTermsAndCondition.defaultProps = {
  children: null,
  modalVisible: true,
  changeModalVisible: () => {},
  title: 'Syarat dan Ketentuan Sewa',
  items: [
    {
      title: 'T & C',
      description:
        'A. Pembayaran biaya perbaikan/penggantian , yang merupakan beban biaya resiko sendiri (Deductible/Own Risk Charges) sejumlah Rp 330.000,- (tiga ratus tiga puluh ribu rupiah) per kejadian (termasuk PPN 10%).\n\n' +
        'B. Pertanggungan Pihak Ketiga (Third Party Liabilities) yang ditanggung oleh TRAC maksimum adalah sebesar Rp 50.000.000,- (lima puluh juta rupiah) untuk setiap kejadian, jumlah lebih dari itu akan ditanggung oleh CUSTOMER.\n\n' +
        'C. Passenger Legal Liability (PLL) merupakan penggantian klaim (yang disebabkan oleh kelalaian dari pihak driver TRAC), hanya terbatas bagi harta benda penumpang, kecuali uang. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'D. Personal Accident (PA) merupakan penggantian ganti rugi kepada pihak penyewa, jika terjadi cidera badan dan kematian yang diakibatkan kecelakaan. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'E. Total Lost, asuransi untuk kehilangan unit. PENYEWA juga wajib menanggung Biaya Resiko Kehilangan (Total Lost Risk) sebesar Rp 6.000.000,- (enam juta rupiah) bila Mobil tersebut hilang.',
    },
    {
      title: 'Asuransi',
      description:
        'A. Pembayaran biaya perbaikan/penggantian , yang merupakan beban biaya resiko sendiri (Deductible/Own Risk Charges) sejumlah Rp 330.000,- (tiga ratus tiga puluh ribu rupiah) per kejadian (termasuk PPN 10%).\n\n' +
        'B. Pertanggungan Pihak Ketiga (Third Party Liabilities) yang ditanggung oleh TRAC maksimum adalah sebesar Rp 50.000.000,- (lima puluh juta rupiah) untuk setiap kejadian, jumlah lebih dari itu akan ditanggung oleh CUSTOMER.\n\n' +
        'C. Passenger Legal Liability (PLL) merupakan penggantian klaim (yang disebabkan oleh kelalaian dari pihak driver TRAC), hanya terbatas bagi harta benda penumpang, kecuali uang. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'D. Personal Accident (PA) merupakan penggantian ganti rugi kepada pihak penyewa, jika terjadi cidera badan dan kematian yang diakibatkan kecelakaan. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
        'E. Total Lost, asuransi untuk kehilangan unit. PENYEWA juga wajib menanggung Biaya Resiko Kehilangan (Total Lost Risk) sebesar Rp 6.000.000,- (enam juta rupiah) bila Mobil tersebut hilang.',
    },
  ],
}

ModalTermsAndCondition.propTypes = {
  children: PropTypes.node,
  modalVisible: PropTypes.bool,
  changeModalVisible: PropTypes.func,
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
}
