import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Image, ScrollView, Text } from 'react-native'

import DefaultHeader from 'components/molecules/defaultHeader'
import ListViewNotification from 'components/molecules/listViewNotification'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import { Column, Margin, Fonts, Colors, Padding } from 'theme'
import backIcon from 'icons/ic-back.svg'

export default function NotificationScreen({
  onIconLeftPress,
  screenTitle,
  onChangeTab,
  tab1Label,
  tab2Label,
  transactionItems,
  updateItems,
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <DefaultHeader title={screenTitle} iconLeft={backIcon} onIconLeftPress={onIconLeftPress} />
      <View style={{ flex: 9 }}>
        <ScrollableTabView onChangeTab={onChangeTab} tabBarTextStyle={Fonts.f_14}>
          <View style={{ flex: 1, ...Padding.pv_4 }} tabLabel={tab1Label}>
            <ListViewNotification items={transactionItems} />
          </View>
          <View style={{ flex: 1, ...Padding.pv_4 }} tabLabel={tab2Label}>
            <ListViewNotification items={updateItems} />
          </View>
        </ScrollableTabView>
      </View>
    </View>
  )
}

NotificationScreen.defaultProps = {
  onIconLeftPress: () => {},
  onChangeTab: () => {},
  screenTitle: 'Notifikasi',
  tab1Label: 'Transaksi',
  tab2Label: 'Update',
  updateItems: [
    {
      titleText: 'Fetching Data',
      contentText: 'Please Wait',
      dateText: Date.now(),
    },
    {
      titleText: 'Fetching Data',
      contentText: 'Please Wait',
      dateText: Date.now(),
    },
  ],
  transactionItems: [
    {
      titleText: 'Fetching Data',
      contentText: 'Please Wait',
      dateText: Date.now(),
    },
    {
      titleText: 'Fetching Data',
      contentText: 'Please Wait',
      dateText: Date.now(),
    },
  ],
}

NotificationScreen.propTypes = {
  onIconLeftPress: PropTypes.func,
  onChangeTab: PropTypes.func,
  screenTitle: PropTypes.string,
  title: PropTypes.string,
  tab1Label: PropTypes.string,
  tab2Label: PropTypes.string,
  transactionItems: PropTypes.arrayOf(PropTypes.shape({})),
  updateItems: PropTypes.arrayOf(PropTypes.shape({})),
}
