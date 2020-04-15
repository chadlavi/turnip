export interface CalculateProps {
  currentPrice: number,
  initialPrice: number,
  quantity: number,
}

export const calculate = (props: CalculateProps) => {
  const investment = props.quantity * props.initialPrice
  const gross = props.quantity * props.currentPrice
  const profit = gross - investment
  const profitPercentage = (100 * (profit / investment) || 0).toFixed(2)
  const profitable = profit > 0
  const lossful = profit < 0
  return {
    gross,
    investment,
    lossful,
    profit,
    profitable,
    profitPercentage,
  }
}

export const numberWithCommas = (x: string | number) => {
  return (x || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
