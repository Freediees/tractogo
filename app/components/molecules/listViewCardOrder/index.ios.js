import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions, ScrollView } from 'react-native'
import CardOrder from 'components/atom/cardOrder'
import { Padding, Margin, Column, Row } from 'theme'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import CardItemSkeleton from 'components/atom/cardItem/skeleton'

export default function ListViewCardOrder({
  items,
  changeItems,
  isLoading,
  styleMultiOrder,
  styleOrder,
  isDriver,
  isCart,
  style,
}) {
  const [selectedIndex, changeSelectedIndex] = useState(0)

  const changeItemChecked = (index, val) => {
    changeSelectedIndex(index)
    let temp = items
    temp[index].selected = val
    changeItems(temp)
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <ScrollView
        style={{
          ...Column.col_12,
          ...Padding.ph_20,
        }}
      >
        {!isLoading &&
          items &&
          items.map((v, i) => {
            return (
              <CardOrder
                onPress={v.onPress}
                cardTitle={v.cardTitle}
                style={v.details.length > 1 ? styleMultiOrder : styleOrder}
                city={v.placeLabel}
                startDate={v.startDate}
                endDate={v.endDate}
                rentHour={v.rentHour}
                rentHourSuffix={v.rentHourSuffix}
                totalAmount={v.totalAmount}
                carName={v.carName}
                noReservasiLabel={v.noReservasiLabel}
                orderCount={v.details.length}
                paymentStatusLabel={v.paymentStatusLabel}
                paymentStatusId={v.paymentStatusId}
                countDown={v.countDown}
                icCarRental={v.icCarRental}
                isMultiOrder={v.details.length > 1}
                isAirport={v.details[0].MsProductId === "PRD0007" ? true : false}
              />
            )
          })}
        {isLoading && (
          <SkeletonPlaceholder>
            <CardItemSkeleton style={{ flex: 1, ...Margin.mv_12, height: 200 }} />
            <CardItemSkeleton style={{ flex: 1, ...Margin.mv_12, height: 200 }} />
            <CardItemSkeleton style={{ flex: 1, ...Margin.mv_12, height: 200 }} />
          </SkeletonPlaceholder>
        )}
      </ScrollView>
    </View>
  )
}

ListViewCardOrder.defaultProps = {
  items: null,
  isDriver: true,
  isLoading: false,
  isCart: false,
  styleMultiOrder: {
    flex: 1,
    ...Padding.pt_8,
    ...Margin.mv_8,
    ...Row.row_3_2_5,
  },
  styleOrder: {
    flex: 1,
    ...Padding.pt_8,
    ...Margin.mv_8,
    ...Row.row_2_7_5,
  },
  changeItems: () => {},
}

ListViewCardOrder.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  isDriver: PropTypes.bool,
  isLoding: PropTypes.bool,
  isCart: PropTypes.bool,
  styleMultiOrder: PropTypes.shape({}),
  styleOrder: PropTypes.shape({}),
  changeItems: PropTypes.func,
}
