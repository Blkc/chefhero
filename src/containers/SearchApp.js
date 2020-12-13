import React, { useState, useEffect, createContext, useContext } from 'react'

function RandomButton() {
  const value = useContext(ButtonContext)

  return (
    <button>{value}</button>
  )
}

function Random() {
  return (
    <RandomButton />
  )
}

const ButtonContext = createContext('Hello')

export default function SearchApp() {
  const [products, setProducts] = useState([])
  const [str, setStr] = useState('')
  const [retryCount, setRetryCount] = useState(0)
 
  useEffect(() => {
    if(str.length) {
      fetchItems()
    }
  }, [str])

  async function fetchItems(oldStr=false) {
    if(retryCount > 3) {
      return
    }

    let searchStr = str
    if(oldStr) {
      searchStr = oldStr
    }

    //console.log(searchStr)

    try{
      const results = await fetch(`http://buyer-api.interview.staging.foodieorders.com/api/v1/search/?s=${searchStr}`)
      console.log(results)
      if (!results.ok) {
        fetchItems(searchStr)
        const newCount = retryCount + 1
        setRetryCount(newCount)
      }

      const json = await results.json();
      if(json[""] && (str === searchStr)) {
        var items = json[""].map(i => i[0])
        setProducts(items.slice(0, 5))
        return
      }
    }catch(e) {
      console.log(e)
    }
  }
  
  return (
    <div>
      <input type="text" value={str} onChange={e => setStr(e.target.value)}/>
      {products.map((p, i) => 
          <div key={i}>
            <div>{p.productName}</div>
            <div>{p.price}</div>
            <img src={p.genericItem.imageURL} alt={p.productName} />
          </div>
      )}
      <br /><br />
      <ButtonContext.Provider value="Bye">
        <Random />
      </ButtonContext.Provider>
    </div>
  )
}