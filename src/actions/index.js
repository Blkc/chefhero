export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'

export const fetchOrderSuccess = (orders) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: {
      orders
    }
  }
}