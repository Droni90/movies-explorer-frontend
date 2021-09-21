import { useRef } from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = ({ handleChangeRadio }) => {
  const checked = useRef();
  function handleChange() {
    handleChangeRadio(checked.current.checked);
    console.log("S");
  }
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label" htmlFor="shortfilm">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          ref={checked}
          id="shortfilm"
          onChange={handleChange}
          defaultChecked={false}
        />
        <span className="filter-checkbox__round" />
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
};

export default FilterCheckbox;
