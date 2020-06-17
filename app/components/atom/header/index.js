import React from 'react'
import { View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { Background, Colors } from 'theme'
import { responsiveWidth as wp } from 'react-native-responsive-dimensions'
import './string'

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View
        style={{
          ...Background.bg_white,
          width: wp(100),
          height: 70,
          elevation: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <StatusBar
          backgroundColor={this.props.statusBarColor}
          hidden={!this.props.isStatusBar}
          barStyle={this.props.barStyle}
        />
        {this.props.children}
      </View>
    )
  }
}

Header.defaultProps = {
  children: null,
  statusBarColor: statusBarColor,
  isStatusBar: true,
  barStyle: barStyle,
  backgroundColor: Colors.white,
}

Header.propTypes = {
  children: PropTypes.node,
  statusBarColor: PropTypes.string,
  isStatusBar: PropTypes.bool,
  barStyle: PropTypes.string,
  backgroundColor: PropTypes.string,
}
