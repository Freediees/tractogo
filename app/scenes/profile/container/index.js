import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import ProfileScreen from 'components/organism/profileScreen'
import { getUserProfileObject } from 'function'

import HomeAction from 'scenes/home/store/actions'
import ProfileAction from 'scenes/profile/store/actions'
import { doResolveLoginRouteTab } from 'function/apiRequest'
import NavigationService from 'services/navigationService'
import { Alert, Text, View, ScrollView } from 'react-native'
import TextAndNext from 'components/atom/textAndNext'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import { Fonts, Margin, Padding, Border, Row, Column, Colors } from 'theme'
import CustomAccordionCard from 'components/atom/customAccordionCard'
import { resetNavCounter } from 'function'

function Profile({
  navigation,
  fetchUser,
  user,
  userIsLoading,
  userErrorMessage,
  doLogout,
  modalQADescription,
}) {
  const [onLoad, setonLoad] = useState(true)
  const [data, setData] = useState({})
  const [content, setContent] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    async function initialize() {
      const callback = async () => {
        navigation.popToTop()
      }

      if (await doResolveLoginRouteTab(callback)) {
        let dataJson = await getUserProfileObject()
        setData(dataJson)
      }
    }
    initialize()
    const unsubscribe = navigation.addListener('didFocus', () => {
      fetchUser()
      console.log('focus')
      initialize()
    })
  }, [navigation])

  const moveToDetail = () => {
    navigation.navigate('SettingScreen')
  }

  const moveToMember = () => {
    navigation.navigate('MemberScreen')
    //navigation.navigate('CameraScreen')
  }

  const setContentValue = (value) => {
    //alert('sini mang')
    setModalVisible(true)
    setContent(value)
  }

  const modalSetting = (
    <View style={{ width: '100%' }}>
      <TextAndNext
        title={'Account'}
        onPress={() => {
          setModalVisible(false)
          moveToDetail()
        }}
      />
      <TextAndNext title={'Language'} onPress={() => Alert.alert('Coming Soon')} />
    </View>
  )

  const termCondition = (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView style={{ ...Padding.ph_20 }}>
        <View style={{ ...Margin.mv_8, ...Padding.ph_8 }}>
          <CustomAccordionCard title={'Term And Condition'}>
            <View style={{ marginTop: 16 }}>
              <Text style={{ ...Fonts.f_10 }}>{modalQADescription}</Text>
            </View>
          </CustomAccordionCard>
        </View>
      </ScrollView>
    </View>
  )

  const privacyPolicy = (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView style={{ ...Padding.ph_20 }}>
        <View style={{ ...Margin.mv_8, ...Padding.ph_8 }}>
          <CustomAccordionCard title={'Privacy Policy'}>
            <View style={{ marginTop: 16 }}>
              <Text style={{ ...Fonts.f_10 }}>{modalQADescription}</Text>
            </View>
          </CustomAccordionCard>
        </View>
      </ScrollView>
    </View>
  )

  const modalHelpCenter = (
    <View style={{ width: '100%' }}>
      <TextAndNext title={'FAQ'} onPress={() => Alert.alert('On Development')} />
      <TextAndNext title={'Contact Form'} onPress={() => Alert.alert('On Development')} />
      <TextAndNext
        title={'Branch / Outlet Location'}
        onPress={() => Alert.alert('On Development')}
      />
      <TextAndNext title={'Call Center 1500009'} onPress={() => Alert.alert('On Development')} />
    </View>
  )

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const datasource = [
    {
      imageSource: require('icons/ic_center.png'),
      title: 'Help Center',
      body: 'Find the best answer to your question',
      onPress: () => {
        setContentValue(modalHelpCenter)
      },
      type: 'navigate',
      content: '',
    },
    {
      imageSource: require('icons/ic_tearm_condition.png'),
      title: 'Terms and Condition',
      body: 'See all terms and condition',
      onPress: () => {
        setContentValue(termCondition)
      },
      type: 'modal',
      content: '',
    },
    {
      imageSource: require('icons/ic_private.png'),
      title: 'Privacy Policy',
      body: 'See all privacy policy',
      onPress: () => {
        setContentValue(privacyPolicy)
      },
      type: 'modal',
      content: '',
    },
    {
      imageSource: require('icons/ic_setting.png'),
      title: 'Settings',
      body: 'Setting your account',
      onPress: () => {
        setContentValue(modalSetting)
      },
      type: 'modal',
      content: '',
    },
    {
      imageSource: require('icons/ic_logout.png'),
      title: 'Logout',
      body: '',
      onPress: () => {
        doLogout()
        resetNavCounter()
      },
      type: 'navigate',
      content: '',
    },
  ]

  return (
    <ProfileScreen
      fullName={`${user.FirstName} ${user.LastName}`}
      email={user.EmailPersonal}
      phoneNo={user.NoHandphone}
      moveToDetail={moveToDetail}
      moveToMember={moveToMember}
      dataList={datasource}
      modalContent={content}
      modalVisible={modalVisible}
      toggleModal={toggleModal}
      // onEdit={onEdit}
    />
  )
}

Profile.defaultProps = {
  user: [],
  modalQADescription:
    'A. Pembayaran biaya perbaikan/penggantian , yang merupakan beban biaya resiko sendiri (Deductible/Own Risk Charges) sejumlah Rp 330.000,- (tiga ratus tiga puluh ribu rupiah) per kejadian (termasuk PPN 10%).\n\n' +
    'B. Pertanggungan Pihak Ketiga (Third Party Liabilities) yang ditanggung oleh TRAC maksimum adalah sebesar Rp 50.000.000,- (lima puluh juta rupiah) untuk setiap kejadian, jumlah lebih dari itu akan ditanggung oleh CUSTOMER.\n\n' +
    'C. Passenger Legal Liability (PLL) merupakan penggantian klaim (yang disebabkan oleh kelalaian dari pihak driver TRAC), hanya terbatas bagi harta benda penumpang, kecuali uang. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
    'D. Personal Accident (PA) merupakan penggantian ganti rugi kepada pihak penyewa, jika terjadi cidera badan dan kematian yang diakibatkan kecelakaan. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
    'E. Total Lost, asuransi untuk kehilangan unit. PENYEWA juga wajib menanggung Biaya Resiko Kehilangan (Total Lost Risk) sebesar Rp 6.000.000,- (enam juta rupiah) bila Mobil tersebut hilang.',
}

Profile.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  doLogout: PropTypes.func,
  modalQADescription: PropTypes.string,
}

const mapStateToProps = (state) => ({
  user: state.home.user,
  // userIsLoading: state.home.userIsLoading,
  // userErrorMessage: state.home.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (value) => dispatch(HomeAction.fetchUser(value)),
  doLogout: () => dispatch(ProfileAction.doLogout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
