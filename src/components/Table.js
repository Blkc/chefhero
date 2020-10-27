import React from 'react'
import moment from 'moment'

export default function Table({ orders }) {
  function renderRow(order, i) {
    const tagStyle = order.orderBuyerStatus === 'Paid' ? { backgroundColor: '#b0ddcb' } : { backgroundColor: '#c4c4ff' }

    return (
      <tr key={i} className="order">
        <td><span className="tag" style={tagStyle}>{(order.orderBuyerStatus || '').toUpperCase()}</span></td>
        <td>{order.deliveryDay ? moment(order.deliveryDay, 'YYYY-MM-DD').format('MMM. DD, YYYY') : null}</td>
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