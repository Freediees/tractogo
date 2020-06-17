import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, RefreshControl } from 'react-native'
import styles from './styles'
import { Colors } from 'theme'

export default class Content extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    let _refreshControl = (
      <RefreshControl
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        tintColor="#c0392b"
        colors={this.props.refreshColor}
      />
    )

    let _refreshing =
      this.props.refreshing == undefined && this.props.onRefresh == undefined
        ? null
        : _refreshControl

    return (
      <View style={{ ...styles.main, backgroundColor: this.props.backgroundColor, ...this.props.style }}>
        <ScrollView
          refreshControl={_refreshing}
          contentContainerStyle={styles.cmain}
          style={{ ...styles.smain, backgroundColor: this.props.backgroundColor, ...this.props.style }}
        >
          {this.props.children}
        </ScrollView>
      </View>
    )
  }
}

Content.defaultProps = {
  children: null,
  backgroundColor: Colors.white_grey,
  refreshColor: styles.baseColorRefresh,
  style: {}
}

Content.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  refreshColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
}
