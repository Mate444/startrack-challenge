import React, { useState } from 'react';
import { FavoriteProps, HeroType } from '../../types';
import FavoriteHero from '../FavoriteHero/FavoriteHero';

function filterProperly(arr1:any, arr2:any) {
  const newArr = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i].id) !== - 1) {
      newArr.push(arr1[i])
    }
  }
  return newArr;
}

const Favorites = (props: FavoriteProps) => {
  const { heroes, favoriteHeroes, setFavoriteHeroes } = props;
  const [toggle, setToggle] = useState('open');
  function handleFavoriteHeroes(id: number) {
    const filteredFavoriteHeroes = favoriteHeroes.filter((heroId: number) => heroId !== id);
    localStorage.setItem('favoritesArray', JSON.stringify(filteredFavoriteHeroes));
    setFavoriteHeroes(filteredFavoriteHeroes);
  };
  const filteredFavorites = heroes?.filter((h) => favoriteHeroes.indexOf(h.id) !== -1);
  return (
    <div>
      {
        toggle === 'open' &&
        <div>
          <div>
          {
          filteredFavorites && filteredFavorites.map((h: HeroType, i: number) => (
            <div key={i}>
                <FavoriteHero hero={h} handleFavoriteHeroes={handleFavoriteHeroes} favoriteHeroes={favoriteHeroes} />
              </div>
            ))
         }
         <button onClick={() => setToggle('closed')}>▲</button>
          </div>
        </div>
      }
      {
        toggle === 'closed' &&
        <div>
          <p>Liked</p>
          <button onClick={() => setToggle('open')}>▼</button>
        </div>
      }
  
    </div>
  );
};

export default Favorites;
