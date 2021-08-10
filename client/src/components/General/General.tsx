import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import { GeneralProps, HeroType } from "../../types";
import Hero from "../Hero/Hero";

const General = (props: GeneralProps) => {
  const { heroes, setHeroes, setFavoriteHeroes, favoriteHeroes } = props;
  const [ lastIndex, setLastIndex ] = useState(16);
  const [generalHeroes, setGeneralHeroes] = useState(heroes);
  const loader = useRef(null);
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    console.log(target)
    if (target.isIntersecting) {
      setLastIndex(lastIndex + 16);
    }
  }, [setLastIndex, lastIndex])
  
  useEffect(() => {
    const target = document.querySelector('#heroes-list');
    const options = {
      root: target,
      rootMargin: '0px',
      threshold: 0.5
    };
    const observer = new IntersectionObserver(handleObserver, options);
    console.log(loader)
    if (loader && loader.current) {
      target && observer.observe(target);
    }
  }, [loader, handleObserver])
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
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const filtered = heroes?.filter((h) => favoriteHeroes.indexOf(h.id) === -1);
    filtered && setGeneralHeroes(filtered);
    console.log(filtered);
  }, [favoriteHeroes, heroes]);
  const heroesToDisplay = generalHeroes?.slice(0, lastIndex);
  function handleFavoriteHeroes(id: number) {
   setFavoriteHeroes([...favoriteHeroes, id]);
  }
  return <div>
    <SearchBar />
    <div ref={loader} id='heroes-list' className='heroes-window'>
    {
      heroes && heroesToDisplay?.map((h: HeroType, i: number) => (
        <div key={i}>
          <Hero favoriteHeroes={favoriteHeroes} hero={h} handleFavoriteHeroes={handleFavoriteHeroes} />
        </div>
      ))
    }
    </div>    
  </div>;
};

export default General;
