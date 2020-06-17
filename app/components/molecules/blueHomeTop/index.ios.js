import React from 'react'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import { Text, View } from 'react-native'
import CardButton from 'components/atom/cardButton'
import CardButtonSkeleton from 'components/atom/cardButton/skeleton'
import { Background, Colors, Padding, Margin, Fonts, Row, Column } from 'theme'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export default function BlueHomeTop({ children, welcomeText1, welcomeText2, items, itemsLoading }) {
  return (
    <View style={{ ...Row.row_3, ...Column.col_12, marginBottom: '20%' }}>
      <LinearGradient
        colors={['#5f7bcf', Colors.blue]}
        style={{
          ...Background.bg_blue,
          borderBottomLeftRadius: 70,
          ...Row.row_3,
          ...Column.col_12,
        }}
      >
        <View style={{ ...Padding.ph_20, ...Padding.pv_8, marginTop: 28, paddingRight: '30%' }}>
          <Text>
            <Text style={{ ...Fonts.f_18, ...Fonts.f_bold, ...Fonts.text_white }}>
              {welcomeText1}
            </Text>
            <Text style={{ ...Fonts.f_18, ...Fonts.text_white }}>{welcomeText2}</Text>
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          paddingHorizontal: '7%',
          ...Padding.pv_8,
          marginTop: '-27.5%',
          paddingRight: '30%',
          flexDirection: 'row',
        }}
      >
        {!itemsLoading &&
          items &&
          items.map((v, i) => {
            return (
              <CardButton
                key={`card-button-${i}`}
                onPress={v.onPress}
                text={v.name}
                url={v.icon}
                style={{ ...Column.col_3_5, ...Row.row_2, ...Margin.mr_12 }}
              />
            )
          })}
        {itemsLoading && (
          <SkeletonPlaceholder>
            <CardButtonSkeleton 
                style={{ ...Column.col_3_5, ...Row.row_2, ...Margin.mr_12 }} />
            <CardButtonSkeleton 
                style={{ ...Column.col_3_5, ...Row.row_2, ...Margin.mr_12 }}/>
            <CardButtonSkeleton 
                style={{ ...Column.col_3_5, ...Row.row_2, ...Margin.mr_12 }}/>
          </SkeletonPlaceholder>
        )}
      </View>
    </View>
  )
}

BlueHomeTop.defaultProps = {
  children: null,
  welcomeText1: 'Halo',
  welcomeText2: ', Apa yang sedang kamu cari?',
  items: [],
  itemsLoading: true,
}

BlueHomeTop.propTypes = {
  children: PropTypes.node,
  welcomeText1: PropTypes.string,
  welcomeText2: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  itemsLoading: PropTypes.bool,
}
