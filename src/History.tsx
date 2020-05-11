import * as React from 'react'
import { formatDate } from './date'
import { calculate, numberWithCommas } from './calculation'
import {
  Button,
  Header,
  Notification,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  GridItem,
  ScrollContainer,
} from '@chadlavi/clear'

export interface HistoryItem {
    time: Date
    quantity: number
    initialPrice: number
    currentPrice: number
}

export type History = (HistoryItem | undefined)[]

export const History = (
  props: {history: History; setHistory: React.Dispatch<React.SetStateAction<string>>}
): JSX.Element | null => {
  const [deleted, setDeleted] = React.useState<boolean>(false)
  const{
    history,
    setHistory,
  } = props

  const hasHistory = history.length > 0

  const onClearHistory = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    setHistory('[]')
    localStorage.removeItem('history')
    setDeleted(true)
  }
  
  return (
    <>
      {hasHistory && 
        <Grid>
          <GridItem>
            <Header as='h2'id='history-header'>
              <span>Saved data&nbsp;</span>
              <Button
                id='clear-history-button'
                onClick={onClearHistory}
                className={'elevation-1'}
              >
                Delete all
              </Button>
            </Header>
          </GridItem>
          <GridItem>
            <ScrollContainer direction='horizontal' contentMinWidth={728}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell as='th'>Quantity</TableCell>
                    <TableCell as='th'>Initial price</TableCell>
                    <TableCell as='th'>Sale price</TableCell>
                    <TableCell as='th'>Gross</TableCell>
                    <TableCell as='th'>Profit</TableCell>
                    <TableCell as='th'>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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
                          <TableRow key={h.time.toString() || i}>
                            <TableCell>
                              {numberWithCommas(h.quantity)}
                            </TableCell>
                            <TableCell>
                              {numberWithCommas(h.initialPrice)}
                            </TableCell>
                            <TableCell>
                              {numberWithCommas(h.currentPrice)}
                            </TableCell>
                            <TableCell>
                              {numberWithCommas(gross)}
                            </TableCell>
                            <TableCell
                              className={profitable ? 'good' : lossful ? 'bad' : undefined}
                            >
                              {numberWithCommas(profit)} ({profitable ? '+' : ''}{profitPercentage}%)
                            </TableCell>
                            <TableCell>
                              {formatDate(new Date(h.time))}
                            </TableCell>
                          </TableRow>
                        )
                      } else {
                        return ''
                      }
                    })
                  }
                </TableBody>
              </Table>
            </ScrollContainer>
          </GridItem>
        </Grid>
      }
      <Notification
        open={deleted}
        setOpen={setDeleted}
        error
        mini
      >
        Saved data deleted
      </Notification>
    </>
  )
}
