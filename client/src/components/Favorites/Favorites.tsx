import React, { useState, useMemo } from 'react';
import { FavoriteProps, HeroType } from '../../types';
import Hero from '../Hero/Hero';
import './Favorites.css';

//Sorts the heroes according to the first added
function sortFavorites(arr1:number[], arr2:HeroType[] | undefined) {
  const newArr: HeroType[] = [];
  arr1.forEach((id:number, index:number) => {
    arr2 && arr2.forEach((h:HeroType) => {
      if (id === h.id) {
        newArr.push(h);
      };
    });
  });
  return newArr;
};

const Favorites = (props: FavoriteProps) => {
  const { heroes, favoriteHeroes, setFavoriteHeroes } = props;
  const [toggle, setToggle] = useState<string>('open');
  function handleFavoriteHeroes(id: number) {
    const filteredFavoriteHeroes: number[] | undefined = favoriteHeroes.filter((heroId: number) => heroId !== id);
    localStorage.setItem('favoritesArray', JSON.stringify(filteredFavoriteHeroes));
    setFavoriteHeroes(filteredFavoriteHeroes);
  };

  let filteredFavorites = useMemo(() => {
    return heroes?.filter((h: HeroType) => favoriteHeroes.indexOf(h.id) !== -1);
  }, [favoriteHeroes, heroes]);

    filteredFavorites = useMemo(() => sortFavorites(favoriteHeroes, filteredFavorites) ,[favoriteHeroes, filteredFavorites])
  

  return (
    <div className='favorites-container'>
      <h1 className='favorites-h1'>Liked</h1>
      {
        toggle === 'open' &&
        <div className='favorites-wrapper'>
          <div className='favorite-heroes'>
          {
           filteredFavorites && filteredFavorites.length > 0 ? filteredFavorites.map((h: HeroType, i: number) => (
                <Hero key={i} index={i} hero={h} handleFavoriteHeroes={handleFavoriteHeroes} favoriteHeroes={favoriteHeroes} />
            )) : <h1 className='favorites-h1'>You haven't added any heroes yet</h1>
         }
          </div>
          <button className='collapse-btn' onClick={() => setToggle('closed')}>▲</button>
        </div>
      }
      {
        toggle === 'closed' &&
        <div className='favorites-wrapper'>
          <button className='collapse-btn' onClick={() => setToggle('open')}>▼</button>
        </div>
      }
  
    </div>
  );
};

export default Favorites;
