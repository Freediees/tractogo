import React from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions } from 'react-native'
import { Colors, Padding, Margin, Row, Column } from 'theme'
import Carousel from 'components/molecules/customCarousel'
import PromoCard from 'components/atom/promoCard'
import PromoCardSkeleton from 'components/atom/promoCard/skeleton'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export default function PromoCarousel({ promos, promosLoading, style, offset }) {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {!promosLoading && (
        <Carousel
          width={Dimensions.width}
          indicatorSize={30}
          indicatorAtBottom={false}
          indicatorOffset={offset}
          indicatorSpace={15}
          indicatorColor={Colors.amber}
          inactiveIndicatorColor={Colors.smoky_grey}
          animate={false} // Enable carousel autoplay
          delay={5000} // Set Animation delay between slides
          loop={false}
        >
          {promos &&
            promos.map((v, i) => {
              return (
                <PromoCard key={`promo ${i}`} onPress={v.onPress} image={v.image} style={style} />
              )
            })}
        </Carousel>
      )}
      {promosLoading && (
        <SkeletonPlaceholder>
          <View style={{ flexDirection: 'row' }}>
            <PromoCardSkeleton
              style={{ flex: 1, ...Margin.ml_20, ...Margin.mb_20, ...Row.row_1_5, ...Column.col_9 }}
            />
            <PromoCardSkeleton
              style={{ flex: 1, ...Margin.ml_20, ...Margin.mb_20, ...Row.row_1_5, ...Column.col_9 }}
            />
          </View>
        </SkeletonPlaceholder>
      )}
    </View>
  )
}

PromoCarousel.defaultProps = {
  promos: null,
  style: {},
  offset: '10%',
  promosLoading: true,
}

PromoCarousel.propTypes = {
  promos: PropTypes.arrayOf(PropTypes.shape({})),
  style: PropTypes.shape({}),
  offset: PropTypes.string,
  promosLoading: PropTypes.bool,
}
