import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { CustomStyle, Flex, Border, Padding, Fonts, Margin, Background, Colors } from 'theme'
import Moment from 'moment'



export default function NotificationItem({ onItemPress, onDetailsPress, titleText, contentText, dateText }) {
    return (
        <TouchableWithoutFeedback
            onPress={onDetailsPress}
            onLongPress={onItemPress}>
            <View style={{
                ...Flex.flex_column,
            }}>
                <Text style={{ ...Fonts.f_14, ...Fonts.bold, ...Margin.mv_8, ...Margin.mt_16 }}>{titleText}</Text>
                <Text style={{ ...Fonts.f_14, ...Margin.mv_8 }}>{contentText} <Text style={{ ...Fonts.text_deep_orange }}>
                    Details
                </Text></Text>
                <Text style={{ ...Fonts.f_12, ...Fonts.text_dark_grey, ...Margin.mv_8 }}>{
                    `${Moment(dateText)
                        .format('D-MM-YYYY HH:mm')}`}
                </Text>

            </View>
        </TouchableWithoutFeedback>
    )
}

NotificationItem.defaultProps = {
    style: {},
    titleText: 'Judul Update',
    contentText: 'Deskirpsi update Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit amet Lorem Ipsum Dolor sit.',
    dateText: new Date()
}

NotificationItem.propTypes = {
    style: PropTypes.shape({}),
    titleText: PropTypes.string,
    contentText: PropTypes.string,
    dateText: PropTypes.Date,
}