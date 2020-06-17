import React from 'react'

import { View, Text } from 'react-native'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Welcome from './Welcome'
import SecondaryButton from 'components/atom/secondaryButton'
import CardButton from 'components/atom/cardButton'
import CardCategory from 'components/atom/cardCategory'
import PromoCard from 'components/atom/promoCard'
import PromoCarousel from 'components/molecules/promoCarousel'
import IconButton from 'components/atom/iconButton'
import ButtonImageCircle from 'components/atom/buttonImageCircle'
import PhoneFieldInput from 'components/atom/phoneFieldInput'
import PrimaryButton from 'components/atom/primaryButton'
import PasswordInput from 'components/atom/passwordInput'
import OTPInput from 'components/atom/oTPInput'
import TextInputFloat from 'components/atom/textInputFloat'
import CheckBox from 'components/atom/checkBox'
import CCInputMask from 'components/atom/cCInputMask'
import CardItem from 'components/atom/cardItem'
import CardLocation from 'components/atom/cardLocation'
import CustomCalendarPicker from 'components/atom/customCalendarPicker'
import CustomTimePicker from 'components/atom/customTimePicker'
import CustomCityPicker from 'components/atom/customCityPicker'
import CustomChipPicker from 'components/atom/customChipPicker'
import CustomMapView from 'components/atom/customMapView'
import CustomItemPicker from 'components/atom/customItemPicker'
import CustomLocationArrived from 'components/atom/customLocationArrived'
import CustomRangeSlider from 'components/atom/customRangeSlider'
import CustomAccordionCard from 'components/atom/customAccordionCard'
import CustomBorderlessAccordionCard from 'components/atom/customBorderlessAccordionCard'
import NumberIncrement from 'components/atom/numberIncrement'
import CardHeaderPrice from 'components/atom/cardHeaderPrice'
import CardHeaderCart from 'components/atom/cardHeaderCart'
import CardHeaderCheckOut from 'components/atom/cardHeaderCheckOut'
import CustomCheckAccordion from 'components/atom/customCheckAccordion'
import CustomCheckAccordion2 from 'components/atom/customCheckAccordion2'
import CustomCheckPayment from 'components/atom/customCheckPayment'
import CustomItemContainer from 'components/atom/customItemContainer'
import Separator from 'components/atom/separator'
import DefaultCTA from 'components/atom/defaultCTA'
import CartItem from 'components/atom/cartItem'
import CardOrder from 'components/atom/cardOrder'
import CardLocationSelfDrive from 'components/atom/cardLocationSelfDrive'
import TextWithPicker from 'components/atom/textWithPicker'
import NotificationItem from 'components/atom/notificationItem'
import ItemDropDownPicker from 'components/atom/itemDropDownPicker'
import Timeline from 'components/atom/timeline'
import CustomLocationInformationCard from 'components/atom/customLocationInformationCard'

import TopView from 'components/molecules/topView'
import CenterView from 'components/molecules/centerView'
import CenterViewNoPadding from 'components/molecules/centerViewNoPadding'
import SeparatorText from 'components/molecules/separatorText'
import BlueHomeTop from 'components/molecules/blueHomeTop'
import BlueHeader from 'components/molecules/blueHeader'
import MemberCTA from 'components/molecules/memberCTA'
import CategoryCarousel from 'components/molecules/categoryCarousel'
import DefaultBlueHeader from 'components/molecules/defaultBlueHeader'
import DefaultHeader from 'components/molecules/defaultHeader'
import HeaderOptions from 'components/molecules/headerOptions'
import DefaultFooter from 'components/molecules/defaultFooter'
import ListItemAnimation from 'components/molecules/listItemAnimation'
import CreditCardList from 'components/molecules/creditCardList'
import CardCheckList from 'components/molecules/cardCheckList'
import CheckOutFooter from 'components/molecules/checkOutFooter'
import VirtualAccountList from 'components/molecules/virtualAccountList'
import BorderlessDefaultCardView from 'components/molecules/borderlessDefaultCardView'
import VoucherFooter from 'components/molecules/voucherFooter'
import PaymentSelect from 'components/molecules/paymentSelect'
import CustomBottomSheet from 'components/molecules/customBottomSheet'
import OkCancelButton from 'components/molecules/okCancelButton'
import FilterArea from 'components/molecules/filterArea'
import FilterAirport from 'components/molecules/filterAirport'
import CardItemCarousel from 'components/molecules/cardItemCarousel'
import ListViewCardItem from 'components/molecules/listViewCardItem'
import SortFilterButton from 'components/molecules/sortFilterButton'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import TermsAndCondition from 'components/molecules/termsAndCondition'
import DetailInfoSection from 'components/molecules/detailInfoSection'
import ContactCenterSection from 'components/molecules/contactCenterSection'
import PaymentDetailContent from 'components/molecules/paymentDetailContent'
import CustomTopSheet from 'components/molecules/customTopSheet'
import FacilityFlexIcons from 'components/molecules/facilityFlexIcons'
import PersonInfoPanel from 'components/molecules/personInfoPanel'
import DefaultOkCancelFooter from 'components/molecules/defaultOkCancelFooter'
import ListViewCardLocation from 'components/molecules/listViewCardLocation'
import ListItem from 'components/molecules/listItem'
import BlueCardButton from 'components/molecules/buttonCard'
import ListViewCardLocationSelfDrive from 'components/molecules/listViewCardLocationSelfDrive'
import ListViewCardOrder from 'components/molecules/listViewCardOrder'
import ListViewNotification from 'components/molecules/listViewNotification'
import RatingStar from 'components/molecules/ratingStar'
import TimelineMolecule from 'components/molecules/timelineMolecule'
import ContactDriverCenter from 'components/molecules/contactDriverCenter'
import ModalOrderCancelConfirm from 'components/molecules/modalOrderCancelConfirm'
import DatePickupView from 'components/molecules/datePickupView'

