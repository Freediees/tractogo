import React from 'react'
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { SvgXml } from 'react-native-svg'
import { Fonts, Margin, Padding, Background, Row, Column, Colors } from 'theme'
import PropTypes from 'prop-types'
import CardSimpleOrder from 'components/atom/cardSimpleOrder'
import SecondaryButton from 'components/atom/secondaryButton'
import PrimaryButton from 'components/atom/primaryButton'
import closeIcon from 'icons/ic-close.svg'

export default function ModalOrderCancelConfirm({
  children,
  title,
  modalVisible,
  changeModalVisible,
  item,
  serviceLabel,
  refundLabel,
  refundDetailLabel,
  confirmLabel,
  cancelLabel,
  okLabel,
  onCancelPress,
  onOkPress,
  styleOrder,
  styleMultiOrder,
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
                <SvgXml xml={closeIcon} width={16} height={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={{ ...Padding.ph_20, ...Margin.mt_20 }}>
          <View
            style={{
              ...Background.bg_white,
            }}
          >
            <Text style={{ ...Fonts.text_dark_grey, ...Fonts.bold, ...Fonts.f_10 }}>
              {serviceLabel}
            </Text>
            <CardSimpleOrder
              onPress={item.onPressDetail}
              cardTitle={item.cardTitle}
              style={styleOrder}
              city={item.placeLabel}
              startDate={item.startDate}
              endDate={item.endDate}
              rentHour={item.rentHour}
              rentHourSuffix={item.rentHourSuffix}
              totalAmount={item.totalAmount}
              carName={item.carName}
              noReservasiLabel={item.noReservasiLabel}
              orderCount={3}
              paymentStatusLabel={item.paymentStatusLabel}
              paymentStatusId={item.paymentStatusId}
              countDown={item.countDown}
              icCarRental={item.icCarRental}
              isMultiOrder={false}
            />
            <Text
              style={{ ...Fonts.text_dark_grey, ...Fonts.bold, ...Fonts.f_10, ...Margin.mt_16 }}
            >
              {refundLabel}
            </Text>
            <Text style={{ ...Fonts.f_10, ...Margin.mv_12 }}>{refundDetailLabel}</Text>
            <Text style={{ ...Fonts.f_10, ...Fonts.semibold, ...Margin.mt_16 }}>
              {confirmLabel}
            </Text>
            <PrimaryButton
              style={{ flex: 1, justifyContent: 'center', ...Margin.mv_16 }}
              text={cancelLabel}
              onPress={() => {
                onCancelPress()
                changeModalVisible(false)
              }}
            />
            <SecondaryButton
              isOrange={true}
              style={{ flex: 1, justifyContent: 'center' }}
              text={okLabel}
              onPress={() => changeModalVisible(false)}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

ModalOrderCancelConfirm.defaultProps = {
  children: null,
  modalVisible: true,
  changeModalVisible: () => {},
  title: 'Cancel Order',
  serviceLabel: 'Related Service',
  refundLabel: 'Kebijakan refund',
  refundDetailLabel: 'Pengembalian 100% untuk pembatalan 48 Jam sebelum sewa dimulai',
  confirmLabel: 'Are you sure cancel the order?',
  cancelLabel: 'Yakin, Batalkan',
  okLabel: 'Tetap pesan',
  onCancelPress: () => {},
  onOkPress: () => {},
  item: {
    cardTitle: 'Sewa Mobil - Dengan Sopir',
    city: 'Bandung',
    startDate: new Date(),
    endDate: new Date().getTime() + 86400000,
    rentHour: 12,
    rentHourSuffix: 'Jam',
    noReservasiLabel: '1234567',
    totalAmount: 500000,
    carName: 'TOYOTA ALPHARD',
    showMoreLabel: 'Show More 3 Orders',
    paymentStatusLabel: 'Payment Success',
    orderStatusLabel: 'Penjemputan Pada Tanggal 20',
    countDownLabel: '42:05',
    icOptions: require('icons/ic-options.png'),
    paymentStatusId: 1,
    isMultiOrder: false,
    style: {
      flex: 1,
      ...Row.row_2_2_5,
    },
  },
  styleMultiOrder: {
    flex: 1,
    ...Padding.pt_8,
    ...Margin.mv_8,
    ...Row.row_2,
  },
  styleOrder: {
    flex: 1,
    ...Padding.pt_8,
    ...Margin.mv_8,
    ...Row.row_2,
  },
}

ModalOrderCancelConfirm.propTypes = {
  children: PropTypes.node,
  modalVisible: PropTypes.bool,
  changeModalVisible: PropTypes.func,
  serviceLabel: PropTypes.string,
  refundLabel: PropTypes.string,
  refundDetailLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  title: PropTypes.string,
  item: PropTypes.shape({}),
}
