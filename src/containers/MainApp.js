import React, { useState } from 'react'
import '../App.css';

import Header from '../components/Header'
import Filter from '../components/Filter'
import Table from '../components/Table'

export default function MainApp() {
  const [selectedSupplier, setSelectedSupplier] = useState('all')

  return (
    <div>
      <Header />
      <Filter selectedSupplier={selectedSupplier} setSelectedSupplier={setSelectedSupplier} />
      <div className="table-wrapper">
        <Table selectedSupplier={selectedSupplier} />
      </div>
    </div>
  )
}