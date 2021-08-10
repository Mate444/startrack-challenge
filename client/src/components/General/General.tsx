/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import { GeneralProps, HeroType } from "../../types";
import Hero from "../Hero/Hero";

const General = (props: GeneralProps) => {
  const { heroes, setHeroes, setFavoriteHeroes, favoriteHeroes } = props;
  const [ lastIndex, setLastIndex ] = useState(16);
  const [searchInput, setSearchInput] = useState<string>('');
  const [generalHeroes, setGeneralHeroes] = useState(heroes);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    async function getHeroes() {
      axios
        .get(
          "https://akabab.github.io/superhero-api/api/all.json"
        )
        .then((r) => {
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
          setGeneralHeroes(fixedHeroes)
        })
        .catch((err) => console.log(err));
    }
    getHeroes();
  }, []);
  useEffect(() => {
    const filtered = heroes?.filter((h) => favoriteHeroes.indexOf(h.id) === -1);
    filtered && setGeneralHeroes(filtered);
    if (flag) {
      localStorage.setItem('favoritesArray', JSON.stringify(favoriteHeroes));
    }
  }, [favoriteHeroes, heroes, flag]);
  useEffect(() => {
    const retrieved = localStorage.getItem('favoritesArray');
    retrieved && setFavoriteHeroes(JSON.parse(retrieved));
  }, [])
  useEffect(() => {
    const filtered = heroes?.filter((h) => favoriteHeroes.indexOf(h.id) === -1);
    if (searchInput.length > 0) {
      const heroResults = filtered?.filter((h) => h.name.includes(searchInput))
      heroResults && setGeneralHeroes(heroResults)
    } else {
      filtered && setGeneralHeroes(filtered);
    }
  }, [searchInput])
  function handleFavoriteHeroes(id: number) {
   setFavoriteHeroes([...favoriteHeroes, id]);
   setFlag(true);
  }
  return <div>
    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
    <div className='heroes-window'>
    {
      heroes && generalHeroes && generalHeroes.length > 0 ? generalHeroes?.map((h: HeroType, i: number) => (
        <div key={i}>
          <Hero favoriteHeroes={favoriteHeroes} hero={h} handleFavoriteHeroes={handleFavoriteHeroes} />
        </div>
      )) :
      <div>
        <h1>Hero Not Found</h1>
      </div>
    } 
    </div>    
  </div>;
};

export default General;
