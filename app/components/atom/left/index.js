import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg'
import svgArrow from 'icons/Ic-back.svg'
import { Colors } from 'theme'

export default class Left extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { isArrow, onBack, children } = this.props
    return (
      <View
        style={{
          flex: 2.5,
          flexDirection: 'row',
          padding: '5%',
          paddingLeft: 5,
          alignItems: 'center',
        }}
      >
        {isArrow && (
          <TouchableOpacity style={{ paddingRight: 5 }} onPress={onBack}>
            <SvgXml xml={svgArrow} width={25} height={25} fill="#000" />
          </TouchableOpacity>
        )}
        {children}
      </View>
    )
  }
}

Left.defaultProps = {
  isArrow: false,
  children: null,
}

Left.propTypes = {
  isArrow: PropTypes.bool,
  onBack: PropTypes.func,
  children: PropTypes.node,
}
