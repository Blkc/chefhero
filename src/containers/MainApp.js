import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header'
import Filter from '../components/Filter'
import Table from '../components/Table'

import { fetchOrderSuccess } from '../actions'

import '../App.css';

export default function MainApp() {
  const original_orders = useSelector(state => (Object.values(state.orders) || []))
  const [orders, setOrders] = useState(original_orders)
  const [selectedSupplier, setSelectedSupplier] = useState('all')

  const dispatch = useDispatch()

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    //Handles initialization
    if(!orders.length && selectedSupplier === 'all' && original_orders.length) {
      setOrders(original_orders)
    }
  }, [original_orders])

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

  return (
    <div>
      <Header />
      <Filter selectedSupplier={selectedSupplier} setSelectedSupplier={setSelectedSupplier} />
      <div className="table-wrapper">
        <Table orders={orders} />
      </div>
    </div>
  )
}