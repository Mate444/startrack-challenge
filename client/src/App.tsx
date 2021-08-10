import React, { useState } from 'react';
import { HeroType } from './types';
import General from './components/General/General';
import Favorites from './components/Favorites/Favorites';
import './App.css';

function App() {
  const [heroes, setHeroes] = useState<HeroType[] | null>([]);
  const [favoriteHeroes, setFavoriteHeroes] = useState<number[]>([]);
  return (
    <div>
      <Favorites heroes={heroes} favoriteHeroes={favoriteHeroes} setFavoriteHeroes={setFavoriteHeroes} />
      <General favoriteHeroes={favoriteHeroes} setFavoriteHeroes={setFavoriteHeroes} heroes={heroes} setHeroes={setHeroes}/>
    </div>
  );
};

export default App;
