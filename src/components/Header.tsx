import styled from 'styled-components'

const HeaderBar = styled.div`
  display: flex;
  flex: 0 1 100%;
  background-color: #222;
  color: #FFF;
  padding: 2rem 2rem 0 2rem;
  font-size: 2.5rem;
  font-weight: 500;
`
export const Header = () => {
  return ( 
    <HeaderBar>Carbonswap Tracker</HeaderBar>
  )
}