import CarRentalFilterScreen from 'components/organism/carRentalFilterScreen'
import ProductListScreen from 'components/organism/productListScreen'
import PaymentScreen from 'components/organism/paymentScreen'
import CartScreen from 'components/organism/cartScreen'
import CheckOutScreen from 'components/organism/checkOutScreen'
import KYCOTPScreen from 'components/organism/kYCOTPScreen'
import MemberRegistrationScreen from 'components/organism/memberRegistrationScreen'
import KYCSuccessScreen from 'components/organism/kYCSuccessScreen'
import KYCPhoneInputScreen from 'components/organism/kYCPhoneInputScreen'
import LoginScreen from 'components/organism/loginScreen'
import RegisterScreen from 'components/organism/registerScreen'
import HomeScreen from 'components/organism/homeScreen'
import DetailItemWithDriver from 'components/organism/detailItemWithDriver'
import DetailItemSelfDrive from 'components/organism/detailItemSelfDrive'
import DetailItemAirport from 'components/organism/detailItemAirport'
import PickUpLocationScreen from 'components/organism/pickUpLocationScreen'
import ProfileScreen from 'components/organism/profileScreen'
import ProfileEditor from 'components/organism/profileEditorScreen'
import ProfileEditPhoneScreen from 'components/organism/profileEditPhoneScreen'
import MemberScreen from 'components/organism/memberScreen'
import SelfDrivePickLocationScreen from 'components/organism/selfDrivePickLocationScreen'
import NotificationScreen from 'components/organism/notificationScreen'
import AirportFilterScreen from 'components/organism/airportFilterScreen'
import MyOrderListScreen from 'components/organism/myOrderListScreen'
import RegisterVerification from 'components/organism/registerVerification'
import DetailItemMyOrder from 'components/organism/detailItemMyOrder'
import DetailItemOrderProgress from 'components/organism/detailItemOrderProgress'
import RatingScreen from 'components/organism/ratingScreen'
import KYCImageScreen from 'components/organism/kYCImageScreen'
import PaymentSuccessScreen from 'components/organism/paymentSuccessScreen'
import VerifikasiKYC from 'components/organism/verifikasiKYC'
import TestingScreen from 'components/organism/testingScreen'
import MyOrderCancelScreen from 'components/organism/myOrderCancelScreen'
import DetailOrderRefund from 'components/organism/detailOrderRefund'

import { Column, Row, Margin, Fonts } from 'theme'
import icon from 'icons/ic-composer.svg'
import carrental from 'icons/ic-carrental.svg'
import iconnotification from 'icons/ic-notif.svg'
import closeIcon from 'icons/ic-close.svg'
import backIcon from 'icons/ic-back.svg'

