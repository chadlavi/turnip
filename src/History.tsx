import * as React from 'react'
import { formatDate } from './date'
import { calculate, numberWithCommas } from './calculation'

export interface HistoryItem {
  time: Date
  quantity: number,
  initialPrice: number,
  currentPrice: number,
}

export type History = (HistoryItem | undefined)[]

export const History = (props: {history: History, setHistory: React.Dispatch<React.SetStateAction<string>>}) => {
  const{
    history,
    setHistory,
  } = props

  const hasHistory = history.length > 0

  const onClearHistory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setHistory('[]')
    localStorage.removeItem('history')
  }
  
  return hasHistory ? (
    <>
      <h2 id='history-header'>
        <span>Saved data&nbsp;</span>
        <button
          id='clear-history-button'
          onClick={onClearHistory}
        >
          delete all
        </button>
      </h2>
      <div id='history-container'>
        <table>
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Initial price</th>
              <th>Sale price</th>
              <th>Gross</th>
              <th>Profit</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history
              .sort((a, b) => (a && b) ? new Date(b.time).getTime() - new Date(a.time).getTime() : 0)
              .map((h, i) => {
                if (h){
                  const {
                    gross,
                    lossful,
                    profit,
                    profitable,
                    profitPercentage,
                  } = calculate({
                    quantity: h.quantity,
                    initialPrice: h.initialPrice,
                    currentPrice: h.currentPrice,
                  })
                  return (
                    <tr key={h.time.toString() || i}>
                      <td>
                        {numberWithCommas(h.quantity)}
                      </td>
                      <td>
                        {numberWithCommas(h.initialPrice)}
                      </td>
                      <td>
                        {numberWithCommas(h.currentPrice)}
                      </td>
                      <td>
                        {numberWithCommas(gross)}
                      </td>
                      <td
                        className={profitable ? 'good' : lossful ? 'bad' : undefined}
                      >
                        {numberWithCommas(profit)} ({profitable ? '+' : ''}{profitPercentage}%)
                      </td>
                      <td>
                        {formatDate(new Date(h.time))}
                      </td>
                    </tr>
                  )
                } else {
                  return ''
                }
              })
            }
          </tbody>
        </table>
      </div>
    </>
  ) : null
}
