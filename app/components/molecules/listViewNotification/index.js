import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions, ScrollView } from 'react-native'
import { Padding, Margin, Column, Row } from 'theme'

import NotificationItem from 'components/atom/notificationItem'
import Separator from 'components/atom/separator'

export default function ListViewNotification({ items, }) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
            }}>
            <ScrollView
                style={{
                    ...Column.col_12,
                    ...Padding.ph_20,
                }}>
                {items && items.map((v, i) => {
                    return (
                        <View>
                            <NotificationItem
                            titleText={v.titleText}
                            contentText={v.contentText}
                            dateText={v.dateText}/>
                        <Separator/>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

ListViewNotification.defaultProps = {
    items: null,
}

ListViewNotification.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({}))
}