import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import CustomYearPicker from 'components/atom/customYearPicker';
import CustomCalendarPicker from 'components/atom/customCalendarPicker';
import OkCancelButton from 'components/molecules/okCancelButton';
import { SvgXml } from 'react-native-svg';
import { responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { Margin, Fonts, Background, Colors } from 'theme';
// import icnext from 'icons/ic_next.svg';
// import icPrev from 'icons/ic_prev.svg';
export const ArrowAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export default function DatePickerBottomSheet({
    selectedDate,
    initialDateLabel,
    weekdaysLabel,
    monthsLabel,
    onOkPress,
    onCancelPress
}) {


    const calRef = useRef(null)
    let __init = initialDateLabel !== undefined ? true : false;
    let currYear = __init ? moment(initialDateLabel).format('YYYY') : moment().format('YYYY')
    let currMonth = __init ? moment(initialDateLabel).format('MM') : moment().format('MM')
    let currDay = __init ? moment(initialDateLabel).format('DD') : moment().format('DD')
    const [onLoad, setOnLoad] = useState(true)
    const [isActive, setIsActive] = useState(1)
    const [isDisabled, setIsDisabled] = useState(false)
    const [ddmm, setddmm] = useState(moment())
    const [onYear, setOnYear] = useState(currYear)

    useEffect(() => {
        let __yy = moment(initialDateLabel).format('YYYY');
        let __mm = moment(initialDateLabel).format('MM');
        let __dd = moment(initialDateLabel).format('DD');

        let _yymmdd = `${__yy}-${__mm}-${__dd}`

        // currYear = __yy; currMonth = __mm; currDay = __dd;

        setOnYear(__yy)
        setddmm(_yymmdd)
        console.log('initialDateLabel: ', _yymmdd)
        setOnLoad(false)
    }, [onLoad])

    const onPress = (value) => {
        setIsActive(value)
        value == 0 ? setIsDisabled(true) : setIsDisabled(false);
    }

    function changeDate(a) {
        setddmm(a)

    }

    const onChangeYear = (value) => {
        setOnYear(value)
    }

    const onOk = () => {
        var _date = `${onYear}-${moment(ddmm).format('MM')}-${moment(ddmm).format('DD')}`
        onOkPress(_date);
    }

    const dateValid = (value) => {
        let _mm = value;
        if (_mm > 12) {
            _mm = 1;
            var _year = parseInt(onYear) + 1;
            setOnYear(_year.toString())
        }
        else if (_mm < 1) {
            _mm = 12;
            var _year = parseInt(onYear) - 1;
            setOnYear(parseInt(_year))
        }

        return _mm;
    }

    const onNext = () => {
        calRef.current.handleOnPressNext();
        let _mmdd = parseInt(moment(ddmm).format('MM')) + 1;
        let _mm = dateValid(_mmdd);

        let _date = `${moment(ddmm).format('YYYY')}-${_mm < 10 ? '0' + _mm.toString() : _mm.toString()}-${moment(ddmm).format('MM')}`
        setddmm(_date)
        // console.log(ddmm + 1)
    }

    const onPrev = () => {
        calRef.current.handleOnPressPrevious();
        let _mmdd = parseInt(moment(ddmm).format('MM')) - 1;
        // _mm = _mm < 1 ? 12 : _mm;
        let _mm = dateValid(_mmdd);
        let _date = `${moment(ddmm).format('YYYY')}-${_mm < 10 ? '0' + _mm.toString() : _mm.toString()}-${moment(ddmm).format('MM')}`
        setddmm(_date)
        // console.log(_date)
    }

    return (
        <View style={{ zIndex: 999 }}>
            <View style={{ ...styles.header, zIndex: 997 }}>
                {/* <ArrowAnimated disabled={isDisabled} style={{ position: 'absolute', left: 0, width: 25, zIndex: 998 }} onPress={() => onPrev()} >
                    <SvgXml xml={icPrev} width={20} height={20} fill={isDisabled ? '#bdc3c7' : '#000'} />
                </ArrowAnimated> */}
                <TouchableOpacity style={[styles.button, isActive == 0 ? styles.active : styles.unActive]} onPress={() => onPress(0)} >
                    <Text>{onYear}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, isActive == 1 ? styles.active : styles.unActive]} onPress={() => onPress(1)} >
                    <Text>{moment(ddmm).format('dddd, DD MMM')}</Text>
                </TouchableOpacity>
                {/* <ArrowAnimated disabled={isDisabled} style={{ position: 'absolute', right: 0, width: 25, zIndex: 998 }} onPress={() => onNext()} >
                    <SvgXml xml={icnext} width={20} height={20} fill={isDisabled ? '#bdc3c7' : '#000'} />
                </ArrowAnimated> */}

            </View>
            {
                isActive == 0 ?
                    <View style={{ width: '100%', height: 240, alignSelf: 'center', alignItems: 'center' }}>
                        <CustomYearPicker initalYear={onYear} onSelectItem={(a) => onChangeYear(a)} />
                    </View> :
                    <View style={{ width: '100%',top:-60, height: 240, alignSelf: 'center', alignItems: 'center' }}>
                        <CustomCalendarPicker
                            myRef={calRef}
                            onDateChange={(date) => {
                                changeDate(date);
                            }}
                            minDate={new Date(1900, 1, 1)}
                            maxDate={new Date()}
                            initialDate={new Date(onYear, currMonth, currDay)}
                            selectedDate={selectedDate}
                            weekdays={weekdaysLabel}
                            months={monthsLabel}
                            styleContent={{ left: 5, top: -50, zIndex: 888 }}
                        />
                    </View>
            }
            <View style={{ width: '100%', height: 50, paddingLeft: '5%', paddingRight: '5%' }}>
                <OkCancelButton
                    onCancelPress={onCancelPress}
                    onOkPress={onOk}
                />
            </View>

        </View>
    )
}


DatePickerBottomSheet.defaultProps = {
    selectedDate: new Date(),
    weekdaysLabel: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
    monthsLabel: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    onCancelPress: () => { },
    onOkPress: (a) => { console.log(a) }
}

DatePickerBottomSheet.propTypes = {
    selectedDate: PropTypes.any,
    initialDateLabel: PropTypes.any,
    weekdaysLabel: PropTypes.array,
    monthsLabel: PropTypes.array,
    onCancelPress: PropTypes.func,
    onOkPress: PropTypes.func.isRequired
}


const styles = {
    header: {
        backgroundColor: '#FFF',
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    button: {
        width: '50%',
        height: 50,
        // backgroundColor: '#95a5a6',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#bdc3c7',
        borderTopColor: '#bdc3c7'
    },
    active: {
        borderBottomColor: '#e67e22',
        borderBottomWidth: 3,
    },
    inActive: {
        borderBottomColor: '#bdc3c7',
        borderBottomWidth: 1
    }

}
