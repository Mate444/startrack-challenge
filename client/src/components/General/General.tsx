/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { GeneralProps, HeroType, GridProps } from "../../types";
import {FixedSizeGrid} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Hero from "../Hero/Hero";

const General = (props: GeneralProps) => {
  const { heroes, setFavoriteHeroes, favoriteHeroes } = props;
  const [searchInput, setSearchInput] = useState<string>('');
  const [generalHeroes, setGeneralHeroes] = useState<HeroType[] | null>(heroes);
  
  useEffect(() => {
    const retrieved: string | null = localStorage.getItem('favoritesArray');
    retrieved && setFavoriteHeroes(JSON.parse(retrieved));
  }, [])

  useEffect(() => {
    const filtered: HeroType[] | undefined = heroes?.filter((h) => favoriteHeroes.indexOf(h.id) === -1);  
    filtered && setGeneralHeroes(filtered);
      localStorage.setItem('favoritesArray', JSON.stringify(favoriteHeroes));
  }, [favoriteHeroes]);

  useEffect(() => {
    const filtered: HeroType[] | undefined = heroes?.filter((h) => favoriteHeroes.indexOf(h.id) === -1);
    if (searchInput.length > 0) {
      const heroResults: HeroType[] | undefined = filtered?.filter((h) => h.name.includes(searchInput) || h.realName.includes(searchInput));
      heroResults && setGeneralHeroes(heroResults);
    } else {
      filtered && setGeneralHeroes(filtered);
    };
  }, [searchInput])
  
  function handleFavoriteHeroes(id: number): void {
   setFavoriteHeroes([...favoriteHeroes, id]);
   window.scrollTo(0, 0);
  };
  const Cell = (props:GridProps) => {
    const { data, rowIndex } = props;
    return (
    <div className='general-hero'>
      <Hero key={rowIndex} index={rowIndex} favoriteHeroes={favoriteHeroes} hero={data[rowIndex]} handleFavoriteHeroes={handleFavoriteHeroes} />
    </div>
  )};

  const styles = {
    display: 'flex',
    rowDirection: 'column',
  }

  return <div className='general-container'>
    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      { generalHeroes && generalHeroes.length > 0 ?
        <AutoSizer>
          {
            ({ height, width }) => (
              <FixedSizeGrid
        columnCount={1}
        columnWidth={250}
        height={height}
        rowCount={generalHeroes.length}
        rowHeight={450}
        itemData={generalHeroes}
        width={width}
        style={styles}
      >
        {Cell}
      </FixedSizeGrid>
            )
          }
      </AutoSizer>
     :
        <div className='general-h1'>
        <h1>Hero Not Found</h1>
      </div>
      }
  </div>;
};

export default General;
