import { FunctionComponent, useContext } from 'react'
import { BsCartPlus } from 'react-icons/bs'

import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from './product-item.styles'

import Product from '../../types/product.types'
import CustomButton from '../custom-button/custom-button'
import { CartContext } from '../../contexts/cart.context'

interface IProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<IProductItemProps> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    addProductToCart(product)
  }

  return (
    <ProductContainer>
      <ProductImage imageurl={product.imageUrl}>
        <CustomButton startIcon={<BsCartPlus />} onClick={handleAddToCart}>
          Adicionar ao carrinho
        </CustomButton>
      </ProductImage>
      <ProductInfo>
        <p>{product.name}</p>
        <p>R$ {product.price}</p>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
