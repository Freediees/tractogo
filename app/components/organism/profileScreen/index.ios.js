import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Modal, Text } from 'react-native'
import ButtonCard from 'components/molecules/buttonCard'
import DefaultHeader from 'components/molecules/defaultHeader'
import ListItem from 'components/molecules/listItem'
import HeaderProfile from 'components/molecules/headerProfile'
import ModalTermsAndCondition from 'components/molecules/modalTermsAndCondition'
import ModalProfile from 'components/molecules/modalProfile'
import { Fonts, ImageSize, Margin, Padding, Flex } from 'theme'
import { change } from 'redux-form'

export default function ProfileScreen({
  navigation,
  title,
  fullName,
  email,
  phoneNo,
  editLabel,
  onEdit,
  onCardPress,
  memberLabel,
  memberDesc,
  imgMember,
  avatarImg,
  moveToDetail,
  moveToMember,
  dataList,
  modalContent,
  modalVisible,
  toggleModal,
}) {
  //const [modalVisible, setModalVisible] = useState(false)

  // const changeModalVisible = (value) => {
  //   setModalVisible(value)
  // }

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <DefaultHeader border={true} title={title} />

      <View style={{ flex: 9 }}>
        <View style={{ ...Flex.flex_3, width: '100%' }}>
          <HeaderProfile
            imageSource={avatarImg}
            fullName={fullName}
            email={email}
            phoneNo={phoneNo}
            editLabel={'Change'}
            onEdit={moveToDetail}
          >
            <View
              style={{
                width: '100%',
                borderBottomLeftRadius: 100,
                borderBottomRightRadius: 100,
                backgroundColor: 'rgb(230,237,255)',
                height: 50,
              }}
            >
              <ButtonCard
                onPress={moveToMember.bind(this)}
                label={'Verified your member'}
                desc={' '}
                arrow={true}
                imageSource={imgMember}
              />
            </View>
          </HeaderProfile>
        </View>

        <View style={{ ...Flex.flex_9 }}>
          <View>
            {dataList.map((a, i) => {
              return (
                <ListItem
                  style={{ width: '100%' }}
                  key={i}
                  imageSource={a.imageSource}
                  title={a.title}
                  body={a.body}
                  //onPress={a.pencet.bind(this)}
                  onPress={a.type == 'modal' ? a.onPress.bind(this) : a.onPress.bind(this)}
                  //onPress={changeModalVisible.bind(this, true)}
                />
              )
            })}
          </View>
        </View>
      </View>

      {/* <ModalTermsAndCondition modalVisible={modalVisible} changeModalVisible={changeModalVisible} /> */}
      <ModalProfile visible={modalVisible} toggleModal={toggleModal}>
        {modalContent}
      </ModalProfile>
    </View>
  )
}

ProfileScreen.defaultProps = {
  moveToMember: () => {},
  moveToDetail: () => {},
  title: 'My Account',
  fullName: ' - ',
  email: ' - ',
  phoneNo: ' - ',
  editLabel: 'Change',
  onGoogleLoginSuccess: false,
  memberLabel: 'Verified your member',
  memberDesc: ' ',
  avatarImg: require('icons/ic-deafult profile.svg'),
  imgMember: {
    uri:
      'https://cdn.zeplin.io/5e29ad5448bfce96eef74049/assets/dea2c681-bc35-4968-bf1d-76140ee72245.png',
  },
  dataList: [],
  onHelpCenter: () => {},
  onTearmCondition: () => {},
  onPrivate: () => {},
  onSetting: () => {},
  onLogout: () => {},
  modalVisible: false,
}

ProfileScreen.propTypes = {
  title: PropTypes.string.isRequired,
  fullName: PropTypes.string,
  email: PropTypes.string,
  phoneNo: PropTypes.string,
  editLabel: PropTypes.string,
  onEdit: PropTypes.func,
  memberLabel: PropTypes.string,
  memberDesc: PropTypes.string,
  imgMember: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  avatarImg: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  dataList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  datalist: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onCardPress: PropTypes.func,
  onListPress: PropTypes.func,
  onHelpCenter: PropTypes.func,
  onTearmCondition: PropTypes.func,
  onPrivate: PropTypes.func,
  onSetting: PropTypes.func,
  onLogout: PropTypes.func,
  moveToDetail: PropTypes.func,
  moveToMember: PropTypes.func,
  modalVisible: PropTypes.bool,
}
