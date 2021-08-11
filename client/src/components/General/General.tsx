/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { GeneralProps, HeroType } from "../../types";
import {FixedSizeList} from 'react-window';
import Hero from "../Hero/Hero";
import swal from 'sweetalert2'
import './General.css';

const General = (props: GeneralProps) => {
  const { heroes, setFavoriteHeroes, favoriteHeroes } = props;
  const [searchInput, setSearchInput] = useState<string>('');
  const [generalHeroes, setGeneralHeroes] = useState<HeroType[] | null>(heroes);
  const [flag, setFlag] = useState<boolean>(false);
  
  useEffect(() => {
    const filtered: HeroType[] | undefined = heroes?.filter((h) => favoriteHeroes.indexOf(h.id) === -1);  
    filtered && setGeneralHeroes(filtered);
    if (flag) {
      localStorage.setItem('favoritesArray', JSON.stringify(favoriteHeroes));
    };
  }, [favoriteHeroes]);
  useEffect(() => {
    const retrieved: string | null = localStorage.getItem('favoritesArray');
    retrieved && setFavoriteHeroes(JSON.parse(retrieved));
  }, [])
  useEffect(() => {
    const filtered: HeroType[] | undefined = heroes?.filter((h) => favoriteHeroes.indexOf(h.id) === -1);
    if (searchInput.length > 0) {
      const heroResults: HeroType[] | undefined = filtered?.filter((h) => h.name.includes(searchInput));
      heroResults && setGeneralHeroes(heroResults);
    } else {
      filtered && setGeneralHeroes(filtered);
    };
  }, [searchInput])
  function handleFavoriteHeroes(id: number): void {
    swal.fire({
     title: 'New Hero added to Favorites!',
     icon: 'success'
   });
   setFavoriteHeroes([...favoriteHeroes, id]);
   setFlag(true);
   window.scrollTo(0, 0);
  };
  const Row = (props:any) => {
    const { data } = props;
    return (
      <div className='general-heroes'>
     { data?.map((h: HeroType, i: number) => (
          <Hero key={i} index={i} favoriteHeroes={favoriteHeroes} hero={h} handleFavoriteHeroes={handleFavoriteHeroes} />
              ))
     }
      </div>    
    )
  }
  return <div className='general-container'>
    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      { heroes && generalHeroes && generalHeroes.length > 0 ?
        <FixedSizeList
       itemSize={300}
       width='100%'
       height={500}
       itemCount={1}
       itemData={generalHeroes}
        >
          {Row}
        </FixedSizeList> :
        <div className='general'>
        <h1>Hero Not Found</h1>
      </div>
      }

  </div>;
};

export default General;
