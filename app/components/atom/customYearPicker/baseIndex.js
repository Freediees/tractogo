import React, { useState } from 'react';
import PropTypes from 'prop-types';
const wheelPickerData = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
];


export default function BaseIndex({
    datasource,
    onSelectItem

}) {

    const [selectedItem, setSelectedItem] = useState(0);

    onItemSelected = selectedItem => {
        setSelectedItem(selectedItem);
        onSelectItem(selectedItem)
    };

    onPress = () => {
        setSelectedItem(3);

    };
}



BaseIndex.defaultProps = {
    datasource: wheelPickerData
}

BaseIndex.defaultProps = {
    datasource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

}