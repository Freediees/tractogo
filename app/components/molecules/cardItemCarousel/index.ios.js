import React from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions } from 'react-native'
import Carousel from 'components/molecules/customCarousel'
import CardItem from 'components/atom/cardItem'

export default function CardItemCarousel({ items, style }) {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Carousel
        hideIndicators={true}
        width={Dimensions.width}
        animate={false} // Enable carousel autoplay
        delay={5000} // Set Animation delay between slides
        loop={false}
      >
        {items &&
          items.map((v) => {
            return (
              <CardItem
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
                itemImage={v.itemImage}
              />
            )
          })}
      </Carousel>
    </View>
  )
}

CardItemCarousel.defaultProps = {
  items: null,
}

CardItemCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
}
