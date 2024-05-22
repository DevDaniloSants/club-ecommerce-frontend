import { FunctionComponent } from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

import { addProduct } from '../../store/reducers/cart/cart.actions'

import {
  ProductContainer,
  ProductImage,
  ProductInfo,
} from './product-item.styles'

import Product from '../../types/product.types'
import CustomButton from '../custom-button/custom-button'

interface IProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<IProductItemProps> = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addProduct(product))
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
