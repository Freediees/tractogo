import React, { useState, Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import { SvgXml } from 'react-native-svg'
import Moment from 'moment'
import { TouchableOpacity, Text, View, TextInput } from 'react-native'
import {
  Alignment,
  Background,
  Border,
  Padding,
  Fonts,
  Colors,
  Margin,
  Flex,
  CustomStyle,
} from 'theme'

import CustomLeftCheckAccordion from 'components/atom/customLeftCheckAccordion'
import IconMapView from 'components/atom/iconMapView'
import { isNumeric } from 'function'
import { LabelNumberFormat } from 'function/numberFormat'

import icFilterLocation from 'icons/ic-filter1.svg'



export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

export default function CardLocationSelfDrive({
  onLocationTextPress,
  locationDetailLabel,
  location,
  changeLocation,
  poolLocation,
  notesPlaceholder,
  locationPlaceholder,
  date,
  hour,
  minute,
  notes,
  onNoteChange,
  poolLabel,
  poolPrice,
  anotherLocationLabel,
  anotherLocationPrice,
  hourSufix,
  onItemPress,
  style,
  isPool,
  changeIsPool,
}) {
  const [checked, changeChecked] = useState([isPool, !isPool])

  const forceUpdate = useForceUpdate()

  return (
    <Fragment>
      <View
        style={{
          width: '100%',
        }}
      >
        <Text
          style={{
            ...Fonts.f_12,
            ...Fonts.bold,
            ...Padding.ph_4,
            ...Margin.mv_12,
          }}
        >
          {`${Moment(date)
            .format('dddd, DD MMMM YYYY')} | ${hourSufix} ${hour}:${minute}`}
        </Text>
      </View>
      <View
        style={{
          ...CustomStyle.w_100,
          ...CustomStyle.shadow,
          ...Border.border_rad_8,
          ...Background.bg_white,
          ...Margin.mt_8,
        }}
      >
        <CustomLeftCheckAccordion
          renderHeader={() => {
            return (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ ...Fonts.f_12 }}>{poolLabel}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  {isNumeric(poolPrice) && parseInt(poolPrice) > 0 ? (
                    <LabelNumberFormat
                      number={poolPrice}
                      style={{ ...Fonts.text_green, ...Fonts.f_12 }}
                    />
                  ) : (
                    <Text style={{ ...Fonts.text_green, ...Fonts.f_12 }}>{'Free'}</Text>
                  )}
                </View>
              </View>
            )
          }}
          checked={isPool}
          changeChecked={() => {
            if (isPool === false) {
              changeIsPool(true)
              onItemPress()
              forceUpdate()
            }
          }}
          onChecklistPress={() => {
            onItemPress()
            if (isPool === true) {
              changeLocation(poolLocation)
            }
          }}
        >
          <View
            style={{
              ...Padding.ph_4,
              ...Padding.pv_12,
              ...Background.bg_light_grey,
              ...Border.border_rad_4,
              ...Border.border_blue,
              ...Border.border_w_1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1, ...Margin.mh_8, height: 56 }}>
              <IconMapView location={poolLocation} />
            </View>
            <View style={{ flex: 3, flexDirection: 'column' }}>
              <Text style={{ ...Fonts.semibold, ...Fonts.f_12 }}>{poolLocation.name}</Text>
              <Text style={{ ...Fonts.f_12, ...Margin.mt_4 }}>{poolLocation.address}</Text>
            </View>
          </View>
        </CustomLeftCheckAccordion>
        <CustomLeftCheckAccordion
          renderHeader={() => {
            return (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ ...Fonts.f_12 }}>{anotherLocationLabel}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  {isNumeric(anotherLocationPrice) && parseInt(anotherLocationPrice) > 0 ? (
                    <LabelNumberFormat
                      number={anotherLocationPrice}
                      style={{ ...Fonts.text_green, ...Fonts.f_12 }}
                    />
                  ) : (
                    <Text style={{ ...Fonts.text_green, ...Fonts.f_12 }}>{'Free'}</Text>
                  )}
                </View>
              </View>
            )
          }}
          checked={!isPool}
          changeChecked={() => {
            if (isPool === true) {
              changeIsPool(false)
              onItemPress()
              forceUpdate()
            }
          }}
          onChecklistPress={() => {
            onItemPress()
            if (isPool === false) {
              changeLocation({
                name: null,
                lat: -6.2,
                lon: 106.816666,
              })
            }
          }}
        >
          <Fragment>
            <Text
              style={{
                ...Fonts.f_10,
                ...Fonts.bold,
                ...Fonts.text_smoky_grey,
                ...Padding.ph_20,
                ...Padding.pt_8,
                ...Padding.pb_12,
              }}
            >
              {locationDetailLabel}
            </Text>
            <View style={{ ...CustomStyle.w_100, ...Padding.ph_20 }}>
              <TouchableOpacity
                style={{ ...Margin.mt_4 }}
                onPress={() => {
                  onLocationTextPress()
                }}
              >
                <View
                  style={{
                    ...Flex.flex_row,
                    ...CustomStyle.w_100,
                    ...Alignment.align_center,
                    ...Padding.ph_8,
                    ...Padding.pv_4,
                    ...Border.border_w_1,
                    ...Border.border_light_grey,
                    ...Border.border_rad_4,
                  }}
                >
                  <View style={{ ...Flex.f_1 }}>
                    <SvgXml xml={icFilterLocation} width={20} height={20} />
                  </View>
                  <View style={{ ...Flex.f_11 }}>
                    <TextInput
                      placeholder={locationPlaceholder}
                      editable={false}
                      value={location ? location.name : null}
                      onPress={() => {}}
                      placeholderTextColor={Colors.grey}
                      style={{ ...Fonts.f_12, ...Margin.ml_8 }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ ...Padding.ph_20, ...Padding.pv_20 }}>
              <TextInput
                placeholder={notesPlaceholder}
                editable={true}
                value={notes}
                onChangeText={(value) => {
                  onNoteChange(value)
                }}
                placeholderTextColor={Colors.grey}
                style={{
                  ...Fonts.f_12,
                  ...Padding.ph_4,
                  ...Padding.pb_8,
                  ...Border.border_b_1,
                  ...Border.border_bottom_light_grey,
                }}
              />
            </View>
          </Fragment>
        </CustomLeftCheckAccordion>
      </View>
    </Fragment>
  )
}

