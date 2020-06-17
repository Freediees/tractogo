import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
    WheelPicker
} from "react-native-wheel-picker-android";
import { responsiveWidth as wp } from 'react-native-responsive-dimensions';
import moment from 'moment'

export default function YearPicker({
    initalYear,
    onSelectItem
}) {

    const firstYears = moment().format('YYYY')
    const [onLoad, setonLoad] = useState(false);
    const [selectedItem, setSelectedItem] = useState(3);
    const [yearsList, setyearsList] = useState([firstYears]);

    useEffect(() => {
        let _year = parseInt(firstYears) + 1;
        rangeYear(_year)
    }, [!onLoad])


    const onItemSelected = selectedItem => {
        setSelectedItem(selectedItem);
        if (selectedItem)
            var _ds = yearsList[selectedItem]

        _ds === undefined ? onSelectItem(yearsList[0]) : onSelectItem(_ds);
    };

    const isFilter = (element) => element == initalYear;


    const rangeYear = year => {
        let array = [];
        let i = 0;
        for (let index = 1960; index < year; index++) {
            // const _range = array[index];
            if (index != undefined)
                array[i] = index.toString();
            i++
        }

        array.sort(function (a, b) { return b - a })
        setyearsList(array)
        setonLoad(true)
        setSelectedItem(array.findIndex(isFilter))
        console.log(array.findIndex(isFilter))
    }

    return <View style={{ ...styles.content }}>
        {
            yearsList && <WheelPicker
                selectedItem={selectedItem}
                data={yearsList}
                indicatorColor='#bdc3c7'
                onItemSelected={onItemSelected}
            />
        }

    </View>
}


YearPicker.defaultProps = {
    onSelectItem: (a) => { console.log(a) },
    initalYear: moment().format('YYYY').toString()
}

YearPicker.propTypes = {
    onSelectItem: PropTypes.func,
    initalYear: PropTypes.Date
}

const styles = {
    content: {
        // flex: 1,        
        width: '80%',
        alignItems: 'center',
        // height: '70%',
        // ...Border.border_w_1,
        // ...Border.border_rad_4,
        // ...Border.border_light_grey,
        // overflow: 'hidden'
    },
}

//Logic for getting rest of the dates between two dates("FromDate" to "EndDate")
