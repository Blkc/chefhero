import { combineReducers } from 'redux'
import { FETCH_ORDERS_SUCCESS } from '../actions'

function orders(state={}, action) {
  let orders

  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      orders = action.payload.orders
      return orders.reduce((o, order) => { o[order.id] = order; return o; }, {})
    default:
      return state
  }
}

function suppliers(state={}, action) {
  let orders

  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      //cannot find vendorId, assuming vendor name is unique
      orders = action.payload.orders
      return orders.reduce((o, order) => { o[order.vendorName] = order.vendorName; return o; }, {})
    default:
      return state
  }
}

const reducers = combineReducers({
  orders,
  suppliers
})

export default reducers