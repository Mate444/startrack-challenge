import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeroType } from './types';
import General from './components/General/General';
import Favorites from './components/Favorites/Favorites';
import ContentLoader from 'react-content-loader';
import './App.css';

function App() {
  const [heroes, setHeroes] = useState<HeroType[] | null>(null);
  const [favoriteHeroes, setFavoriteHeroes] = useState<number[]>([]);
  useEffect(() => {
    async function getHeroes() {
      axios
        .get(
          "https://akabab.github.io/superhero-api/api/all.json"
        )
        .then((r) => {
          // Type any because I don't know what type of data the api responds me with
          const fixedHeroes = r.data.map((h:any) => {
            return {
              id: h.id,
              name: h.name,
              realName: h.biography.fullName,
              power: h.powerstats,
              image: h.images.sm,
            }
          });
          setHeroes(fixedHeroes);
        })
        .catch((err) => console.log(err));
    }
    getHeroes();
  }, []);
  const MyLoader = () => (
    <ContentLoader
    speed={2}
    width='100%'
    backgroundColor='#'
    height={900}
    >
    <rect x="175" y="125" rx="5" ry="5" width="225" height="30" />
    <rect x="175" y="175" rx="4" ry="4" width="225" height="120" />
    <rect x="425" y="175" rx="4" ry="4" width="225" height="120" />
    <rect x="675" y="175" rx="4" ry="4" width="225" height="120" />
    <rect x="925" y="175" rx="4" ry="4" width="225" height="120" />
    <rect x="175" y="425" rx="4" ry="4" width="225" height="30" />
    <rect x="175" y="475" rx="4" ry="4" width="225" height="120" />
    <rect x="425" y="475" rx="4" ry="4" width="225" height="120" />
    <rect x="675" y="475" rx="4" ry="4" width="225" height="120" />
    <rect x="925" y="475" rx="4" ry="4" width="225" height="120" />
    <rect x="175" y="625" rx="4" ry="4" width="225" height="120" />
    <rect x="425" y="625" rx="4" ry="4" width="225" height="120" />
    <rect x="675" y="625" rx="4" ry="4" width="225" height="120" />
    <rect x="925" y="625" rx="4" ry="4" width="225" height="120" />

    </ContentLoader>
  )
  return (
    <div className='app-container'>
      <h1 className='app-h1'>Startrack Challenge</h1>
      {
        heroes !== null ?
        <div className='info-container'>
          <Favorites heroes={heroes} favoriteHeroes={favoriteHeroes} setFavoriteHeroes={setFavoriteHeroes} />
          <h1 className='app-h1'>All Heroes</h1>
          <General favoriteHeroes={favoriteHeroes} setFavoriteHeroes={setFavoriteHeroes} heroes={heroes} setHeroes={setHeroes}/>
        </div> :
        <div className='loader-container'>
        <MyLoader />
        </div>
      }
    </div>
  );
};

export default App;
