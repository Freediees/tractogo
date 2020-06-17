import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { SvgXml } from 'react-native-svg';
import icCheck from 'icons/ic-checklist.svg';
import Hr from 'components/atom/hr';

export default function TitlePicker({ initalItem, datasource, onPress }) {

    const [labels, setLabels] = useState('Tuan');
    //const isFilter = (item) => item == initalItem;

    useEffect(() => {
        setLabels(initalItem)
    })



    const onSetLabel = a => {
        setLabels(a);
        const isFilter = (item) => item == a;
        // console.log(datasource.findIndex(isFilter))
        var _index = datasource.findIndex(isFilter);
        onPress(_index, a)

    }

    return <View style={{ padding: '5%', paddingTop: 50 }}>
        {
            datasource.map((item, i) => {
                return (
                    <View style={{ width: wp(80) }}>
                        <TouchableOpacity
                            onPress={() => onSetLabel(item)}
                            style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ width: '90%', textAlign: 'center' }}>{item}</Text>
                            {labels == item ? <SvgXml xml={icCheck} width={16} height={16} /> : null}
                        </TouchableOpacity>
                        <Hr style={{ marginLeft: 0, marginRight: 0 }} />
                    </View>)
            })
        }
    </View>
}


TitlePicker.defaultProps = {
    initalItem: 'Tuan',
    datasource: ['Tuan', 'Nyonya'],
    onPress: (a, b) => { console.log(a, b) }
}

TitlePicker.propTypes = {
    initalItem: PropTypes.string,
    datasource: PropTypes.array,
    onPress: PropTypes.func
}