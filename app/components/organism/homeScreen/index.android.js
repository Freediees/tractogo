/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView } from 'react-native'
import BlueHeader from 'components/molecules/blueHeader'
import BlueHomeTop from 'components/molecules/blueHomeTop'
import CarouselTitle from 'components/molecules/carouselTitle'
import MemberCTA from 'components/molecules/memberCTA'
import PromoCarousel from 'components/molecules/promoCarousel'
import CategoryCarousel from 'components/molecules/categoryCarousel'

import { Padding, Row, Column, Margin } from 'theme'

export default function HomeScreen({
  onChatPress,
  onNotifPress,
  onMorePromosPress,
  onMoreCategoriesPress,
  onMemberCTAPress,
  promos,
  promosLoading,
  categories,
  categoriesLoading,
  welcomeText1,
  welcomeText2,
  items,
  itemsLoading,
  memberCTATitle,
  memberCTADescription,
  isMember,
}) {
  return (
    <View style={{ flex: 20 }}>
      <BlueHeader onChatPress={onChatPress} onNotifPress={onNotifPress} />
      <ScrollView>
        <BlueHomeTop
          items={items}
          itemsLoading={itemsLoading}
          welcomeText1={welcomeText1}
          welcomeText2={welcomeText2}
        />
        <CarouselTitle
          onMorePress={onMorePromosPress}
          style={{ ...Padding.pl_20, ...Margin.ml_12 }}
          title={'Promo'}
        />
        <PromoCarousel
          style={{ flex: 1, ...Padding.pl_20, ...Margin.mb_20, ...Row.row_1_5, ...Column.col_9 }}
          offset={'80%'}
          promos={promos}
          promosLoading={promosLoading}
        />
        {isMember == 0 ? (
          <View style={{ flex: 1, ...Padding.ph_20, ...Margin.mv_20 }}>
            <MemberCTA
              onPress={onMemberCTAPress}
              icon={require('images/daftar-member-05.png')}
              title={memberCTATitle}
              description={memberCTADescription}
            />
          </View>
        ) : (
          <View style={{ ...Margin.mv_20 }} />
        )}
        <CarouselTitle
          onMorePress={onMorePromosPress}
          style={{ ...Padding.pl_20, ...Margin.ml_12 }}
          title={'Berita Terkini'}
        />
        <CategoryCarousel
          style={{ ...Margin.mb_20, paddingLeft: 20, flex: 1, ...Row.row_3, ...Column.col_5 }}
          categories={categories}
          categoriesLoading={categoriesLoading}
        />
      </ScrollView>
    </View>
  )
}

HomeScreen.defaultProps = {
  isMember: 0,
  onChatPress: null,
  onNotifPress: null,
  items: [],
  itemsLoading: true,
  onMorePromosPress: null,
  onMoreCategoriesPress: null,
  onMemberCTAPress: null,
  promos: [],
  promosLoading: true,
  categories: [],
  categoriesLoading: true,
  welcomeText1: 'Halo',
  welcomeText2: ', Apa yang sedang kamu cari?',
  memberCTATitle: 'Daftar Member',
  memberCTADescription: 'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!',
}

HomeScreen.propTypes = {
  isMember: PropTypes.number,
  onChatPress: PropTypes.func,
  onNotifPress: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  itemsLoading: PropTypes.bool,
  onMorePromosPress: PropTypes.func,
  onMoreCategoriesPress: PropTypes.func,
  onMemberCTAPress: PropTypes.func,
  promos: PropTypes.arrayOf(PropTypes.shape({})),
  promosLoading: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  categoriesLoading: PropTypes.bool,
  welcomeText1: PropTypes.string,
  welcomeText2: PropTypes.string,
  memberCTATitle: PropTypes.string,
  memberCTADescription: PropTypes.string,
}
