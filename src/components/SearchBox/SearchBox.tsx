import React from 'react';

interface ISearchBox {
  searchInput: string;
  setSearchInput: (inputValue: string) => void;
}

const SearchBox: React.FC<ISearchBox> = ({ setSearchInput, searchInput }) => {
  return (
    <input
      type="text"
      onChange={e => setSearchInput(e.target.value)}
      value={searchInput}
      placeholder="Search"
    />
  );
};

export default SearchBox;
