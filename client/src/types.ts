import React from "react";

import { CSSProperties } from "react";
export interface GeneralProps {
  heroes: HeroType[] | null,
  setFavoriteHeroes: React.Dispatch<React.SetStateAction<number[]>>
  favoriteHeroes: number[]
}

export interface HeroType {
  id: number,
  name: string,
  realName: string,
  image: string,
  power: HeroPowers,
}

export interface HeroPowers {
  intelligence: number,
  strength: number,
  speed: number,
  durability: number,
  power: number,
  combat: number,
}

export interface SearchInput {
  searchInput: string,
  setSearchInput: React.Dispatch<React.SetStateAction<string>>, 
}

export interface FavoriteProps {
  favoriteHeroes: number[],
  setFavoriteHeroes: React.Dispatch<React.SetStateAction<number[]>>,
  heroes: HeroType[] | null,
}

export interface HeroProps {
  index: number,
  hero: HeroType,
  handleFavoriteHeroes(id: number): void,
  favoriteHeroes: number[]
}

export interface GridProps {
  data: HeroType[],
  rowIndex: number,
  columnIndex: number,
  style: CSSProperties,
  itemKey?: any,
}
