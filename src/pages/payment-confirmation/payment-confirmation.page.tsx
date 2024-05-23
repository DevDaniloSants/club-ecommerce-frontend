import { FunctionComponent, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineHome,
} from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import Colors from '../../theme/theme.colors'
import { clearProducts } from '../../store/reducers/cart/cart.actions'

import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent,
} from './payment-confirmation.styles'

import CustomButton from '../../components/custom-button/custom-button'

const PaymentConfirmationPage: FunctionComponent = () => {
  const [searchParams] = useSearchParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = searchParams.get('success')
  const isCanceled = searchParams.get('canceled')

  useEffect(() => {
    if (status === 'true') {
      dispatch(clearProducts())
    }
  }, [])

  const handleGoToHomePageClick = () => {
    navigate('/')
  }

  return (
    <PaymentConfirmationContainer>
      <PaymentConfirmationContent>
        {status === 'true' && (
          <>
            <AiOutlineCheckCircle size={120} color={Colors.success} />
            <p>Compra finalizada com sucesso!</p>
          </>
        )}
        {status === 'false' ||
          (isCanceled && (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.error} />
              <p>
                Ocorreu um erro ao finalizar a sua compra.Por favor, tente
                novamente mais tarde.
              </p>
            </>
          ))}
        <CustomButton
          startIcon={<AiOutlineHome />}
          onClick={handleGoToHomePageClick}
        >
          Ir para a Página Inicial
        </CustomButton>
      </PaymentConfirmationContent>
    </PaymentConfirmationContainer>
  )
}

export default PaymentConfirmationPage
