import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions, ScrollView, Text } from 'react-native'
import CardItem from 'components/atom/cardItem'
import { Padding, Margin, Column, Row, Fonts, Background, Border } from 'theme'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import CardItemSkeleton from 'components/atom/cardItem/skeleton'

export default function ListViewCardItem({
  items,
  changeItems,
  isLoading,
  isDriver,
  isCart,
  style,
}) {
  const [selectedIndex, changeSelectedIndex] = useState(0)

  const changeItemChecked = (index, val) => {
    console.log(index)
    console.log(val)
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
              <View style={{ flexDirection: 'column' }}>
                <CardItem
                  key={`${v}-cart`}
                  isDriver={isDriver}
                  isCart={isCart}
                  onPress={v.onPress}
                  style={v.style}
                  cardTitle={v.cardTitle}
                  seatAmount={v.seatAmount}
                  seatLabel={v.seatLabel}
                  driverLabel={v.driverLabel}
                  suitcaseAmount={v.suitcaseAmount}
                  suitcaseLabel={v.suitcaseLabel}
                  basePriceLabel={v.basePriceLabel}
                  priceAmount={v.priceAmount}
                  priceUnit={v.priceUnit}
                  totalLabel={v.totalLabel}
                  uriImage={v.uriImage}
                  itemImage={v.itemImage}
                  duration={v.duration}
                  discountedPrice={v.discountedPrice}
                  discountPercent={v.discountPercent}
                  selected={v.selected}
                  changeSelected={(selected) => {
                    console.log('testtt')
                    changeItemChecked(i, selected)
                  }}
                  carRentalLabel={v.carRentalLabel}
                  rentalDriverLabel={v.rentalDriverLabel}
                  placeLabel={v.placeLabel}
                  dateLabel={v.dateLabel}
                />
                {
                  v.errors && v.errors.length> 0 &&
                  <View
                    style={{
                      flexDirection: 'column',
                      ...Border.border_w_1,
                      ...Border.border_red,
                      ...Border.border_rad_8,
                      ...Background.bg_light_grey,
                      ...Margin.mt_8,
                      ...Padding.ph_8,
                      ...Padding.pv_8,
                    }}
                  >
                    {v.errors.map((w, y) => {
                        return (
                          <Text
                            key={`${v}-${w}-${y}`}
                            style={{ ...Fonts.f_10, ...Fonts.text_red, ...Margin.mt_4 }}
                          >
                            {w}
                          </Text>
                        )
                      })}
                  </View>
                }
                
              </View>
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

ListViewCardItem.defaultProps = {
  items: null,
  isDriver: true,
  isLoading: false,
  isCart: false,
  changeItems: () => {},
}

ListViewCardItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  isDriver: PropTypes.bool,
  isLoding: PropTypes.bool,
  isCart: PropTypes.bool,
  changeItems: () => {},
}
