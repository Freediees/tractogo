import React from 'react'
import { View, Text, Animated } from 'react-native'
import PropTypes from 'prop-types'
import Styles from './styles'
import CheckBox from 'components/atom/checkBox'
import Hr from 'components/atom/hr'
import { responsiveWidth as wp } from 'react-native-responsive-dimensions'
import { Fonts, Background } from 'theme'
import BaseComponent from './BaseComponent'
import styles from 'components/atom/content/styles'

export default class ListItemAnimation extends BaseComponent {
  constructor(props) {
    super(props)
  }

  render() {
    // #region : static constanta
    const { title, value, children, maxHeight } = this.props

    const _width = this.activated.y.interpolate({
      inputRange: [0, 1],
      outputRange: [wp(100), wp(88)],
    })

    const _height = this.activated.y.interpolate({
      inputRange: [0, 1],
      outputRange: [60, maxHeight],
    })

    const _elevation = this.activated.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 5],
    })

    const _borderRadius = this.activated.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    })

    const _checkbosPosition = this.activated.y.interpolate({
      inputRange: [0, 1],
      outputRange: [22, 0],
    })

    const _mBottom = this.activated.y.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    })

    // #endregion

    return (
      <View style={{ ...Background.bg_white }}>
        <ALayer style={{ ...Styles.hr, marginBottom: 10, width: _width }} />

        <ALayer
          style={{
            ...Styles.Container,
            width: _width,
            elevation: _elevation,
            minHeight: _height,
            // marginBottom:_mBottom,
            borderRadius: _borderRadius,
          }}
        >
          <View style={Styles.Content}>
            <View>
              <Text style={Fonts.f_14}>{title}</Text>
            </View>
            <ALayer
              style={{
                ...Styles.listbox,
                right: _checkbosPosition,
              }}
            >
              <CheckBox
                checked={false}
                onCheck={() => {
                  this.switchCheck()
                }}
                value={value}
                width={20}
              />
            </ALayer>
          </View>
          {this.state.active && <Hr />}

          {children}
        </ALayer>
      </View>
    )
  }

  // #region : inPostback
  componentDidMount() {
    this.isMount = true
    let value = this.props.active ? 0 : 1
    this.mode.setValue(value)
    this.switchCheck()
  }

  componentWillUnmount() {
    this.isMount = false
  }
  // #endregion
}

ListItemAnimation.defaultProps = {
  title: 'Kartu Kredit atau Debit',
  value: '1234 👍 💯',
  maxHeight: 300,
}

ListItemAnimation.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  onCheck: PropTypes.func,
  maxHeight: PropTypes.number,
}

const ALayer = Animated.createAnimatedComponent(View)
