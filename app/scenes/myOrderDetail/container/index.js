import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'moment/min/moment-with-locales'
import orderDetailScreenActions from 'scenes/myOrderDetail/store/actions'
import DetailItemMyOrder from 'components/organism/detailItemMyOrder'

export function useForceUpdate() {
  const [, setTick] = useState(0)
  const update = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
  return update
}

const MyOrderDetailContainer = ({
  navigation,
  orderDetail,
  orderDetailIsLoading,
  orderDetailErrorMessage,
  fetchorderDetail,
}) => {
  const forceUpdate = useForceUpdate()
  const { item } = navigation.state.params

  useEffect(() => {
    async function initialize() {
      fetchorderDetail()
    }
    initialize()
    console.log(item)
  }, [])

  return (
    <DetailItemMyOrder
      onIconLeftPress={() => navigation.goBack()}
      item={item}
      paymentDetailItems={item.paymentDetailItems}
      totalAmount={item.subTotal}
      onPressAction={() => navigation.navigate('MyOrderCancel')}
    />
  )
}

MyOrderDetailContainer.defaultProps = {
  orderDetail: [],
}

MyOrderDetailContainer.propTypes = {
  orderDetail: PropTypes.arrayOf(PropTypes.shape({})),
  orderDetailIsLoading: PropTypes.bool,
  orderDetailErrorMessage: PropTypes.string,
  fetchorderDetail: PropTypes.func,
}

const mapStateToProps = (state) => ({
  orderDetail: state.cartScreen.orderDetail,
  orderDetailIsLoading: state.cartScreen.orderDetailIsLoading,
  orderDetailErrorMessage: state.cartScreen.orderDetailErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchorderDetail: () => dispatch(orderDetailScreenActions.fetchorderDetail()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrderDetailContainer)
