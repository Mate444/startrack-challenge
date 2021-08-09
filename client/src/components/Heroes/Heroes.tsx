import React from 'react';
import { HeroType } from '../../types';

const Hero = (props: HeroType) => {
  const {name, realName, image, power} = props;
  return (
    <div>
      <p>{name}</p>
      <p>{realName}</p>
      <img src={image} alt='hero' />
    </div>
  )
}

export default Hero;
