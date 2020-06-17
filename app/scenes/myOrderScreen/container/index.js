import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import MyOrderScreenActions from 'scenes/myOrderScreen/store/actions'
import MyOrderListScreen from 'components/organism/myOrderListScreen'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const MyOrderContainer = ({
  navigation,
  ordersActive,
  ordersComplete,
  ordersCancel,
  ordersActiveIsLoading,
  ordersActiveErrorMessage,
  ordersCompleteIsLoading,
  ordersCompleteErrorMessage,
  ordersCancelIsLoading,
  ordersCancelErrorMessage,
  fetchOrdersActive,
  fetchOrdersComplete,
  fetchOrdersCancel,
}) => {
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    async function initialize() {
      fetchOrdersActive()
      fetchOrdersComplete()
      fetchOrdersCancel()
    }
    initialize()
  }, [])

  return (
    <MyOrderListScreen
      ordersActive={ordersActive}
      ordersActiveIsLoading={ordersActiveIsLoading}
      ordersComplete={ordersComplete}
      ordersCompleteIsLoading={ordersCompleteIsLoading}
      ordersCancel={ordersCancel}
      ordersCancelIsLoading={ordersCancelIsLoading}
    />
  )
}

MyOrderContainer.defaultProps = {
  ordersActive: [],
  ordersComplete: [],
  ordersCancel: [],
}

MyOrderContainer.propTypes = {
  ordersActive: PropTypes.arrayOf(PropTypes.shape({})),
  ordersActiveIsLoading: PropTypes.bool,
  ordersActiveErrorMessage: PropTypes.shape({}),
  ordersComplete: PropTypes.arrayOf(PropTypes.shape({})),
  ordersCompleteIsLoading: PropTypes.bool,
  ordersCompleteErrorMessage: PropTypes.shape({}),
  ordersCancel: PropTypes.arrayOf(PropTypes.shape({})),
  ordersCancelIsLoading: PropTypes.bool,
  ordersCancelErrorMessage: PropTypes.shape({}),
  fetchOrdersActive: PropTypes.func,
  fetchOrdersCancel: PropTypes.func,
  fetchOrdersComplete: PropTypes.func,
}

const mapStateToProps = (state) => ({
  ordersActive: state.order.ordersActive,
  ordersActiveIsLoading: state.order.ordersActiveIsLoading,
  ordersActiveErrorMessage: state.order.ordersActiveErrorMessage,
  ordersComplete: state.order.ordersComplete,
  ordersCompleteIsLoading: state.order.ordersCompleteIsLoading,
  ordersCompleteErrorMessage: state.order.ordersCompleteErrorMessage,
  ordersCancel: state.order.ordersCancel,
  ordersCancelIsLoading: state.order.ordersCancelIsLoading,
  ordersCancelErrorMessage: state.order.ordersCancelErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchOrdersActive: () => dispatch(MyOrderScreenActions.fetchOrdersActive()),
  fetchOrdersComplete: () => dispatch(MyOrderScreenActions.fetchOrdersComplete()),
  fetchOrdersCancel: () => dispatch(MyOrderScreenActions.fetchOrdersCancel()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrderContainer)