import CustomLocationPicker from 'components/atom/customLocationPicker'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Atom', module)
  .add('PrimaryButton', () => <PrimaryButton text={'Hello Button'} svg={icon} />)
  .add('SecondaryButton', () => <SecondaryButton text={'Hello Button'} />)
  .add('with text', () => (
    <CardButton text={'Sewa Mobil'} svg={carrental} style={{ ...Column.col_3, ...Row.row_2 }} />
  ))
  .add('ButtonImageCircle', () => <ButtonImageCircle />)
  .add('IconButton', () => <IconButton svg={iconnotification} />)
  .add('input password', () => (
    <PasswordInput
      onChange={(password) => console.log(password)}
      error={''}
      placeholder="Password"
    />
  ))
  .add('input text', () => (
    <TextInputFloat onChange={(text) => console.log(text)} error={''} placeholder="Email" />
  ))
  .add('CheckBox', () => (
    <CheckBox
      checked={true}
      onCheck={(a, b, c) =>
        alert('checked : ' + a.toString() + ', label :' + c + ', value_id :' + b)
      }
      value="1234 👍 💯"
      label="CHECKBOX"
      // color='#e67e22'
      // disabled={true}
    />
  ))
  .add('CCInputMask', () => <CCInputMask onSubmit={(a, b, c) => console.log(a, b, c)} />)
  .add('PhoneInput', () => <PhoneFieldInput />)
  .add('OTP Input', () => <OTPInput />)
  .add('Separator with Text', () => <SeparatorText text={'atau dengan'} />)
  .add('Sample Promo Card', () => (
    <PromoCard
      style={{ ...Row.row_1, ...Column.col_12 }}
      image={require('images/sample-promo-1.png')}
    />
  ))
  .add('CardCategory', () => (
    <CardCategory
      style={{ ...Row.row_4, ...Column.col_5 }}
      image={require('images/sample-category-1.png')}
      text={'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!'}
    />
  ))
  .add('CustomCityPicker', () => <CustomCityPicker />)
  .add('CustomTimePicker', () => <CustomTimePicker />)
  .add('CustomCalendarPicker', () => <CustomCalendarPicker />)
  .add('Card Item', () => <CardItem />)
  .add('Item Picker', () => <CustomItemPicker />)
  .add('CustomRangeSlider', () => (
    <CenterView>
      <CustomRangeSlider />
    </CenterView>
  ))
  .add('CustomChipPicker', () => (
    <CenterView>
      <CustomChipPicker />
    </CenterView>
  ))
  .add('CustomAccordionCard', () => (
    <CustomAccordionCard>
      <View style={{ marginTop: 16 }}>
        <Text style={{ ...Fonts.f_10 }}>
          {'A. Pembayaran biaya perbaikan/penggantian , yang merupakan beban biaya resiko sendiri (Deductible/Own Risk Charges) sejumlah Rp 330.000,- (tiga ratus tiga puluh ribu rupiah) per kejadian (termasuk PPN 10%).\n\n' +
            'B. Pertanggungan Pihak Ketiga (Third Party Liabilities) yang ditanggung oleh TRAC maksimum adalah sebesar Rp 50.000.000,- (lima puluh juta rupiah) untuk setiap kejadian, jumlah lebih dari itu akan ditanggung oleh CUSTOMER.\n\n' +
            'C. Passenger Legal Liability (PLL) merupakan penggantian klaim (yang disebabkan oleh kelalaian dari pihak driver TRAC), hanya terbatas bagi harta benda penumpang, kecuali uang. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
            'D. Personal Accident (PA) merupakan penggantian ganti rugi kepada pihak penyewa, jika terjadi cidera badan dan kematian yang diakibatkan kecelakaan. Nilai penggantian maximum Rp 10.000.000,- (sepuluh juta rupiah) per penumpang.\n\n' +
            'E. Total Lost, asuransi untuk kehilangan unit. PENYEWA juga wajib menanggung Biaya Resiko Kehilangan (Total Lost Risk) sebesar Rp 6.000.000,- (enam juta rupiah) bila Mobil tersebut hilang.'}
        </Text>
      </View>
    </CustomAccordionCard>
  ))
  .add('CustomBorderlessAccordionCard', () => (
    <CustomBorderlessAccordionCard>
      <FacilityFlexIcons />
      <Separator style={{ ...Margin.mv_12 }} />
      <FacilityFlexIcons moreButtonLabel={'selengkapnya'} />
    </CustomBorderlessAccordionCard>
  ))
  .add('CardLocation', () => <CardLocation />)
  .add('CustomMapView', () => <CustomMapView />)
  .add('CustomLocationPicker', () => <CustomLocationPicker />)
  .add('NumberIncrement', () => <NumberIncrement />)
  .add('CardHeaderPrice', () => <CardHeaderPrice />)
  .add('CardHeaderCart', () => <CardHeaderCart />)
  .add('CardHeaderCheckOut', () => <CardHeaderCheckOut />)
  .add('CustomCheckAccordion', () => <CustomCheckAccordion />)
  .add('CustomCheckPayment', () => <CustomCheckPayment />)
  .add('CustomItemContainer', () => <CustomItemContainer />)
  .add('DefaultCTA', () => <DefaultCTA />)
  .add('CartItem', () => <CartItem />)
  .add('CardOrder', () => <CardOrder />)
  .add('CardLocationSelfDrive', () => <CardLocationSelfDrive />)
  .add('CustomLocationArrived', () => <CustomLocationArrived />)
  .add('DatePickupView', () => <DatePickupView />)
  .add('TextWithPicker', () => <TextWithPicker />)
  .add('Notification Item', () => <NotificationItem />)
  .add('ItemDropDownPicker', () => <ItemDropDownPicker />)
  .add('CustomCheckAccordion2', () => 
    <CenterView>
      <CustomCheckAccordion2>
        <ItemDropDownPicker />
      </CustomCheckAccordion2>
    </CenterView>
  )
  .add('Timeline', () => <Timeline />)
  .add('CustomLocationInformationCard', () => <CustomLocationInformationCard />)

