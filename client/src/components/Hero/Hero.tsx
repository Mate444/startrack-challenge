import React from 'react';
import { HeroProps } from '../../types';

const Hero = (props: HeroProps) => {
  const { hero: {name, realName, image, power, id}, handleFavoriteHeroes } = props;
  const { combat, durability, intelligence, speed, strength } = power;
  let totalPower:number = combat + durability + intelligence + speed + strength + power.power;
  totalPower = Math.round(totalPower / 10);
  return (
    <div>
      <p>{name}</p>
      <p>{realName}</p>
      <p>{totalPower}</p>
      <img src={image} alt='hero' />
      <button onClick={() => handleFavoriteHeroes(id)}>Add</button>
    </div>
  )
}

export default Hero;
