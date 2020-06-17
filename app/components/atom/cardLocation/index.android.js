import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { SvgXml } from 'react-native-svg'
import Moment from 'moment'
import ToggleSwitch from 'toggle-switch-react-native'
import CustomBottomSheet from 'components/molecules/customBottomSheet'
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

import Separator from 'components/atom/separator'
import CustomTimePicker from 'components/atom/customTimePicker'

import icFilterLocation from 'icons/ic-filter1.svg'
import startTimeIconInactive from 'icons/ic-filter2-inactive.svg'
import startTimeIcon from 'icons/ic-filter2.svg'



export default function CardLocation({
  onLocationTextPress,
  locationDetailLabel,
  location,
  changeLocation,
  notesPlaceholder,
  locationPlaceholder,
  date,
  notes,
  onNoteChange,
  style,
  startTimeLabel,
  isStartTime,
  placeHolderStartTime,
  timeSufix,
  selectedHour,
  selectedMinute,
  changeSelectedHour,
  changeSelectedMinute,
  okLabel,
  cancelLabel,
  isToggle,
  dateBeforeLabel,
  dateBefore,
  locationBefore,
  changeToggle,
}) {
  const [checked, changeChecked] = useState(true)

  let bsTimePicker = null

  const onValueChange = (hour, minute) => {
    changeSelectedHour(hour)
    changeSelectedMinute(minute)
  }

  return (
    <View
      style={{
        ...CustomStyle.w_100,
        ...CustomStyle.shadow,
        ...Border.border_rad_8,
        ...Background.bg_white,
        ...Margin.mt_20,
      }}
    >
      <Text
        style={{
          ...Fonts.f_12,
          ...Fonts.bold,
          ...Padding.ph_20,
          ...Padding.pv_16,
        }}
      >
        {Moment(date)
          .format('dddd, DD MMMM YYYY')}
      </Text>
      <Separator style={{ ...Margin.mv_4 }} />
      {isToggle && (
        <View style={{ ...CustomStyle.w_100, alignItems: 'center', ...Flex.flex_row, ...Margin.mv_12, ...Padding.ph_20 }}>
          <View style={{ ...Flex.f_9 }}>
            <Text style={{ ...Fonts.f_10 }}>{`${dateBeforeLabel}${Moment(dateBefore)
              .format('DD MMM YY')}`}</Text>
          </View>
          <View style={{ ...Flex.f_1, ...Margin.ml_20 }}>
            <ToggleSwitch
              isOn={checked}
              onColor={Colors.blue}
              offColor={Colors.smoky_grey}
              size="small"
              onToggle={(isOn) => {
                changeChecked(isOn)
                if (isOn === true) {
                  changeToggle(true)
                  changeLocation(locationBefore)
                } else {
                  changeToggle(false)
                  changeLocation({
                    name: null,
                    lat: -6.2,
                    lon: 106.816666,
                  })
                }
              }}
            />
          </View>
        </View>
      )}
      {!isToggle && (
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
          <View style={{ ...CustomStyle.w_100, ...Margin.mt_12, ...Padding.ph_20 }}>
            <View style={{ ...Margin.mr_20 }}>
              {isStartTime && (
                <Fragment>
                  <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey, ...Fonts.semibold }}>
                    {startTimeLabel}
                  </Text>
                  <TouchableOpacity
                    disabled={!isToggle}
                    style={{ ...Margin.mt_12 }}
                    onPress={() => {
                      bsTimePicker.open()
                    }}
                  >
                    <View style={{ ...Flex.flex_row }}>
                      <View style={{ ...Padding.pl_8 }}>
                        <SvgXml
                          xml={isToggle ? startTimeIcon : startTimeIconInactive}
                          fill={Colors.light_grey}
                          width={20}
                          height={20}
                        />
                      </View>
                      <TextInput
                        placeholder={placeHolderStartTime}
                        editable={false}
                        onPress={() => {}}
                        value={`${selectedHour}.${selectedMinute} ${timeSufix}`}
                        placeholderTextColor={Colors.grey}
                        style={{ ...Fonts.f_12, ...Margin.ml_8 }}
                      />
                    </View>
                    <Separator style={{ ...Margin.mt_8 }} />
                  </TouchableOpacity>
                </Fragment>
              )}
            </View>
          </View>
          <View style={{ ...Padding.ph_20, ...Padding.pv_20 }}>
            <TextInput
              placeholder={notesPlaceholder}
              editable={true}
              value={notes}
              onChange={(value) => {
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
      )}
      {!checked && (
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
          <View style={{ ...CustomStyle.w_100, ...Margin.mt_12, ...Padding.ph_20 }}>
            <View style={{ ...Margin.mr_20 }}>
              {isStartTime && (
                <Fragment>
                  <Text style={{ ...Fonts.f_10, ...Fonts.text_smoky_grey, ...Fonts.semibold }}>
                    {startTimeLabel}
                  </Text>
                  <TouchableOpacity
                    disabled={!isToggle}
                    style={{ ...Margin.mt_12 }}
                    onPress={() => {
                      bsTimePicker.open()
                    }}
                  >
                    <View style={{ ...Flex.flex_row }}>
                      <View style={{ ...Padding.pl_8 }}>
                        <SvgXml
                          xml={isToggle ? startTimeIcon : startTimeIconInactive}
                          fill={Colors.light_grey}
                          width={20}
                          height={20}
                        />
                      </View>
                      <TextInput
                        placeholder={placeHolderStartTime}
                        editable={false}
                        onPress={() => {}}
                        value={`${selectedHour}.${selectedMinute} ${timeSufix}`}
                        placeholderTextColor={Colors.grey}
                        style={{ ...Fonts.f_12, ...Margin.ml_8 }}
                      />
                    </View>
                    <Separator style={{ ...Margin.mt_8 }} />
                  </TouchableOpacity>
                </Fragment>
              )}
            </View>
          </View>
          <View style={{ ...Padding.ph_20, ...Padding.pv_20 }}>
            <TextInput
              placeholder={notesPlaceholder}
              editable={true}
              value={notes}
              onChange={(value) => {
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
      )}
      <CustomBottomSheet title={placeHolderStartTime} botSheetRef={(ref) => (bsTimePicker = ref)}>
        <CustomTimePicker
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onValueChange={onValueChange}
          onOkPress={() => {
            if (bsTimePicker) {
              bsTimePicker.close()
            }
          }}
          onCancelPress={() => {
            if (bsTimePicker) {
              changeSelectedHour('09')
              changeSelectedMinute('00')
              bsTimePicker.close()
            }
          }}
        />
      </CustomBottomSheet>
    </View>
  )
}

CardLocation.defaultProps = {
  onLocationTextPress: () => {},
  locationDetailLabel: 'Detail Lokasi',
  location: {
    name: null,
    lat: -6.2,
    lon: 106.816666,
  },
  notesPlaceholder: 'Notes',
  locationPlaceholder: 'Pilih Lokasi',
  date: new Date(),
  notes: null,
  onNoteChange: () => {},
  style: {},
  startTimeLabel: 'Waktu Jemput',
  isStartTime: true,
  placeHolderStartTime: 'Pilih Waktu Jemput',
  timeSufix: 'WIB',
  selectedHour: '10',
  selectedMinute: '00',
  changeSelectedHour: () => {},
  changeSelectedMinute: () => {},
  okLabel: 'Simpan',
  cancelLabel: 'Batal',
  isToggle: true,
  dateBeforeLabel: 'Detail Lokasi sama dengan tanggal ',
  dateBefore: new Date().getTime() + 8640000,
  locationBefore: null,
  changeLocation: () => {},
  changeToggle: () => {},
}

CardLocation.propTypes = {
  onLocationTextPress: PropTypes.func,
  locationDetailLabel: PropTypes.string,
  location: PropTypes.shape({}),
  notesPlaceholder: PropTypes.string,
  locationPlaceholder: PropTypes.string,
  date: PropTypes.Date,
  notes: PropTypes.string,
  onNoteChange: PropTypes.func,
  style: PropTypes.shape({}),
  startTimeLabel: PropTypes.string,
  isStartTime: PropTypes.bool,
  placeHolderStartTime: PropTypes.string,
  timeSufix: PropTypes.string,
  selectedHour: PropTypes.string,
  selectedMinute: PropTypes.string,
  changeSelectedHour: PropTypes.func,
  changeSelectedMinute: PropTypes.func,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  isToggle: PropTypes.bool,
  dateBeforeLabel: PropTypes.string,
  dateBefore: PropTypes.date,
  locationBefore: PropTypes.shape({}),
  changeLocation: PropTypes.func,
  changeToggle: PropTypes.func,
}
