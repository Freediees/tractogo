import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Colors } from 'theme'

export default class Right extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props
    return (
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end', padding: '5%' }}>
        {children}
      </View>
    )
  }
}

Right.defaultProps = {
  children: null,
}

Right.propTypes = {
  children: PropTypes.node,
}
