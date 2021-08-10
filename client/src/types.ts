import React from "react";

export interface GeneralProps {
  heroes: HeroType[] | null,
  setHeroes: React.Dispatch<React.SetStateAction<HeroType[] | null>>,
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
  hero: HeroType,
  handleFavoriteHeroes(id: number): void,
  favoriteHeroes: number[]
}
