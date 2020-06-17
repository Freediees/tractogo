import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'moment/min/moment-with-locales'
import ExampleScreenActions from 'scenes/_exampleScreen/store/actions'

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

  useEffect(() => {
    async function initialize() {
      fetchExample()
    }
    initialize()
  }, [])

  return null
}

ExampleContainer.defaultProps = {
  example: [],
}

ExampleContainer.propTypes = {
  example: PropTypes.arrayOf(PropTypes.shape({})),
  exampleIsLoading: PropTypes.bool,
  exampleErrorMessage: PropTypes.string,
  fetchExample: PropTypes.func,
}

const mapStateToProps = (state) => ({
  example: state.cartScreen.example,
  exampleIsLoading: state.cartScreen.exampleIsLoading,
  exampleErrorMessage: state.cartScreen.exampleErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchExample: () => dispatch(ExampleScreenActions.fetchExample()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleContainer)
