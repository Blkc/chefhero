import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { fetchOrderSuccess } from '../actions'

export default function Table({ selectedSupplier }) {
  const original_orders = useSelector(state => (Object.values(state.orders) || []))
  const [orders, setOrders] = useState(original_orders)

  const dispatch = useDispatch()

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    let updated_orders = [...original_orders]
    if(selectedSupplier !== 'all') {
      updated_orders = original_orders.filter(o => o.vendorName === selectedSupplier)
    }
    setOrders(updated_orders)
  }, [selectedSupplier])

  async function fetchOrders() {
    await fetch('https://chefhero.free.beeceptor.com/')
      .then(res => res.json())
      .then(json => {
        dispatch(fetchOrderSuccess(json.data))
      })
  }

  function renderRow(order, i) {
    const tagStyle = order.orderBuyerStatus === 'Paid' ? { backgroundColor: '#b0ddcb' } : { backgroundColor: '#c4c4ff' }

    return (
      <tr key={i} className="order">
        <td><span className="tag" style={tagStyle}>{order.orderBuyerStatus.toUpperCase()}</span></td>
        <td>{moment(order.deliveryDay, 'YYYY-MM-DD').format('MMM. DD, YYYY')}</td>
        <td>
          {order.vendorName} 
          {!order.isBYOS ? <span className="market">MARKET</span> : null} 
          {order.isPendingVendorOnboarding ? <span className="first">1st</span> : null}
        </td>
        <td>{order.total && order.total > 0 ? `$${order.total}` : null}</td>
      </tr>
    )
  }

  return (
    <table>
      <thead>
        <tr className="table-header">
          <th>STATUS</th>
          <th>DELIVERY DAY</th>
          <th>SUPPLIER</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o, i) => 
          renderRow(o, i)
        )}
      </tbody>
    </table>
  )
}