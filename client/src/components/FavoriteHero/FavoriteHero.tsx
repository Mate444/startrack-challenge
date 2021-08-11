import React from 'react';
import { HeroProps } from '../../types';

const FavoriteHero = (props: HeroProps) => {
  const { hero : { power, name, realName, image, id }, handleFavoriteHeroes, index, favoriteHeroes } = props
  const { combat, durability, intelligence, speed, strength } = power;

  let totalPower:number = combat + durability + intelligence + speed + strength + power.power;
  totalPower = Math.round(totalPower / 10);
  return (
    <div>
      { favoriteHeroes[favoriteHeroes.length - 1] === favoriteHeroes[index] ? <p>New</p> : null }
      <p>{name}</p>
      <p>{realName}</p>
      <p>{totalPower}</p>
      <img src={image} alt='hero' />
      <button onClick={() => handleFavoriteHeroes(id)}>Delete</button>
    </div>
  )
}

export default FavoriteHero;
