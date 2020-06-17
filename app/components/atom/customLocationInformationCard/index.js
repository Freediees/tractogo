import React from 'react'

import { View, Text, TextInput } from 'react-native'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

import { Fonts, Padding, Margin, Background, Colors, Border } from 'theme'
import Separator from 'components/atom/separator'
import TextButton from 'components/atom/textButton'

import startTimeIcon from 'icons/ic-filter2.svg'
import iconCurrentLocation from 'icons/ic-filter1.svg'
import iconEdit from 'icons/ic-edit.svg'

export default function CustomLocationInformationCard({
  title,
  style,
  editLabel,
  onEditPress,
  dateString,
  timeString,
  locationName,
  isAirport,
  pickupNotes,
  onChangePickupNotes,
  placeholderPickupNotes,
  isFromAirport,
}) {
  return (
    <View
      style={{
        ...Background.bg_white,
        ...Padding.pv_16,
        ...style,
      }}
    >
      <View style={{ width: '100%', flexDirection: 'column' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            ...Padding.ph_16,
          }}
        >
          <View
            style={{
              flex: 8,
              ...Padding.pl_16,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Text style={{ ...Fonts.f_12, ...Fonts.semibold }}>{title}</Text>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: 'flex-end',
              justifyContent: 'center',
              ...Padding.pr_16,
            }}
          >
            <TextButton text={editLabel} onPress={onEditPress} />
          </View>
        </View>
        <Separator style={{ ...Margin.mv_8, padding: 0 }} />
        <View
          style={{
            ...Padding.ph_16,
          }}
        >
          {isAirport ? (
            <View
              style={{
                ...Padding.ph_16,
                flexDirection: 'column',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ alignItems: 'flex-start', ...Margin.mr_20 }}>
                  <Text style={{ ...Fonts.f_10, ...Fonts.semibold, ...Margin.mv_12 }}>
                    {dateString}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'flex-end', ...Margin.mh_20 }}>
                  <SvgXml xml={startTimeIcon} height={16} width={16} />
                  <Text style={{ ...Fonts.f_10, ...Margin.ml_12 }}>{timeString}</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', ...Margin.mr_20 }}>
                  <SvgXml xml={iconCurrentLocation} height={16} width={16} />
                  <Text style={{ ...Fonts.f_10, ...Margin.ml_12 }}>{locationName}</Text>
                </View>
              </View>
              {!isFromAirport ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...Margin.mr_20,
                    ...Margin.mt_20,
                  }}
                >
                  <SvgXml xml={iconEdit} height={24} width={24} />
                  <TextInput
                    style={{
                      width: '100%',
                      ...Fonts.f_10,
                      ...Margin.ml_12,
                      borderBottomColor: Colors.grey,
                      borderBottomWidth: 1,
                      ...Padding.pb_8,
                    }}
                    placeholder={placeholderPickupNotes}
                    value={pickupNotes}
                    onChangeText={onChangePickupNotes}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
          ) : (
            <View
              style={{
                ...Padding.ph_16,
                flexDirection: 'column',
              }}
            >
              <Text style={{ ...Fonts.f_10, ...Fonts.semibold, ...Margin.mv_12 }}>
                {dateString}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', ...Margin.mr_20 }}>
                  <SvgXml xml={iconCurrentLocation} height={16} width={16} />
                  <Text style={{ ...Fonts.f_10, ...Margin.ml_12 }}>{locationName}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', ...Margin.mh_20 }}>
                  <SvgXml xml={startTimeIcon} height={16} width={16} />
                  <Text style={{ ...Fonts.f_10, ...Margin.ml_12 }}>{timeString}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

CustomLocationInformationCard.defaultProps = {
  title: 'Informasi Layanan',
  children: null,
  editLabel: 'Ubah',
  onEditPress: () => {},
  style: {},
  dateString: 'Senin, 26 Januari 2020',
  locationName: 'Jl. Dago No. 28',
  timeString: '11.00',
  isAirport: false,
  pickupNotes: '',
  onChangePickupNotes: () => {},
  placeholderPickupNotes: 'Eg. House Number, etc',
  isFromAirport: true,
}

CustomLocationInformationCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  editLabel: PropTypes.string,
  onEditPress: PropTypes.func,
  style: PropTypes.shape({}),
  dateString: PropTypes.string,
  locationName: PropTypes.string,
  timeString: PropTypes.string,
  isAirport: PropTypes.bool,
  pickupNotes: PropTypes.string,
  onChangePickupNotes: PropTypes.func,
  placeholderPickupNotes: PropTypes.string,
  isFromAirport: PropTypes.bool,
}