CardLocationSelfDrive.defaultProps = {
  onLocationTextPress: () => {},
  locationDetailLabel: 'Detail Lokasi',
  location: {
    name: null,
    lat: -6.2,
    lon: 106.816666,
  },
  poolLocation: {
    address: 'jalan jalan',
    name: 'Bandung',
    lat: -6.2,
    lon: 106.816666,
  },
  notesPlaceholder: 'Notes',
  locationPlaceholder: 'Select Location',
  date: new Date(),
  notes: null,
  onNoteChange: () => {},
  style: {},
  hourSufix: 'Hour',
  hour: '10',
  minute: '00',
  changeLocation: () => {},
  poolLabel: 'Pool',
  poolPrice: 0,
  anotherLocationLabel: 'Another Location',
  anotherLocationPrice: 0,
  onItemPress: () => {},
  isPool: true,
  changeIsPool: () => {},
}

CardLocationSelfDrive.propTypes = {
  onLocationTextPress: PropTypes.func,
  locationDetailLabel: PropTypes.string,
  location: PropTypes.shape({}),
  poolLocation: PropTypes.shape({}),
  notesPlaceholder: PropTypes.string,
  locationPlaceholder: PropTypes.string,
  date: PropTypes.Date,
  notes: PropTypes.string,
  onNoteChange: PropTypes.func,
  style: PropTypes.shape({}),
  startTimeLabel: PropTypes.string,
  isStartTime: PropTypes.bool,
  placeHolderStartTime: PropTypes.string,
  hourSufix: PropTypes.string,
  hour: PropTypes.string,
  minute: PropTypes.string,
  changeLocation: PropTypes.func,
  poolLabel: PropTypes.string,
  poolPrice: PropTypes.number,
  anotherLocationLabel: PropTypes.string,
  anotherLocationPrice: PropTypes.number,
  onItemPress: PropTypes.func,
  isPool: PropTypes.bool,
  changeIsPool: PropTypes.func,
}
