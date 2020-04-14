import React from 'react'
import './App.css'

const numberWithCommas = (x: string | number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const App = () => {
  const [quantity, setQuantity] = React.useState<string>(localStorage.getItem('quantity') || '')
  const [initialPrice, setInitialPrice] = React.useState<string>(localStorage.getItem('initialPrice') || '')
  const [currentPrice, setCurrentPrice] = React.useState<string>(localStorage.getItem('currentPrice') || '')

  const onClearAll = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setQuantity('')
    setInitialPrice('')
    setCurrentPrice('')
    localStorage.clear()
  }

  const investment = parseFloat(quantity) * parseFloat(initialPrice) || 0
  const gross = parseFloat(quantity) * parseFloat(currentPrice) || 0
  const profit = gross - investment
  const profitPercentage = (100 * (profit / investment) || 0).toFixed(2)
  const profitable = profit > 0
  const lossful = profit < 0

  const fields = [
    {
      label: 'Quantity',
      type: 'number',
      value: quantity,
      onChange: setQuantity,
      id: 'quantity',
    },
    {
      label: 'Initial price',
      type: 'number',
      value: initialPrice,
      onChange: setInitialPrice,
      id: 'initialPrice',
    },
    {
      label: 'Current price',
      type: 'number',
      value: currentPrice,
      onChange: setCurrentPrice,
      id: 'currentPrice',
    },
  ]

  return (
    <>
      <h1>Turnip calc</h1>
      <div className='app'>
        <form id='inputs'>
          {fields.map((f) => {
            const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value
              f.onChange(newValue)
              localStorage.setItem(f.id, newValue)
            }
            return (
            <label key={f.id}>
              <span>{f.label}</span>
              <input
                type={f.type}
                value={f.value}
                onChange={onChange}
                id={f.id}
              />
            </label>
          )})}
        </form>
        <div>
          <div id='results'>
            <p>
              Investment: {numberWithCommas(investment)}
            </p>
            <p>
              Gross: {numberWithCommas(gross)}
            </p>
            <p className={profitable ? 'good' : lossful ? 'bad' : ''}>
              {!lossful ? 'Profit' : 'Loss'}: {numberWithCommas(profit)} ({profitPercentage}%)
            </p>
            <p className='button-row'>
              <button
                id='clear-button'
                onClick={onClearAll}
              >
                clear all
              </button>
            </p>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
