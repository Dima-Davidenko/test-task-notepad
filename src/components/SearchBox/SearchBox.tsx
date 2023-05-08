import React from 'react';
import css from './SearchBox.module.css';

interface ISearchBox {
  searchInput: string;
  setSearchInput: (inputValue: string) => void;
}

const SearchBox: React.FC<ISearchBox> = ({ setSearchInput, searchInput }) => {
  return (
    <input
      className={css.input}
      type="text"
      onChange={e => setSearchInput(e.target.value)}
      value={searchInput}
      placeholder="Пошук"
    />
  );
};

export default SearchBox;
