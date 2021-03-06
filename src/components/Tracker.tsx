import { useEffect, useState } from "react"
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 0 1 100%;
  flex-wrap: wrap;
  background-color: #222;
  color: #FFF;
  padding: 2rem;
`
const Table = styled.div`
  display: flex;
  flex: 0 1 100%;
  flex-wrap: wrap;
`
const TableHeader = styled.div`
display: flex;
flex: 0 1 100%;
font-size: 1.5rem;
padding-bottom: 1rem;
`
const TableRow = styled.div`
display: flex;
flex: 0 1 100%;
padding-top: 1rem;
padding-bottom: 1rem;
border-top: 2px solid #fff;

`
const PairName = styled.div`
display: flex;
flex: 0 1 100%;
`

const PairPrice = styled.div`
display: flex;
flex: 0 1 100%;
align-content: flex-end;
`

const PairLiquidity = styled.div`
display: flex;
flex: 0 1 100%;
`

const LastUpdated = styled.div`
  display: flex;
  flex: 0 1 100%;
  font-size: .75rem;
  padding-top: 1rem;
  border-top: 2px solid #fff;
`

interface ITrackingData {
  lastUpdated: string
  pairs: ITrackingDataPairs
}
interface ITrackingDataPairs {
  [key: string]: ITrackingDataPair
}

interface ITrackingDataPair {
  ewtPrice: number
  price: number
  liq: number
}

export const Tracker = () => {

  const [trackingData, setTrackingData] = useState({} as ITrackingData)
  const fetchdata = async () => {
    const res = await axios.get('https://carbonswap-tracking.s3.amazonaws.com/latest.json')
    const jsondata = res.data 
    const pairs = jsondata?.data as ITrackingDataPairs
    console.log(pairs)

    const parsedPairs: ITrackingDataPairs = {} as ITrackingDataPairs

    if(pairs) {
      for(let pairKey of Object.keys(pairs)) {
        // @ts-ignore
        parsedPairs[pairKey] = await JSON.parse(pairs[pairKey])
      }
    }
      
    setTrackingData({
      lastUpdated: jsondata.lastUpdated,
      pairs: parsedPairs
    })
  }
  useEffect(() => {
    fetchdata()
  }, [])
  
  const makeDataForPair = (pair: string) => {
    if(trackingData && trackingData.pairs && trackingData.pairs[pair]) {
      
      const pairData = trackingData.pairs[pair]
      console.log(pairData)
      const pairPrice = pairData.price?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})
      const pairLiquidity = pairData.liq.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})
      //   (ewtHalf.balance / Math.pow(10, 18)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})
      //   :
      //   (nonEwtHalf.balance / Math.pow(10, 18)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})
      // const pairLiquidity = pair === "EWT-DAI" ?
      //   (ewtHalf.balance / Math.pow(10, 18)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})
      //   :
      //   (nonEwtHalf.balance / Math.pow(10, 18)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})
        return { price: pairPrice, liq: pairLiquidity}
    }
    return { price: "--", liq: "--"}
  }

  return (
    <Container>
      <Table>
        <TableHeader>
          <PairName>Pair</PairName>
          <PairPrice>Price (US$)</PairPrice>
          <PairLiquidity>Liquidity in pool</PairLiquidity>
        </TableHeader>
        {/* <TableRow>
          <PairName>EWT</PairName>
          <PairPrice>{makeDataForPair("EWT-DAI").price}</PairPrice>
          <PairLiquidity>{makeDataForPair("EWT-DAI").liq} EWT</PairLiquidity>
        </TableRow> */}
        <TableRow>
          <PairName>OCEAN</PairName>
          <PairPrice>{makeDataForPair("OCEAN").price}</PairPrice>
          <PairLiquidity>{makeDataForPair("OCEAN").liq} OCEAN</PairLiquidity>
        </TableRow>
        <TableRow>
          <PairName>SLR</PairName>
          <PairPrice>{makeDataForPair("SLR").price}</PairPrice>
          <PairLiquidity>{makeDataForPair("SLR").liq} SLR</PairLiquidity>
        </TableRow>
        <TableRow>
          <PairName>SMUDGE</PairName>
          <PairPrice>{makeDataForPair("SMUDGE").price}</PairPrice>
          <PairLiquidity>{makeDataForPair("SMUDGE").liq} SMUDGE</PairLiquidity>
        </TableRow>
        <TableRow>
          <PairName>SUSU</PairName>
          <PairPrice>{makeDataForPair("SUSU").price}</PairPrice>
          <PairLiquidity>{makeDataForPair("SUSU").liq} SUSU</PairLiquidity>
        </TableRow>
        <LastUpdated>Last updated: {trackingData && trackingData.lastUpdated}</LastUpdated>
      </Table>
    </Container>
  )
}