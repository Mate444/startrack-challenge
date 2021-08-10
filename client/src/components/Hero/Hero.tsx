import React from 'react';
import { HeroProps } from '../../types';
import Favorites from '../Favorites/Favorites';

const Hero = (props: HeroProps) => {
  const { hero: {name, realName, image, power, id}, handleFavoriteHeroes } = props;
  return (
    <div>
      <p>{name}</p>
      <p>{realName}</p>
      <img src={image} alt='hero' />
      <button onClick={() => handleFavoriteHeroes(id)}>Add</button>
    </div>
  )
}

export default Hero;
