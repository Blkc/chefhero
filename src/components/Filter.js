import React from 'react'
import { useSelector } from 'react-redux'

export default function Filter({ selectedSupplier, setSelectedSupplier }) {
  const suppliers = useSelector(state => (state.suppliers || []))
  let supplierOptions = (Object.values(suppliers)).map(s => {
    return { key: s, value: s }
  })
  supplierOptions = [{ key: 'all', value: 'All Suppliers'}].concat(supplierOptions)

  return (
    <div className="filter">
      <div className="select-wrapper">
        <label>Supplier</label><br/>
        <select value={selectedSupplier} onChange={e => setSelectedSupplier(e.target.value)}>
          {supplierOptions.map(so => 
            <option key={so.key} value={so.key}>{so.value}</option>
          )}
        </select>
      </div>
      <button className="reset-button" onClick={e => setSelectedSupplier('all')}>&#10005; Reset Filters</button>
    </div>
  )
}