import React from 'react'
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
  const { width, height } = useWindowSize();

  return <OrbStyled $width={width} $height={height} />;
}

const OrbStyled = styled.div`
  width: 70vh;
  height: 70vh;
  position: absolute;
  margin-top: -37vh;
  margin-left: -37vh;
  border-radius: 50%;
  background: linear-gradient(180deg,rgb(245, 186, 98) 0%, #F2994A 100%);
  filter: blur(200px);
  animation: ${({ $width, $height }) => keyframes`
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(${($width || 1000) }px, ${($height || 800) / 2}px);
    }
    100% {
      transform: translate(0, 0);
    }
  `} 5s alternate linear infinite;
`;

export default Orb;
