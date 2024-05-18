import styled from 'styled-components'
import Colors from '../../theme/theme.colors'

export const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100;

  p {
    color: ${Colors.text.white};
    font-weight: 500;
    margin-bottom: 25px;
    font-size: 1.325rem;
    max-width: 50%;
    text-align: center;
  }
`

export const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
