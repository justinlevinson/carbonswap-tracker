import { Header } from './Header'
import { Tracker } from './Tracker'
import styled from 'styled-components'
import { Methodology } from './Methodology'

const MainDiv = styled.div`
  height: 100vh;
  background-color: #222;
`
export const Main = () => {

  return (
    <MainDiv>
      <Header />
      <Tracker />
      <Methodology />
    </MainDiv>
  )
}