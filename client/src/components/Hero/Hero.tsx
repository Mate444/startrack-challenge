import React from 'react';
import { HeroProps } from '../../types';
import './Hero.css';

const Hero = (props: HeroProps) => {
  const { hero: {name, realName, image, power, id}, handleFavoriteHeroes } = props;
  const { combat, durability, intelligence, speed, strength } = power;
  let totalPower:number = combat + durability + intelligence + speed + strength + power.power;
  totalPower = Math.round(totalPower / 10);
  return (
    <div className='hero-container'>
      <img className='hero-image' src={image} alt='hero' />
      <p className='hero-name'>{name}</p>
      <p className='hero-realname'>{realName}</p>
      <p className='hero-power'>💪{totalPower}</p>
      <button className='hero-btn' onClick={() => handleFavoriteHeroes(id)}>❤️</button>
    </div>
  )
}

export default Hero;
