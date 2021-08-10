/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import { GeneralProps, HeroType } from "../../types";
import {FixedSizeList} from 'react-window';
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
  const Row = (props:any) => {
    const { rowIndex, style, data } = props;
    console.log(props);
    return (
      <div>
     { heroes && generalHeroes && generalHeroes.length > 0 && data?.map((h: HeroType, i: number) => (
        <div key={i}>
          <Hero favoriteHeroes={favoriteHeroes} hero={h} handleFavoriteHeroes={handleFavoriteHeroes} />
        </div>
              ))
     }
      </div>    
    )
  }
  return <div>
    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      { heroes && generalHeroes && generalHeroes.length > 0 ?
        <FixedSizeList
       itemSize={300}
       width='100%'
       height={300}
       itemCount={1}
       itemData={generalHeroes}
        >
          {Row}
        </FixedSizeList> :
        <div>
        <h1>Hero Not Found</h1>
      </div>
      }

  </div>;
};

export default General;
