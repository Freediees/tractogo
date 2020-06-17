import React from 'react'
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles'

export default function Splash({ logo }) {


    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={logo} style={{ width: 100, height: 100, resizeMode: 'cover' }} />
            </View>
        </View>
    )

}


Splash.defaultProps = {
    logo: require('images/logo.jpg')
}

Splash.propTypes = {
    logo: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})])
}