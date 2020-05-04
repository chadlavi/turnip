import React from 'react'
import './Turnip.css'
import { History } from './History'
import { calculate, numberWithCommas } from './calculation'
import {
  Page,
  Header,
  Grid,
  GridItem,
  Input,
  Button,
  Label,
  Link,
  Paragraph,
} from '@chadlavi/clear'

const defaultQuantity = parseFloat(localStorage.getItem('quantity') || '')
const defaultInitialPrice = parseFloat(localStorage.getItem('initialPrice') || '')
const defaultCurrentPrice = parseFloat(localStorage.getItem('currentPrice') || '')
const defaultHistory = localStorage.getItem('history') || '[]'

const Turnip = (): JSX.Element => {
  const [quantity, setQuantity] = React.useState<number | undefined>(defaultQuantity)
  const [initialPrice, setInitialPrice] = React.useState<number | undefined>(defaultInitialPrice)
  const [currentPrice, setCurrentPrice] = React.useState<number | undefined>(defaultCurrentPrice)
  const [history, setHistory] = React.useState<string>(defaultHistory)

  const fields = [
    {
      label: 'Quantity',
      value: quantity,
      setter: setQuantity,
      id: 'quantity',
    },
    {
      label: 'Initial price',
      value: initialPrice,
      setter: setInitialPrice,
      id: 'initialPrice',
    },
    {
      label: 'Current price',
      value: currentPrice,
      setter: setCurrentPrice,
      id: 'currentPrice',
    },
  ]

  const quantityNumber = quantity || 0
  const initialPriceNumber = initialPrice || 0
  const currentPriceNumber = currentPrice || 0

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

  const onReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    setQuantity(undefined)
    setInitialPrice(undefined)
    setCurrentPrice(undefined)
    fields.forEach((f) => localStorage.removeItem(f.id))
  }

  const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    const currentHistory = JSON.parse(localStorage.getItem('history') || '[]')
    const history: History = currentHistory instanceof Array ? currentHistory : []
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

  const noInput = (quantity === 0 || quantity === undefined) 
    && (initialPrice === 0 || initialPrice === undefined) 
    && (currentPrice === 0 || currentPrice === undefined)

  const noData = investment === 0 && profit === 0 && gross === 0

  const selectAll = (e: React.MouseEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>): void => {
    const t = e.currentTarget
    setTimeout(() => {
      t.select()
    }, 100)
  }

  return (
    <>
      <Page>
        <Grid spacing={8}>
          <GridItem>
            <Header>Turnip calc</Header>
          </GridItem>
          <GridItem size={6}>
            <Grid spacing={8}>
              {fields.map((f) => {
                const onChange = (
                  setter: React.Dispatch<React.SetStateAction<number | undefined>>
                ) => (e: React.ChangeEvent<HTMLInputElement>): void => {
                  const newValue = parseFloat(e.currentTarget.value || '0')
                  setter(newValue)
                  localStorage.setItem(f.id, (newValue).toString())
                }
                return (
                  <GridItem key={f.id}>
                    <Label htmlFor={f.id}>{f.label}</Label>
                    <Input
                      id={f.id}
                      name={f.id}
                      onChange={onChange(f.setter)}
                      type={'number'}
                      inputMode={'decimal'}
                      pattern={'[0-9]*'}
                      value={f.value}
                      min={0}
                      onFocus={selectAll}
                      onClick={selectAll}
                    />
                  </GridItem>
                )})}
              <GridItem className='button-row'>
                <Button
                  id='clear-button'
                  onClick={onReset}
                  disabled={noInput}
                  className={noInput ? undefined : 'elevation-1'}
                >
                  Reset fields
                </Button>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem size={6}>
            <div className='elevation-4' id='results'>
              <div>
                <p>
                Investment: {numberWithCommas(investment)}
                </p>
                <p>
                Gross: {numberWithCommas(gross)}
                </p>
                <p className={profitable ? 'good' : lossful ? 'bad' : undefined}>
                  {!lossful 
                    ? 'Profit'
                    : 'Loss'
                  }: {numberWithCommas(profit)} ({profitable ? '+' : ''}{profitPercentage}%)
                </p>
              </div>
              <Paragraph className='button-row'>
                <Button
                  id='save-button'
                  onClick={onSave}
                  disabled={noData}
                  primary
                  className={noData ? undefined : 'elevation-2'}
                >
                  Save
                </Button>
              </Paragraph>
            </div>
          </GridItem>
          <GridItem>
            <History setHistory={setHistory} history={JSON.parse(history)} />
            <Paragraph className='github-link'>
              Built with <Link href='https://chadlavi.github.io/clear/'>Clear</Link>{' \u00b7 '}
              <Link href='https://github.com/chadlavi/turnip'>
                https://github.com/chadlavi/turnip
              </Link>
            </Paragraph>
          </GridItem>
        </Grid>
      </Page>
    </>
  )
}

export default Turnip
