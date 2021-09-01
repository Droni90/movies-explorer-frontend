import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ filterText, setIsFilmsShot, isFilmsShot }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          value={isFilmsShot}
          onClick={setIsFilmsShot}
        />
        <span className="filter-checkbox__round" />
      </label>
      <p className="filter-checkbox__text">{filterText}</p>
    </div>
  );
}

export default FilterCheckbox;
