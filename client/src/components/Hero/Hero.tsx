import React from "react";
import { HeroProps } from "../../types";
import "../Hero/Hero.css";

const Hero = (props: HeroProps) => {
  const { hero, handleFavoriteHeroes, index, favoriteHeroes } = props;

  let totalPower: number =
    hero?.power?.combat +
    hero?.power?.durability +
    hero?.power?.intelligence +
    hero?.power?.speed +
    hero?.power?.strength +
    hero?.power?.power;
  totalPower = Math.round(totalPower / 10);

  return hero ? (
    <div key={index} className="hero-container">
      <div className="hero-background-image-container">
        <img className="hero-background-image" src={hero.image} alt="hero" />
      </div>
      <div className="hero-wrapper">
        <img className="hero-image" src={hero.image} alt="hero" />
        <p className="hero-name">{hero.name}</p>
        {hero.realName && (
          <p className="hero-realname">
            Real Name: <br />
            {hero.realName}
          </p>
        )}
        <p className="hero-power">💪{totalPower}</p>
        <button
          className="hero-btn"
          onClick={() => handleFavoriteHeroes(hero?.id)}
        >
          ❤️
        </button>
      </div>
    </div>
  ) : null;
};

export default Hero;
