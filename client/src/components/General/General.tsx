/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useMediaQuery } from '@material-ui/core';
import SearchBar from "../SearchBar/SearchBar";
import { GeneralProps, HeroType, GridProps } from "../../types";
import {FixedSizeGrid} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer'
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

  let columnCount = 0;
  const S = useMediaQuery('(max-width: 425px)');
  const XL = useMediaQuery('(min-width: 1440px)')

  if (S) {
    columnCount = 1;
  } else if (XL) {
    columnCount = 5
  } else {
    columnCount = 4;
  }
  
  const Cell = (props:GridProps) => {
    const { data, columnIndex, rowIndex, style } = props;
    let index = rowIndex * columnCount + columnIndex;
    return (
    <div style={style}>
      <Hero key={rowIndex} index={rowIndex} favoriteHeroes={favoriteHeroes} hero={data[index]} handleFavoriteHeroes={handleFavoriteHeroes} />
    </div>
  )};

  return <div className='general-container'>
    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      { generalHeroes && generalHeroes.length > 0 ?
      <AutoSizer>
        {({width, height}) => (
          <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={S ? 242 : 285}
          height={550}
          rowCount={Math.round(generalHeroes.length / columnCount) < 1 ? 1 : Math.round(generalHeroes.length / 4)}
          rowHeight={S ? 394 : 174}
          itemData={generalHeroes}
          width={width}
          className='general-grid'
        >
          {Cell }
        </FixedSizeGrid>
        )}
      </AutoSizer>
        
     :
        <div className='general'>
        <h1>Hero Not Found</h1>
      </div>
      }
  </div>;
};

export default (General);
