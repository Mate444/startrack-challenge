import React from 'react';
import { HeroProps } from '../../types';
import '../Hero/Hero.css';

const Hero = (props: HeroProps) => {
  const { hero : { power, name, realName, image, id }, handleFavoriteHeroes, index, favoriteHeroes } = props
  const { combat, durability, intelligence, speed, strength } = power;

  let totalPower:number = combat + durability + intelligence + speed + strength + power.power;
  totalPower = Math.round(totalPower / 10);
  
  return (
    <div className='hero-container'>

      { favoriteHeroes.length > 0 && favoriteHeroes[favoriteHeroes.length - 1] === favoriteHeroes[index] ? <p className='new-hero'>New</p> : null }
      <img className='hero-image' src={image} alt='hero' />
      <p className='hero-name'>{name}</p>
      { realName && <p className='hero-realname'>Real Name: {realName}</p> }
      <p className='hero-power'>💪{totalPower}</p>
      <button className='hero-btn' onClick={() => handleFavoriteHeroes(id)}>💔</button>
    </div>
  )
}

export default Hero;
