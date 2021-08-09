import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import { GeneralProps, HeroType } from "../../types";
const General = (props: GeneralProps) => {
  const { heroes, setHeroes } = props;
  const [ lastIndex, setLastIndex ] = useState(16);
  const loader = useRef(null);
    console.log();
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
  console.log(lastIndex)
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
        })
        .catch((err) => console.log(err));
    }
    getHeroes();
    //eslint-disable-next-line
  }, []);
  console.log(heroes);
  const heroesToDisplay = heroes?.slice(0, lastIndex);
  return <div>
    <SearchBar />
    <div ref={loader} id='heroes-list' className='heroes-window'>
    {
      heroes && heroesToDisplay?.map((h, i) => (
        <div key={i}>
          <p>{h.name}</p>
          <p>{h.realName}</p>
          <img src={h.image} alt='Hero'/>
        </div>
      ))
    }
    </div>    
  </div>;
};

export default General;
