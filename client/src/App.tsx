import React, { useState } from 'react';
import General from './components/General/General';
import './App.css';

function App() {
  const [heroes, setHeroes] = useState(null);
  const [favoriteHeroes, setFavoriteHeroes] = useState(null);
  return (
    <div>
      <General heroes={heroes} setHeroes={setHeroes}/>
    </div>
  );
};

export default App;
