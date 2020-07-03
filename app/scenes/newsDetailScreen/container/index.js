import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'moment/min/moment-with-locales'
import ExampleScreenActions from 'scenes/_exampleScreen/store/actions'
import NewsDetailScreen from 'components/organism/newsDetailScreen'

Moment.locale('ID')

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const ExampleContainer = ({
  navigation,
  example,
  exampleIsLoading,
  exampleErrorMessage,
}) => {
  const forceUpdate = useForceUpdate()
  const { title, content, thumbnail } = navigation.state.params

  useEffect(() => {
    async function initialize() {}
    initialize()
  }, [])

  return (
    <NewsDetailScreen
      onIconLeftPress={() => navigation.goBack()}
      title={title}
      content={content}
      image={thumbnail}
    />
  )
}

ExampleContainer.defaultProps = {
  example: [],
}

ExampleContainer.propTypes = {
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleContainer)
