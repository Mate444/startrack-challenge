import React from 'react';
import { SearchInput } from '../../types';

const SearchBar = (props: SearchInput) => {
  const { searchInput, setSearchInput } = props;
  function handleInputChange(e:any) {
    setSearchInput(e.target.value);
  }
  return (
    <div>
      <input onChange={handleInputChange} value={searchInput} />
    </div>
  );
};

export default SearchBar;
