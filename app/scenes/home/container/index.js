import React, { useState, useEffect } from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, Alert } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'
import HomeActions from 'scenes/home/store/actions'
import HomeScreen from 'components/organism/homeScreen'
import { CAR_RENTAL, AIRPORT_TRANSFER, BUS_RENTAL } from 'config'
import AsyncStorage from '@react-native-community/async-storage'
import NavigationService from 'services/navigationService'

const HomeContainer = ({
  navigation,
  fetchUser,
  user,
  userIsLoading,
  userErrorMessage,
  fetchProducts,
  products,
  productsIsLoading,
  productsErrorMessage,
  fetchPromos,
  promos,
  promosIsLoading,
  promosErrorMessage,
  fetchNews,
  news,
  newsIsLoading,
  newsErrorMessage,
}) => {
  const [init, changeInit] = useState(false)
  const [promoInit, changePromoInit] = useState(false)
  const [newsInit, changeNewsInit] = useState(false)
  const [isMember, setIsMember] = useState(0)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    async function initialize() {
      fetchProducts()
      fetchPromos()
      fetchNews()
      fetchUser()

      const loginCheck = await AsyncStorage.getItem('token')

      if (loginCheck) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
      setIsMember(user.IsMember)
    }
    initialize()
  }, [])

  const onNotifPress = () => {
    navigation.navigate('NotificationListScreen', {})
  }

  const onMemberCTAPress = () => {
    navigation.navigate('Profile')
    navigation.navigate('MemberScreen')
  }

  return (
    <HomeScreen
      promos={promos}
      promosLoading={promosIsLoading}
      categories={news}
      categoriesLoading={newsIsLoading}
      items={products}
      itemsLoading={productsIsLoading}
      isMember={isMember}
      isLogin={isLogin}
      onNotifPress={onNotifPress}
      onMemberCTAPress={onMemberCTAPress}
    />
  )
}

HomeContainer.defaultProps = {
  products: [],
}

HomeContainer.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  productsIsLoading: PropTypes.bool,
  productsErrorMessage: PropTypes.string,
  fetchProducts: PropTypes.func,
  promos: PropTypes.arrayOf(PropTypes.shape({})),
  promosIsLoading: PropTypes.bool,
  promosErrorMessage: PropTypes.string,
  fetchPromos: PropTypes.func,
  news: PropTypes.arrayOf(PropTypes.shape({})),
  newsIsLoading: PropTypes.bool,
  newsErrorMessage: PropTypes.string,
  fetchNews: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  products: state.home.products,
  productsIsLoading: state.home.productsIsLoading,
  productsErrorMessage: state.home.productsErrorMessage,
  promos: state.home.promos,
  promosIsLoading: state.home.promosIsLoading,
  promosErrorMessage: state.home.promosErrorMessage,
  news: state.home.news,
  newsIsLoading: state.home.newsIsLoading,
  newsErrorMessage: state.home.newsErrorMessage,
  user: state.home.user,
  userIsLoading: state.home.userIsLoading,
  userErrorMessage: state.home.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(HomeActions.fetchProducts()),
  fetchPromos: () => dispatch(HomeActions.fetchPromos()),
  fetchNews: () => dispatch(HomeActions.fetchNews()),
  fetchUser: () => dispatch(HomeActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
