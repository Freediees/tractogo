import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'moment/min/moment-with-locales'
import ExampleScreenActions from 'scenes/_exampleScreen/store/actions'
import DetailOrderRefund from 'components/organism/detailOrderRefund'

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
  fetchExample,
}) => {
  const forceUpdate = useForceUpdate()
  const { item, reservation } = navigation.state.params

  useEffect(() => {
    async function initialize() {}
    initialize()
  }, [])

  return (
    <DetailOrderRefund
      item={item}
      reservation={reservation}
      onIconLeftPress={() => navigation.goBack()}
    />
  )
}

ExampleContainer.defaultProps = {
  example: [],
}

ExampleContainer.propTypes = {}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleContainer)
