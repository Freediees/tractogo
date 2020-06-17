import React, { useState } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import ListViewCardItem from 'components/molecules/listViewCardItem'
import CheckOutFooter from 'components/molecules/checkOutFooter'
import HeaderOptions from 'components/molecules/headerOptions'

export default function CartScreen({
  title,
  mainLabel,
  secondLabel,
  items,
  changeItems,
  itemsLoading,
  isDriver,
  isCart,
  onCheckoutPress,
  onDeleteButtonPress,
  changeSelectedAllItems,
  count,
  amountValue,
}) {
  const [isEdit, changeEdit] = useState(false)
  const [isAll, changeIsAll] = useState(false)
  return (
    <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
      <HeaderOptions
        isEdit={isEdit}
        onPressEdit={() => {
          changeEdit(false)
        }}
        onPressFinish={() => {
          changeEdit(true)
        }}
        isBlack
        border={true}
        title={title}
        mainOptions={mainLabel}
        secondOptions={secondLabel}
      />
      <View style={{ flex: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <ListViewCardItem
            changeItems={changeItems}
            items={items}
            isLoading={itemsLoading}
            isDriver={isDriver}
            isCart={isCart}
          />
          <CheckOutFooter
            isAll={isAll}
            changeAll={() => {
              changeSelectedAllItems(!isAll)
              changeIsAll(!isAll)
            }}
            isCheckOut={!isEdit}
            onDeleteButtonPress={onDeleteButtonPress}
            onCheckoutPress={onCheckoutPress}
            count={count}
            border={true}
            amountValue={amountValue}
          />
        </View>
      </View>
    </View>
  )
}

CartScreen.defaultProps = {
  title: 'CART',
  mainLabel: 'Edit',
  secondLabel: 'Selesai',
  changeItems: () => {},
  items: [
    {
      onPress: () => {},
      cardTitle: 'TOYOTA ALPHARD',
      seatAmount: 5,
      seatLabel: 'Seat',
      driverLabel: 'Driver',
      suitcaseAmount: 3,
      suitcaseLabel: 'Suitcase',
      basePriceLabel: 'Harga Dasar',
      priceAmount: 1000000,
      priceUnit: ' / Hari',
      totalLabel: ' Total',
      itemImage: require('images/alphard-11.png'),
    },
    {
      onPress: () => {},
      cardTitle: 'TOYOTA HIACE',
      seatAmount: 5,
      seatLabel: 'Seat',
      driverLabel: 'Driver',
      suitcaseAmount: 3,
      suitcaseLabel: 'Suitcase',
      basePriceLabel: 'Harga Dasar',
      priceAmount: 1000000,
      priceUnit: ' / Hari',
      totalLabel: ' Total',
      itemImage: require('images/HiAce-10.png'),
    },
    {
      onPress: () => {},
      cardTitle: 'TOYOTA AVANZA',
      seatAmount: 5,
      seatLabel: 'Seat',
      driverLabel: 'Driver',
      suitcaseAmount: 3,
      suitcaseLabel: 'Suitcase',
      basePriceLabel: 'Harga Dasar',
      priceAmount: 1000000,
      priceUnit: ' / Hari',
      totalLabel: ' Total',
      itemImage: require('images/avanza-13.png'),
    },
    {
      onPress: () => {},
      cardTitle: 'TOYOTA NEW INNOVA',
      seatAmount: 5,
      seatLabel: 'Seat',
      driverLabel: 'Driver',
      suitcaseAmount: 3,
      suitcaseLabel: 'Suitcase',
      basePriceLabel: 'Harga Dasar',
      priceAmount: 1000000,
      priceUnit: ' / Hari',
      totalLabel: ' Total',
      itemImage: require('images/newinnova-12.png'),
    },
  ],
  isDriver: true,
  isCart: true,
  onCheckoutPress: () => {},
  onDeleteButtonPress: () => {},
  changeSelectedAllItems: () => {},
  count: 0,
  amountValue: 0,
  isLoading: true,
}

CartScreen.propTypes = {
  title: PropTypes.string,
  mainLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  itemsLoading: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  changeItems: PropTypes.func,
  isDriver: PropTypes.bool,
  isCart: PropTypes.bool,
  onCheckoutPress: PropTypes.func,
  onDeleteButtonPress: PropTypes.func,
  changeSelectedAllItems: PropTypes.func,
  count: PropTypes.number,
  amountValue: PropTypes.number,
  isLoading: PropTypes.bool,
}