storiesOf('Molecules', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('SeparatorText', () => <SeparatorText text={'atau dengan'} />)
  .add('Sample Home Top', () => (
    <View>
      <BlueHeader />
      <BlueHomeTop />
    </View>
  ))
  .add('Sample Header', () => <BlueHeader />)
  .add('BlueHomeTop', () => <BlueHomeTop />)
  .add('Sample CTA', () => (
    <MemberCTA
      icon={require('images/daftar-member-05.png')}
      title={'Daftar Member'}
      description={'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!'}
    />
  ))
  .add('Sample Category View', () => (
    <CardCategory
      style={{ ...Row.row_4, ...Column.col_5 }}
      image={require('images/sample-category-1.png')}
      text={'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!'}
    />
  ))
  .add('Sample Promo Card', () => (
    <PromoCard
      style={{ ...Row.row_1, ...Column.col_12 }}
      image={require('images/sample-promo-1.png')}
    />
  ))
  .add('Sample Promo Carousel', () => (
    <PromoCarousel
      style={{ flex: 1, ...Row.row_1, ...Column.col_10 }}
      offset={'15%'}
      promos={[
        {
          image: require('images/sample-promo-1.png'),
        },
        {
          image: require('images/sample-promo-1.png'),
        },
        {
          image: require('images/sample-promo-1.png'),
        },
      ]}
    />
  ))
  .add('Sample Category Carousel', () => (
    <CategoryCarousel
      style={{ ...Row.row_4, ...Column.col_6, ...Margin.mr_16 }}
      categories={[
        {
          image: require('images/sample-category-1.png'),
          text: 'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!',
        },
        {
          image: require('images/sample-category-1.png'),
          text: 'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!',
        },
        {
          image: require('images/sample-category-1.png'),
          text: 'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!',
        },
      ]}
    />
  ))
  .add('DefaultBlueHeader', () => (
    <DefaultBlueHeader title={'Daftar Member'} iconLeft={closeIcon} />
  ))
  .add('DefaultHeader', () => (
    <DefaultHeader title={'Member'} iconLeft={backIcon} isLeftAligned={false} />
  ))
  .add('HeaderOptions', () => <HeaderOptions title={'CART'} options={'Selesai'} />)
  .add('DefaultFooter', () => <DefaultFooter buttonText={'OK'} />)
  .add('BorderlessDefaultCardView', () => (
    <BorderlessDefaultCardView
      icon={require('images/banefit-member-09.png')}
      title={'Sewa Mobil Self Drive'}
      description={'Dengan member, anda dapat mengakses layanan Self Drive'}
    />
  ))
  .add('ContactDriverCenter', () => <ContactDriverCenter />)
  .add('FilterArea', () => <FilterArea />)
  .add('Rating Star', () => <RatingStar />)
  .add('Timeline', () => <Timeline />)
  .add('FilterAirport', () => <FilterAirport />)
  .add('OkCancelButton', () => <OkCancelButton />)
  .add('CustomBottomSheet', () => <CustomBottomSheet title={'Urutkan berdasarkan'} />)
  .add('CardItemCarousel', () => (
    <CardItemCarousel
      items={[
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
          style: {
            flex: 1,
            paddingLeft: 8,
            ...Row.row_2_5,
            ...Column.col_11_5,
          },
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
          style: {
            flex: 1,
            paddingLeft: 8,
            ...Row.row_2_5,
            ...Column.col_11_5,
          },
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
          style: {
            flex: 1,
            paddingLeft: 8,
            ...Row.row_2_5,
            ...Column.col_11_5,
          },
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
          style: {
            flex: 1,
            paddingLeft: 8,
            ...Row.row_2_5,
            ...Column.col_11_5,
          },
        },
      ]}
    />
  ))
  .add('ListViewCardItem', () => (
    <ListViewCardItem
      items={[
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
          style: {
            flex: 1,
            ...Margin.mv_12,
            width: '88%',
          },
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
          style: {
            flex: 1,
            ...Margin.mv_12,
            width: '88%',
          },
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
          style: {
            flex: 1,
            ...Margin.mv_12,
            width: '88%',
          },
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
          style: {
            flex: 1,
            ...Margin.mv_12,
            ...Row.row_2_5,
            width: '88%',
          },
        },
      ]}
      isCart={true}
    />
  ))
  .add('ListViewCardLocation', () => <ListViewCardLocation />)
  .add('ListViewCardOrder', () => <ListViewCardOrder />)
  .add('CustomTopSheet', () => (
    <CustomTopSheet>
      <FilterArea border={false} footer={false} searchButtonEnabled={true} />
    </CustomTopSheet>
  ))
  .add('SortFilterButton', () => <SortFilterButton />)
  .add('ModalTermsAndCondition', () => <ModalTermsAndCondition />)
  .add('ModalOrderCancelConfirm', () => <ModalOrderCancelConfirm />)
  .add('TermsAndCondition', () => <TermsAndCondition />)
  .add('DetailInfoSection', () => <DetailInfoSection />)
  .add('PaymentDetailContent', () => <PaymentDetailContent />)
  .add('ContactCenterSection', () => <ContactCenterSection />)
  .add('Default Header', () => (
    <DefaultHeader title={'Member'} iconLeft={backIcon} isLeftAligned={false} />
  ))
  .add('Default Blue Header', () => (
    <DefaultBlueHeader title={'Daftar Member'} iconLeft={closeIcon} />
  ))
  .add('Default Footer', () => <DefaultFooter buttonText={'OK'} />)
  .add('List Item Animation', () => <ListItemAnimation onCheck={(a) => console.log(a)} />)
  .add('Credit Card List', () => <CreditCardList />)
  .add('Card Check List', () => (
    <CardCheckList
    //onCheck={(a) => console.log(a)}
    />
  ))
  .add('Check Out Footer', () => (
    <CheckOutFooter
    //onCheck={(a) => console.log(a)}
    />
  ))
  .add('Virtual Account List', () => (
    <VirtualAccountList
    //onCheck={(a) => console.log(a)}
    />
  ))
  .add('Borderless Card View', () => (
    <BorderlessDefaultCardView
      icon={require('images/banefit-member-09.png')}
      title={'Sewa Mobil Self Drive'}
      description={'Dengan member, anda dapat mengakses layanan Self Drive'}
    />
  ))
  .add('VoucherFooter', () => <VoucherFooter />)
  .add('PaymentSelect', () => <PaymentSelect />)
  .add('FacilityFlexIcons', () => <FacilityFlexIcons />)
  .add('PersonInfoPanel', () => <PersonInfoPanel />)
  .add('DefaultOkCancelFooter', () => <DefaultOkCancelFooter />)
  .add('Button List Item', () => (
    <ListItem
      imageSource={require('icons/ic_center.png')}
      title={'Help Center'}
      body={'Solusi terbaik dan menghubungi kami'}
    />
  ))

  .add('Blue CardButton', () => (
    <BlueCardButton
      label={'DATA MEMBER'}
      desc={'Anda mempunyai 2 Banefit'}
      arrow={true}
      imageSource={{
        uri:
          'https://cdn.zeplin.io/5e29ad5448bfce96eef74049/assets/dea2c681-bc35-4968-bf1d-76140ee72245.png',
      }}
    />
  ))
  .add('ListViewCardLocationSelfDrive', () => <ListViewCardLocationSelfDrive />)

  .add('ListView Notification', () => (
    <ListViewNotification
    items={[
      {
        titleText: 'Judul Update',
        contentText: 'Deskirpsi update Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit',
        dateText: Date.now()
      },
      {
        titleText: 'Judul Update',
        contentText: 'Deskirpsi update Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit',
        dateText: Date.now()
      },
      {
        titleText: 'Judul Update',
        contentText: 'Deskirpsi update Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit',
        dateText: Date.now()
      }
    ]}></ListViewNotification>
  ))

  .add('Timeline Molecule', () => <TimelineMolecule />)

