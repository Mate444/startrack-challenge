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
    <div className='hero-background-image-container'> 
    <img className='hero-background-image' src={image} alt='hero'/>
    </div>
    <div className='hero-wrapper' >
      { favoriteHeroes.length > 0 && favoriteHeroes[favoriteHeroes.length - 1] === favoriteHeroes[index] ? <p className='new-hero'>Liked Recently</p> : null }
      <img className='hero-image' src={image} alt='hero' />
      <p className='hero-name'>{name}</p>
      { realName && <p className='hero-realname'>Real Name: <br/>
       {realName}</p> }
      <p className='hero-power'>💪{totalPower}</p>
      { favoriteHeroes[id] ? <button className='hero-btn' onClick={() => handleFavoriteHeroes(id)}>💔</button> : <button className='hero-btn' onClick={() => handleFavoriteHeroes(id)}>❤️</button>}
    </div>
    </div>
  )
}

export default Hero;
