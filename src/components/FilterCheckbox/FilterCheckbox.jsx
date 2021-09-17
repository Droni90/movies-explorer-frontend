import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleShotMoviesFilter, isFilmsShot }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          type="radio"
          className="filter-checkbox__input"
          checked={isFilmsShot}
          onClick={handleShotMoviesFilter}
          onChange={() => {}}
        />
        <span className="filter-checkbox__round" />
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
