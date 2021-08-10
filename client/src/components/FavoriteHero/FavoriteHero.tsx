import React from 'react';
import { HeroProps } from '../../types';

const FavoriteHero = (props: HeroProps) => {
  const { hero : { power, name, realName, image, id }, handleFavoriteHeroes } = props
  return (
    <div>
      <p>{name}</p>
      <p>{realName}</p>
      <img src={image} alt='hero' />
      <button onClick={() => handleFavoriteHeroes(id)}>Delete</button>
    </div>
  )
}

export default FavoriteHero;
