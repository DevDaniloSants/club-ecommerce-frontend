import styled from 'styled-components'

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`

export const CategoryTitle = styled.p`
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 5px;
`

export const ProductsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  max-width: 1920px;

  @media (max-width: 768px) {
    row-gap: 20px;
  }
`
