import styled from 'styled-components'

export const Container = styled.div`
  padding: 0px 40px 20px 40px;
`

export const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  p {
    font-size: 21px;
    font-weight: 500;
  }
`

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: start;
  margin-top: 5px;
  gap: 20px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
`

export const IconContainer = styled.div`
  display: flex;

  &:hover {
    cursor: pointer;
  }
`
