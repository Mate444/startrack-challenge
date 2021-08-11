import React from 'react';
import { SearchInput } from '../../types';
import '../General/General.css';

const SearchBar = (props: SearchInput) => {
  const { searchInput, setSearchInput } = props;
  function handleInputChange(e:any) {
    setSearchInput(e.target.value);
  }
  return (
    <div className='general-input-container'>
      <label>🔍</label>
      <input className={'general-input'} onChange={handleInputChange} value={searchInput} />
    </div>
  );
};

export default SearchBar;
