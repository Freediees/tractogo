import React from 'react';
import PropTypes from 'prop-types';
import { TouchableNativeFeedback, TouchableOpacity, Text, View, TextInput, Image, StyleSheet } from 'react-native';
import {
    responsiveHeight as hp,
    responsiveWidth as wp,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { SvgXml } from 'react-native-svg';
import { Fonts } from 'theme';
import caret from 'icons/ic-CTADown.svg';


export default function CustomInputPicker({
    labelName,
    title,
    placeholder,
    value,
    onChangeText,
    onPress
}) {

    return (
        <View style={{ width: '100%', padding: '5%', paddingBottom: 0 }}>
            <Text style={{ ...Fonts.f_10, color: '#a0a4a8' }}>{labelName}</Text>
            <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>

                <View style={{ ...styles.pickerWrapper, marginRight: '10%', paddingTop: 10, alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={onPress}
                        style={{ flexDirection: 'row' }}
                    >
                        <View style={{ width: '80%', height: 40 }}>
                            <Text>{title}</Text>
                        </View>

                        <View>
                            <SvgXml xml={caret} width={16} height={16} />
                        </View>
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    style={{ width: '60%', borderBottomColor: '#bdc3c7', borderBottomWidth: 1 }} />
            </View>
        </View>
    )
}

CustomInputPicker.defaultProps = {
    labelName: 'Name',
    title: 'Tuan',
    placeholder: 'cth: Name',
    value: '',
    onChangeText: (e) => { console.log(e) },
    onPress: () => { }
}

CustomInputPicker.propsTypes = {
    labelName: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onPress: PropTypes.func
}

const styles = StyleSheet.create({
    pickerWrapper: {
        borderBottomColor: '#bdc3c7',
        borderBottomWidth: 1,
        // backgroundColor: "#273137",
        borderRadius: 4,
        width: '30%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    pickerIcon: {
        color: '#e74c3c',
        position: "absolute",
        bottom: 15,
        right: 10,
        fontSize: 20
    },

    pickerContent: {
        color: '#a0a4a8',
        backgroundColor: "transparent",
        width: '100%'
    },
})