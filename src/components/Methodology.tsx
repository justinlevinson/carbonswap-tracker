import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 0 1 100%;
  flex-wrap: wrap;
  background-color: #222;
  color: #FFF;
  padding: 2rem;
  flex-wrap: wrap;
`

const MethodologyHeader = styled.div`
display: flex;
flex: 0 1 100%;
font-size: 1.5rem;
font-weight: 600;
`

const MethodologyParagraph = styled.div`
display: flex;
flex: 0 1 100%;
padding-top: 1rem;
padding-bottom: 1rem;
max-width: 65%;
justify-content: flex-start;
align-content: flex-start;
text-align: left;
line-height: 1.3;
`

export const Methodology = () => {

  return (
    <Container>
      <MethodologyHeader>How it Works</MethodologyHeader>
      <MethodologyParagraph>Data is taken directly from the reserve balances of the deployed pool contracts on the Energy Web Chain and exported to a JSON file, refreshed every 2 minutes. Because most pairs have the greatest liquidity in the EWT pools these are usually the best representation of price: the EWT-DAI price is calculated and used to convert the rest to USD. Liquidity is represented by the maximum purchaseable token amount (i.e. if EWT-DAI has 1000 EWT, the liquidity would be 1000 regardless of the amount of DAI in the pool or the price.)</MethodologyParagraph>
      <MethodologyParagraph>Find it useful? Any Carbonswap-supported token gladly accepted at 0x2947a1d65e9E68BDbBE6b5Ddf1220E4Cc4C120d9 :)</MethodologyParagraph>
    </Container>
  )
}