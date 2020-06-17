import React from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

import DefaultHeader from 'components/molecules/defaultHeader'
import DefaultFooter from 'components/molecules/defaultFooter'
import TextAndImage from 'components/molecules/textAndPhoto'

import backIcon from 'icons/ic-back.svg'

export default function KYCImage({ navigation, title, onBack, onNext, ktp, listData }) {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
      <View style={{ flex: 1, paddingBottom: 10 }}>
        <DefaultHeader border={true} title={title} onIconLeftPress={onBack} iconLeft={backIcon} />
      </View>
      <View style={{ flex: 8 }}>
        {listData.map((a, i) => {
          return <TextAndImage label={a.label} imageUrl={a.imageUrl} onPress={a.onImage} />
        })}
      </View>

      <DefaultFooter buttonText={'Selanjutnya'} onButtonPress={onNext} />
    </View>
  )
}

KYCImage.defaultProps = {
  title: 'Image',
  onBack: () => {},
  ktp: {},
  onBack: () => {},
  onNext: () => {},
  listData: [
    {
      label: 'Foto Wajah',
      imageUrl: {
        uri:
          'https://www.digopaul.com/wp-content/uploads/related_images/2015/09/08/placeholder_2.jpg',
      },
    },
    {
      label: 'KTP',
      imageUrl: {
        uri:
          'https://www.digopaul.com/wp-content/uploads/related_images/2015/09/08/placeholder_2.jpg',
      },
    },
    {
      label: 'SIM',
      imageUrl: {
        uri:
          'https://www.digopaul.com/wp-content/uploads/related_images/2015/09/08/placeholder_2.jpg',
      },
    },
  ],
}

KYCImage.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  source: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  ktp: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  onBack: PropTypes.func,
  listData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}
