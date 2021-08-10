import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import { GeneralProps, HeroType } from "../../types";
const General = (props: GeneralProps) => {
  const { heroes, setHeroes } = props;
  const [ lastIndex, setLastIndex ] = useState(16);
  const [searchInput, setSearchInput] = useState<string>('');
  const target = document.querySelector('#general-loader');
  const options = {
    root: null, //this is the viewport
    threshold: 0.50, // esto seria cuanto porcentaje del target tiene que verse para que se ejecute el observer
    rootMargin: '150px' //Esto hace que se demore mas el viewport en ser watcheado
  };
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        setLastIndex(lastIndex + 8);
      }
    })
  }, options)
  target && observer.observe(target)
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
  useEffect(() => {
    
  })
  const heroesToDisplay = heroes?.slice(0, lastIndex);
  return <div>
    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
    <div className='heroes-window'>
    {
      heroes && heroesToDisplay?.map((h, i) => (
        <div key={i}>
          <p>{h.name}</p>
          <p>{h.realName}</p>
          <img src={h.image} alt='Hero'/>
        </div>
      ))
    }
    <p id='general-loader'>Loading...</p>
    </div>    
  </div>;
};

export default General;
