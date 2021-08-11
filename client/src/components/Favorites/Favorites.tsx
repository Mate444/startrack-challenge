import React, { useState } from 'react';
import { FavoriteProps, HeroType } from '../../types';
import FavoriteHero from '../FavoriteHero/FavoriteHero';
import swal from 'sweetalert2'

//Sorts the heroes according to the first added
function sortFavorites(arr1:number[], arr2:HeroType[]) {
  const newArr: HeroType[] = [];
  arr1.forEach((id:number, index:number) => {
    arr2.forEach((h:HeroType) => {
      if (id === h.id) {
        newArr.push(h);
      }
    })
  })
  return newArr;
}

const Favorites = (props: FavoriteProps) => {
  const { heroes, favoriteHeroes, setFavoriteHeroes } = props;
  const [toggle, setToggle] = useState('open');
  function handleFavoriteHeroes(id: number) {
    swal.fire({
      title: 'Hero deleted from Favorites',
      icon: 'warning',
    })
    const filteredFavoriteHeroes = favoriteHeroes.filter((heroId: number) => heroId !== id);
    localStorage.setItem('favoritesArray', JSON.stringify(filteredFavoriteHeroes));
    setFavoriteHeroes(filteredFavoriteHeroes);
  };
  let filteredFavorites = heroes?.filter((h) => favoriteHeroes.indexOf(h.id) !== -1);
  if (filteredFavorites !== undefined) {
    filteredFavorites = sortFavorites(favoriteHeroes, filteredFavorites);
  }
  return (
    <div>
      {
        toggle === 'open' &&
        <div>
          <div>
          {
          filteredFavorites && filteredFavorites.map((h: HeroType, i: number) => (
            <div key={i}>
                <FavoriteHero  index={i} hero={h} handleFavoriteHeroes={handleFavoriteHeroes} favoriteHeroes={favoriteHeroes} />
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
          <p>You haven't added a Hero to your favorites list yet</p>
          <button onClick={() => setToggle('open')}>▼</button>
        </div>
      }
  
    </div>
  );
};

export default Favorites;
