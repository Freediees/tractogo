import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView, Text } from 'react-native';
import DefaultHeader from 'components/molecules/defaultHeader';
import DefaultFooter from 'components/molecules/defaultFooter';
import ListViewCardLocation from 'components/molecules/listViewCardLocation';

import { Column, Margin, Fonts, Colors, Padding, Row } from 'theme';

import backIcon from 'icons/ic-back.svg';
import editIcon from 'icons/ic-edit.svg';

export default function PickUpLocationScreen({ 
    onIconLeftPress,
    title,
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
    predictions,
    saveButtonLabel,
    onSaveButtonPress,
    onCloseIconPress,
}) {

    return <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
            <DefaultHeader border={true} title={title} iconLeft={backIcon} onIconLeftPress={ onIconLeftPress }>
            </DefaultHeader>
            <View style={{ flex: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <ListViewCardLocation
                    items={items}
                    changeItems={changeItems}
                    locationDetailLabel={locationDetailLabel}
                    notesPlaceholder={notesPlaceholder}
                    locationPlaceholder={locationPlaceholder}
                    placeHolderStartTime={placeHolderStartTime}
                    timeSufix={timeSufix}
                    okLabel={okLabel}
                    cancelLabel={cancelLabel}
                    startTimeLabel={startTimeLabel}
                    dateBeforeLabel={dateBeforeLabel}
                    keyword={keyword}
                    changeKeyword={changeKeyword}
                    predictionItemClick={predictionItemClick}
                    requestSearchPrediction={requestSearchPrediction}
                    keywordPlaceholder={keywordPlaceholder}
                    predictions={predictions}
                    onCloseIconPress={onCloseIconPress}
                />
            </View>
            <DefaultFooter 
                buttonText={saveButtonLabel}
                onButtonPress={onSaveButtonPress}
            />
        </View>;
}

PickUpLocationScreen.defaultProps = {
    onIconLeftPress: () => {},
    title: 'Pick-up location',
    items: [
        {
          date: new Date(),
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
          date: new Date().getTime() + 86400000,
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
    locationPlaceholder: 'Select Location',
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
    keywordPlaceholder: 'Find Location',
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
saveButtonLabel: 'Simpan',
onSaveButtonPress: () => {},
onCloseIconPress: () => {},
};

PickUpLocationScreen.propTypes = {
    onIconLeftPress: PropTypes.func,
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})), 
    changeItems: PropTypes.func,
    style: PropTypes.shape({}),
    locationDetailLabel: PropTypes.string,
    notesPlaceholder: PropTypes.string,
    locationPlaceholder: PropTypes.string,
    placeHolderStartTime: PropTypes.string,
    timeSufix: PropTypes.string,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    startTimeLabel: PropTypes.string,
    dateBeforeLabel: PropTypes.string,
    keyword: PropTypes.string,
    changeKeyword: PropTypes.func,
    predictionItemClick: PropTypes.func,
    requestSearchPrediction: PropTypes.func,
    keywordPlaceholder: PropTypes.string,
    predictions: PropTypes.arrayOf(PropTypes.shape({})), 
    saveButtonLabe: PropTypes.string,
    onSaveButtonPress: PropTypes.func,
    onCloseIconPress: PropTypes.func,
};