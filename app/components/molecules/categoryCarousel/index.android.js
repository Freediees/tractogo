import React from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions } from 'react-native'
import Carousel from 'components/molecules/customCarousel'
import CardCategory from 'components/atom/cardCategory'
import CardCategorySkeleton from 'components/atom/cardCategory/skeleton'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { Padding, Margin, Row, Column } from 'theme'

export default function CategoryCarousel({ categories, categoriesLoading, style }) {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Carousel
        hideIndicators={true}
        width={Dimensions.width}
        animate={false} // Enable carousel autoplay
        delay={5000} // Set Animation delay between slides
        loop={false}
      >
        {!categoriesLoading &&
          categories &&
          categories.map((v) => {
            return <CardCategory onPress={v.onPress} text={v.text} image={v.image} style={style} />
          })}
        {categoriesLoading && (
          <SkeletonPlaceholder>
          <CardCategorySkeleton style={{...Margin.mb_20, ...Margin.ml_20, flex: 1, ...Row.row_3, ...Column.col_5}} />
            <CardCategorySkeleton style={{...Margin.mb_20, ...Margin.ml_20, flex: 1, ...Row.row_3, ...Column.col_5}} />
            <CardCategorySkeleton style={{...Margin.mb_20, ...Margin.ml_20, flex: 1, ...Row.row_3, ...Column.col_5}} />
          </SkeletonPlaceholder>
        )}
      </Carousel>
    </View>
  )
}

CategoryCarousel.defaultProps = {
  categories: null,
  categoriesLoading: true,
}

CategoryCarousel.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  categoriesLoading: PropTypes.bool,
}
