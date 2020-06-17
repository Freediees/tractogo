import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Colors } from 'theme'

export default class Container extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.backgroundColor }}>
        {this.props.children}
      </View>
    )
  }
}

Container.defaultProps = {
  children: null,
  backgroundColor: Colors.white,
}

Container.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
}