storiesOf('Organism/MemberRegistrationScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('Member Registration Screen', () => <MemberRegistrationScreen />)

storiesOf('Organism/KYCOTPScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('KYC OTP Screen', () => <KYCOTPScreen />)
storiesOf('Organism/KYCSuccessScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('KYC Success Screen', () => <KYCSuccessScreen />)
storiesOf('Organism/KYCPhoneInputScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('KYC Phone Screen', () => <KYCPhoneInputScreen />)
storiesOf('Organism/KYCImageScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('KYC Image Screen', () => <KYCImageScreen />)
storiesOf('Organism/PaymentScreen', module).add('Payment Screen', () => <PaymentScreen />)

storiesOf('Organism/CartScreen', module)
  .add('Cart Screen', () => <CartScreen />)
  .add('Cart Detail Screen / Checkout Screen', () => <CheckOutScreen />)

storiesOf('Organism/LoginScreen', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Login Screen', () => <LoginScreen />)
storiesOf('Organism/RegisterScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('Register Screen', () => <RegisterScreen />)
  .add('Register Verification', <RegisterVerification />)
storiesOf('Organism/HomeScreen', module)
  .addDecorator((getStory) => <TopView>{getStory()}</TopView>)
  .add('Sample Home Screen', () => (
    <HomeScreen
      promos={[
        {
          image: require('images/sample-promo-1.png'),
        },
        {
          image: require('images/sample-promo-1.png'),
        },
        {
          image: require('images/sample-promo-1.png'),
        },
      ]}
      categories={[
        {
          image: require('images/sample-category-2.jpg'),
          text: 'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!',
        },
        {
          image: require('images/sample-category-2.jpg'),
          text: 'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!',
        },
        {
          image: require('images/sample-category-2.jpg'),
          text: 'Cukup siapkan KTP & SIM, Dapatkan banyaknya banefit dari kami!',
        },
      ]}
    />
  ))
  .add('Member Registration Screen', () => <MemberRegistrationScreen />)
  .add('KYC OTP Screen', () => <KYCOTPScreen />)
  .add('KYC Success Screen', () => <KYCSuccessScreen />)
  .add('KYC Phone Screen', () => <KYCPhoneInputScreen />)
storiesOf('Organism/CarRentalScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('Car Rental Filter Screen', () => <CarRentalFilterScreen />)
  .add('Product List Screen', () => <ProductListScreen />)
  .add('DetailItemWithDriver', () => <DetailItemWithDriver />)
  .add('DetailItemSelfDrive', () => <DetailItemSelfDrive />)
  .add('PickUpLocationScreen', () => <PickUpLocationScreen />)
  .add('SelfDrivePickLocationScreen', () => <SelfDrivePickLocationScreen />)
storiesOf('Organism/AirportTransferScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('AirportFilterScreen', () => <AirportFilterScreen />)
  .add('DetailItemAirport', () => <DetailItemAirport />)
storiesOf('Organism/ProfileScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('Main Profile Screen', () => <ProfileScreen />)
  .add('Detail Profile Screen', () => <ProfileEditor />)
  .add('Edit Phone Screen', () => <ProfileEditPhoneScreen />)
  .add('Member Screen', () => <MemberScreen />)
  .add('Verifikasi KYC', ()=> <VerifikasiKYC />)
storiesOf('Organism/MyOrderScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('MyOrderListScreen', () => <MyOrderListScreen />)
  .add('DetailItemMyOrder', () => <DetailItemMyOrder />)
  .add('MyOrderCancelScreen', () => <MyOrderCancelScreen />)
  .add('DetailOrderRefund', () => <DetailOrderRefund />)
  .add('DetailItemOrderProgress', () => <DetailItemOrderProgress />)
storiesOf('Organism/NotificationScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('Notification Screen', () => <NotificationScreen />)
storiesOf('Organism/RatingScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('Rating Screen', () => <RatingScreen />)
storiesOf('Organism/PaymentSuccessScreen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('Payment Success Screen', () => <PaymentSuccessScreen />)
storiesOf('Organism/Test Develop Screen', module)
  .addDecorator((getStory) => <CenterViewNoPadding>{getStory()}</CenterViewNoPadding>)
  .add('Testing Screen', () => <TestingScreen />)
