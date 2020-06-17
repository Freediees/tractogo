import React from 'react'

import { View, Text, TextInput } from 'react-native'
import { SvgXml } from 'react-native-svg'
import PropTypes from 'prop-types'

import { Fonts, Padding, Margin, Background, Colors, Border } from 'theme'
import Separator from 'components/atom/separator'
import TextButton from 'components/atom/textButton'

import iconAirport from 'icons/ic-airporttransport.svg'
import iconEdit from 'icons/ic-edit.svg'

export default function CustomLocationArrived({
  title,
  notesLabel,
  style,
  editLabel,
  isEdit,
  onEditPress,
  airportName,
  placeholderNumber,
  placeholderFlight,
  gateNumber,
  flightNumber,
  onChangeGateNumber,
  onChangeFlightNumber,
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
        </View>
        <Separator style={{ ...Margin.mv_8, padding: 0 }} />
        <View
          style={{
            ...Padding.ph_16,
          }}
        >
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
                ...Margin.mr_20,
                ...Margin.mv_16,
              }}
            >
              <SvgXml xml={iconAirport} height={24} width={24} />
              <Text style={{ ...Fonts.f_10, ...Margin.ml_12 }}>{airportName}</Text>
            </View>
            {isEdit && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...Margin.mr_20,
                    ...Margin.mv_8,
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
                      ...Padding.pv_8,
                    }}
                    placeholder={placeholderNumber}
                    value={gateNumber}
                    onChangeText={onChangeGateNumber}
                  />
                </View>
                <View
                  style={{
                    ...Background.bg_ice_blue,
                    ...Margin.mv_16,
                    ...Border.border_rad_8,
                    ...Padding.pv_12,
                    ...Padding.ph_16,
                  }}
                >
                  <Text style={{ textAlign: 'left', ...Fonts.f_10, ...Margin.ml_16 }}>
                    {notesLabel}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...Margin.mr_20,
                    ...Margin.mv_8,
                  }}
                >
                  <SvgXml xml={iconAirport} height={24} width={24} />
                  <TextInput
                    style={{
                      width: '100%',
                      ...Fonts.f_10,
                      ...Margin.ml_12,
                      borderBottomColor: Colors.grey,
                      borderBottomWidth: 1,
                      ...Padding.pb_8,
                    }}
                    placeholder={placeholderFlight}
                    value={flightNumber}
                    onChangeText={onChangeFlightNumber}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

CustomLocationArrived.defaultProps = {
  title: 'Pickup Details',
  notesLabel: 'Fill the flight number for driver waits if there`s a flight delay',
  children: null,
  editLabel: 'Ubah',
  isEdit: true,
  onEditPress: () => {},
  style: {},
  airportName: 'Bandar Soekarno Hatta',
  placeholderNumber: 'Example : Gate Number Arrived',
  placeholderFlight: 'Flight Number',
  gateNumber: 'G-19',
  flightNumber: 'BA192',
  onChangeGateNumber: () => {},
  onChangeFlightNumber: () => {},
}

CustomLocationArrived.propTypes = {
  title: PropTypes.string,
  notesLabel: PropTypes.string,
  children: PropTypes.node,
  editLabel: PropTypes.string,
  onEditPress: PropTypes.func,
  style: PropTypes.shape({}),
  airportName: PropTypes.string,
  placeholderNumber: PropTypes.string,
  placeholderFlight: PropTypes.string,
  gateNumber: PropTypes.string,
  flightNumber: PropTypes.string,
  onChangeGateNumber: PropTypes.func,
  onChangeFlightNumber: PropTypes.func,
}
