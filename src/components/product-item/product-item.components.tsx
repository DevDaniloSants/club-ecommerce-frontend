import { FunctionComponent } from 'react'

import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from './product-item.styles'

import Product from '../../types/product.types'

interface IProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<IProductItemProps> = ({ product }) => {
  return (
    <ProductContainer>
      <ProductImage imageurl={product.imageUrl} />
      <ProductInfo>
        <p>{product.name}</p>
        <p>R$ {product.price}</p>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
