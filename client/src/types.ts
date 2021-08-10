import React from "react";

export interface GeneralProps {
  heroes: HeroType[] | null,
  setHeroes: React.Dispatch<React.SetStateAction<null>>,
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

