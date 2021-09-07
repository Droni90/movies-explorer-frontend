import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ filterText, setIsFilmsShot, isFilmsShot }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          type="radio"
          className="filter-checkbox__input"
          checked={isFilmsShot}
          onClick={setIsFilmsShot}
          onChange={() => {}}
        />
        <span className="filter-checkbox__round" />
      </label>
      <p className="filter-checkbox__text">{filterText}</p>
    </div>
  );
}

export default FilterCheckbox;
