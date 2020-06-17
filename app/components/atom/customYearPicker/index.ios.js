import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import PropTypes from 'prop-types';

//import BaseIndex from './baseIndex';

const wheelPickerData = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday"
];

export default function YearPicker({
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

    return <View style={{ flex: 1 }}>
        <Button title={"Select third element"} onPress={onPress} />
        <Text>Selected position: {selectedItem}</Text>        
    </View>
}


YearPicker.defaultProps = {
    datasource: wheelPickerData
}

YearPicker.defaultProps = {
    datasource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

}