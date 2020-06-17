import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, ScrollView, Alert } from 'react-native';
import CardLocation from 'components/atom/cardLocation';
import CustomLocationPicker from 'components/atom/customLocationPicker';
import { Padding, Margin, Column } from 'theme';

export default function ListViewCardLocation({ 
  items, 
  changeItems,
  style,
  locationDetailLabel,
  notesPlaceholder,
  locationPlaceholder,
  placeHolderStartTime,
  timeSufix,
  okLabel,
  cancelLabel,
  startTimeLabel,
  dateBeforeLabel,
  keyword,
  changeKeyword,
  predictionItemClick,
  requestSearchPrediction,
  keywordPlaceholder,
  locationPlaceHolder,
  predictions,
  onCloseIconPress,
}) {
  const [ modalLocationPicker, changeModalLocationPicker ] = useState(false);
  const [ selectedIndex, changeSelectedIndex ] = useState(0);

  const changeItemLocation = (index, newLocation) => {
    let temp = items;
    temp[index].location = newLocation;
    changeItems(temp);
  }

  const changePlaceDetail = (val, index) => {
    predictionItemClick(val, index)
  }

  const changeItemToggle = (index, val) => {
    let temp = items
    temp[index].toggle = val
    changeItems(temp)
  }

  return <View style={{ flex: 1, 
    alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
      <CustomLocationPicker 
        onCloseIconPress={onCloseIconPress}
        modalVisible={modalLocationPicker} 
        changeModalVisible={changeModalLocationPicker}
        keyword={keyword}
        changeKeyword={changeKeyword}
        requestSearchPrediction={requestSearchPrediction}
        keywordPlaceholder={keywordPlaceholder}
        predictions={predictions}
        predictionItemClick={(v) => {
          changePlaceDetail(v, selectedIndex)
        }}
        locationPlaceHolder={locationPlaceholder}
        location={items && items[selectedIndex] ? items[selectedIndex].location : null}
        changeLocation={location => {
          changeItemLocation(selectedIndex, location)
        }}
        latitude={items && items[selectedIndex] && items[selectedIndex].location ? items[selectedIndex].location.lat : 0}
        longitude={items && items[selectedIndex] && items[selectedIndex].location ? items[selectedIndex].location.lon : 0}
      />
  <ScrollView
    style={{
      ...Column.col_12,
      ...Padding.ph_20,
    }}
   >
     {
       items && items.map((v, i)=>{
         return (
            <CardLocation  
              onLocationTextPress={ ()=> {
                changeSelectedIndex(i);
                changeModalLocationPicker(true);
              }}
              locationDetailLabel={locationDetailLabel}
              location={v.location}
              changeLocation={(location) => {
                changeItemLocation(i, location);
              }}
              changeToggle={(val) => {
                changeItemToggle(i, val);
              }}
              notesPlaceholder={notesPlaceholder}
              locationPlaceholder={locationPlaceholder}
              date={v.date}
              notes={v.notes}
              onNoteChange={(text) => {
                let temp = items;
                temp[i].notes = text;
                changeItems(temp);
              }}
              startTimeLabel={startTimeLabel}
              isStartTime
              placeHolderStartTime={placeHolderStartTime}
              timeSufix={timeSufix}
              selectedHour={v.hour}
              selectedMinute={v.minute}
              changeSelectedHour={(val) => {
                let temp = items;
                temp[i].hour = val;
                changeItems(temp);
              }}
              changeSelectedMinute={(val) => {
                let temp = items;
                temp[i].minute = val;
                changeItems(temp);
              }}
              okLabel={okLabel}
              cancelLabel={cancelLabel}
              isToggle={i > 0 ? true : false}
              dateBeforeLabel={dateBeforeLabel}
              dateBefore={i > 0 ? items[0].date : null}
              locationBefore={i > 0 ? items[0].location : null}
            />
         );
       })
     }
  </ScrollView>
</View>;
}

ListViewCardLocation.defaultProps = {
  items: [
    {
      date: new Date(),
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: null,
        lon: null
      }
    },
    {
      date: new Date().getTime() + 86400000,
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: null,
        lon: null
      }
    },
    {
      date: new Date().getTime() + (86400000*2),
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: -6.2,
        lon: 106.816666,
      }
    },
    {
      date: new Date().getTime() + (86400000*3),
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: -6.2,
        lon: 106.816666,
      }
    },
    {
      date: new Date().getTime() + (86400000*4),
      notes: null,
      hour: '11',
      minute: '00',
      location: {
        name: null,
        lat: -6.2,
        lon: 106.816666,
      }
    }
  ],
  changeItems: () => {},
  style: {},
  locationDetailLabel: 'Detail Lokasi',
  notesPlaceholder: 'Notes',
  locationPlaceholder: 'Pilih Lokasi',
  placeHolderStartTime: 'Pilih Waktu Jemput',
  timeSufix: 'WIB',
  okLabel: 'Simpan',
  cancelLabel: 'Batal',
  startTimeLabel: 'Waktu Jemput',
  dateBeforeLabel: 'Detail Lokasi sama dengan tanggal ',
  keyword: null,
  changeKeyword: () => {},
  predictionItemClick: () => {},
  requestSearchPrediction: () => {},
  keywordPlaceholder: 'Cari Lokasi',
  locationPlaceHolder: '-',
  predictions: [
    {
      description: "Satelit Town Square, Jalan Raya Sukomanunggal Jaya, Sukomanunggal, Surabaya, Jawa Timur, Indonesia",
      terms: [
        {
          "offset": 0,
          "value": "Satelit Town Square"
        },
        {
          "offset": 1,
          "value": "Jalan Raya Sukomanunggal Raya"
        },
      ],
      place_id: "ChIJg1vHPBz81y0RnqoxVuGVA4A"
    },
    {
      description: "Satelit Makmur, Tanjungsari, Surabaya, Jawa Timur, Indonesia",
      terms: [
        {
          "offset": 0,
          "value": "Satelit Makmur"
        },
        {
          "offset": 1,
          "value": "Tanjungsari"
        },
      ],
      place_id: "ChIJyaqq6p_-1y0RsAAIPAKBOkc"
    },
    {
      description: "Satelit Cell, Jalan Putat Jaya Lebar C, Putat Jaya, Surabaya, Jawa Timur, Indonesia",
      terms: [
        {
          "offset": 0,
          "value": "Satelit Cell"
        },
        {
          "offset": 14,
          "value": "Jalan Putat Jaya Lebar C"
        },
      ],
      place_id: "ChIJQwx6G_f71y0RgAvi8rajdOA"
    }
  ],
  onCloseIconPress: () => {},
};

ListViewCardLocation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  onCloseIconPress: PropTypes.func,
};
