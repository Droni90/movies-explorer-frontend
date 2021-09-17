import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import findIcon from "../../images/search-icon.svg";

function SearchForm({
  handleShotMoviesFilter,
  isFilmsShot,
  handleSearchSubmit,
}) {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (evt) => setSearchValue(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearchSubmit(searchValue);
  };

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSubmit}>
          <div className="search__wrap">
            <img src={findIcon} alt="Иконка поиска" className="search__icon" />
            <input
              placeholder="Фильм"
              className="search__input"
              required
              onChange={handleSearch}
              value={searchValue}
            />
            <button type="submit" className="search__submit" />
          </div>
          <FilterCheckbox
            handleShotMoviesFilter={handleShotMoviesFilter}
            isFilmsShot={isFilmsShot}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
