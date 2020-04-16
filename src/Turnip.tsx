import React from 'react'
import './Turnip.css'
import { History } from './History'
import { calculate, numberWithCommas } from './calculation'

const defaultQuantity = localStorage.getItem('quantity') || ''
const defaultInitialPrice = localStorage.getItem('initialPrice') || ''
const defaultCurrentPrice = localStorage.getItem('currentPrice') || ''
const defaultHistory = localStorage.getItem('history') || '[]'

const Turnip = () => {
  const [quantity, setQuantity] = React.useState<string>(defaultQuantity)
  const [initialPrice, setInitialPrice] = React.useState<string>(defaultInitialPrice)
  const [currentPrice, setCurrentPrice] = React.useState<string>(defaultCurrentPrice)
  const [history, setHistory] = React.useState<string>(defaultHistory)

  const fields = [
    {
      label: 'Quantity',
      value: quantity,
      onChange: setQuantity,
      id: 'quantity',
    },
    {
      label: 'Initial price',
      value: initialPrice,
      onChange: setInitialPrice,
      id: 'initialPrice',
    },
    {
      label: 'Current price',
      value: currentPrice,
      onChange: setCurrentPrice,
      id: 'currentPrice',
    },
  ]

  const quantityNumber = parseFloat(quantity) || 0
  const initialPriceNumber = parseFloat(initialPrice) || 0
  const currentPriceNumber = parseFloat(currentPrice) || 0

  const {
    gross,
    investment,
    lossful,
    profit,
    profitable,
    profitPercentage,
  } = calculate({
    currentPrice: currentPriceNumber,
    initialPrice: initialPriceNumber,
    quantity: quantityNumber,
  })

  const onReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setQuantity('')
    setInitialPrice('')
    setCurrentPrice('')
    fields.forEach((f) => localStorage.removeItem(f.id))
  }

  const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const history: History = JSON.parse(localStorage.getItem('history') || '[]')
    const newHistory: History = [
      ...history,
      {
        time: new Date(),
        quantity: quantityNumber,
        initialPrice: initialPriceNumber,
        currentPrice: currentPriceNumber,
      }
    ]
    const newHistoryString = JSON.stringify(newHistory)
    setHistory(newHistoryString)
    localStorage.setItem('history', newHistoryString)
  }

  const noInput = quantity.length === 0 && initialPrice.length === 0 && currentPrice.length === 0
  const noData = investment === 0 && profit === 0 && gross === 0

  return (
    <>
      <h1>Turnip calc</h1>
      <main className='app'>
        <form id='inputs' className='half'>
          {fields.map((f) => {
            const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value.replace(/[a-zA-Z]/gi, '')
              f.onChange(newValue)
              localStorage.setItem(f.id, newValue)
            }
            return (
            <label key={f.id}>
              <span>{f.label}</span>
              <input
                id={f.id}
                name={f.id}
                onChange={onChange}
                type={'text'}
                value={f.value}
              />
            </label>
          )})}
          <p className='button-row'>
            <button
              id='clear-button'
              onClick={onReset}
              disabled={noInput}
              type={'button'}
            >
              reset fields
            </button>
          </p>
        </form>
        <div className='half'>
          <div id='results'>
        <div>
            <p>
              Investment: {numberWithCommas(investment)}
            </p>
            <p>
              Gross: {numberWithCommas(gross)}
            </p>
            <p className={profitable ? 'good' : lossful ? 'bad' : undefined}>
            {!lossful ? 'Profit' : 'Loss'}: {numberWithCommas(profit)} ({profitable ? '+' : ''}{profitPercentage}%)
            </p>
            </div>
            <p className='button-row'>
              <button
                id='save-button'
                onClick={onSave}
                disabled={noData}
              >
                save
              </button>

            </p>
          </div>
        </div>
        <History setHistory={setHistory} history={JSON.parse(history)} />
        <div className='github-link'>
          <a
            href='https://github.com/chadlavi/turnip'
            rel='noopener noreferrer'
            target='_blank'
          >
            https://github.com/chadlavi/turnip
          </a>
        </div>
      </main>
    </>
  )
}

export default Turnip
