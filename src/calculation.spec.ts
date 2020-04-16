import {calculate} from './calculation'

const numbers = {
  quantity: 100,
  initialPrice: 100,
  currentPrice: 200,
  gross: 20000,
  profit: 10000,
  profitPercentage: '100.00',
}

test('math works ', () => {
  const {
    quantity, 
    initialPrice,
    currentPrice,
  } = numbers
  const calculated = calculate({
    quantity,
    initialPrice,
    currentPrice,
  })
  expect(calculated.gross).toEqual(numbers.gross)
  expect(calculated.profit).toEqual(numbers.profit)
  expect(calculated.profitPercentage).toEqual(numbers.profitPercentage)
})
