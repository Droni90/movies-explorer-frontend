import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import findIcon from "../../images/search-icon.svg";

function SearchForm({ setIsFilmsShot, isFilmsShot }) {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__wrap">
            <img src={findIcon} alt="Иконка поиска" className="search__icon" />
            <input placeholder="Фильм" className="search__input" required />
            <button type="submit" className="search__submit" />
          </div>
          <FilterCheckbox
            filterText="Короткометражки"
            setIsFilmsShot={setIsFilmsShot}
            isFilmsShot={isFilmsShot}
          />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
