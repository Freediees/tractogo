import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Image, ScrollView, Text } from 'react-native'
import ListViewCardOrder from 'components/molecules/listViewCardOrder'
import DefaultHeader from 'components/molecules/defaultHeader'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import { Column, Margin, Fonts, Colors, Padding, Row } from 'theme'

export default function MyOrderListScreen({
  title,
  ordersActive,
  ordersComplete,
  ordersCancel,
  ordersActiveIsLoading,
  ordersCompleteIsLoading,
  ordersCancelIsLoading,
  onChangeTab,
  tab1Label,
  tab2Label,
  tab3Label,
}) {
  const [modalVisible, changeModalVisible] = useState(false)

  return (
    <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
      <DefaultHeader title={title} />
      <View style={{ flex: 9 }}>
        <ScrollableTabView
          onChangeTab={onChangeTab}
          tabBarActiveTextColor={Colors.black}
          tabBarTextStyle={Fonts.f_14}
        >
          <View style={{ flex: 1 }} tabLabel={tab1Label}>
            <ListViewCardOrder items={ordersActive} isLoading={ordersActiveIsLoading} />
          </View>
          <View style={{ flex: 1 }} tabLabel={tab2Label}>
            <ListViewCardOrder items={ordersComplete} isLoading={ordersCompleteIsLoading} />
          </View>
          <View style={{ flex: 1 }} tabLabel={tab3Label}>
            <ListViewCardOrder items={ordersCancel} isLoading={ordersCancelIsLoading} />
          </View>
        </ScrollableTabView>
      </View>
    </View>
  )
}

MyOrderListScreen.defaultProps = {
  title: "Order",
  onOptionsButtonPress: () => {},
  onChangeTab: () => {},
  tab1Label: "Active",
  tab2Label: "Completed",
  tab3Label: "Cancelled",
  ordersActive: [
    {
      cardTitle: 'Car Rental - With Driver',
      city: 'Bandung',
      startDate: new Date(),
      endDate: new Date().getTime() + 86400000,
      rentHour: 12,
      rentHourSuffix: 'Hour',
      noReservasiLabel: 'No Reservasi 1234567',
      totalAmount: 500000,
      carName: 'TOYOTA ALPHARD',
      showMoreLabel: 'Show More 3 Orders',
      paymentStatusLabel: 'Menunggu Pembayaran',
      countDownLabel: '42:05',
      icOptions: require('icons/ic-options.png'),
      paymentStatusId: 0,
      isMultiOrder: true,
      onPress: () => {},
      style: {
        flex: 1,
        ...Padding.pt_12,
        ...Margin.mv_20,
        ...Row.row_3,
      },
    },
    {
      cardTitle: 'Car Rental - With Driver',
      city: 'Bandung',
      startDate: new Date(),
      endDate: new Date().getTime() + 86400000,
      rentHour: 12,
      rentHourSuffix: 'Hour',
      noReservasiLabel: 'No Reservasi 1234567',
      totalAmount: 500000,
      carName: 'TOYOTA ALPHARD',
      showMoreLabel: 'Show More 3 Orders',
      paymentStatusLabel: 'Menunggu Pembayaran',
      countDownLabel: '42:05',
      icOptions: require('icons/ic-options.png'),
      paymentStatusId: 0,
      isMultiOrder: true,
      onPress: () => {},
      style: {
        flex: 1,
        ...Padding.pt_12,
        ...Margin.mv_20,
        ...Row.row_3,
      },
    },
    {
      cardTitle: 'Car Rental - With Driver',
      city: 'Bandung',
      startDate: new Date(),
      endDate: new Date().getTime() + 86400000,
      rentHour: 12,
      rentHourSuffix: 'Hour',
      noReservasiLabel: 'No Reservasi 1234567',
      totalAmount: 500000,
      carName: 'TOYOTA ALPHARD',
      showMoreLabel: 'Show More 3 Orders',
      paymentStatusLabel: 'Menunggu Pembayaran',
      countDownLabel: '42:05',
      icOptions: require('icons/ic-options.png'),
      paymentStatusId: 0,
      isMultiOrder: true,
      onPress: () => {},
      style: {
        flex: 1,
        ...Padding.pt_12,
        ...Margin.mv_20,
        ...Row.row_3,
      },
    },
    {
      cardTitle: 'Car Rental - With Driver',
      city: 'Bandung',
      startDate: new Date(),
      endDate: new Date().getTime() + 86400000,
      rentHour: 12,
      rentHourSuffix: 'Hour',
      noReservasiLabel: 'No Reservasi 1234567',
      totalAmount: 500000,
      carName: 'TOYOTA ALPHARD',
      showMoreLabel: 'Show More 3 Orders',
      paymentStatusLabel: 'Menunggu Pembayaran',
      countDownLabel: '42:05',
      icOptions: require('icons/ic-options.png'),
      paymentStatusId: 0,
      isMultiOrder: true,
      onPress: () => {},
      style: {
        flex: 1,
        ...Padding.pt_12,
        ...Margin.mv_20,
        ...Row.row_3,
      },
    },
  ],
  ordersComplete: [],
  ordersCancel: [],
  style: {},
  itemsLoading: false,
}

MyOrderListScreen.propTypes = {
  title: PropTypes.string,
  onOptionsButtonPress: PropTypes.func,
  onChangeTab: PropTypes.func,
  tab1Label: PropTypes.string,
  tab2Label: PropTypes.string,
  tab3Label: PropTypes.string,
  ordersActive: PropTypes.arrayOf(PropTypes.shape({})),
  ordersComplete: PropTypes.arrayOf(PropTypes.shape({})),
  ordersCancel: PropTypes.arrayOf(PropTypes.shape({})),
  ordersActiveIsLoading: PropTypes.bool,
  ordersCompleteIsLoading: PropTypes.bool,
  ordersCancelIsLoading: PropTypes.bool,
}
