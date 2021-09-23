import { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import findIcon from "../../images/search-icon.svg";
import useFormWithValidation from "../../hooks/useFormValidation";

function SearchForm({ handleSubmit, handleChangeRadio }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    key: "",
  });
  const [searchError, setsearchError] = useState("");

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      setsearchError("");
      handleSubmit(values.key);
    } else if (values.key.length > 0) {
      setsearchError(errors.key);
    } else {
      setsearchError("Нужно ввести ключевое слово");
    }
  }
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form" onSubmit={handleSearchSubmit}>
          <div className="search__wrap">
            <img src={findIcon} alt="Иконка поиска" className="search__icon" />
            <input
              placeholder="Фильм"
              className="search__input"
              value={values.key}
              onChange={handleChange}
              name="key"
              autoComplete="off"
              id="key-input"
              type="text"
              minLength="1"
              maxLength="60"
              required
            />
            <span className="searchform__error" id="key-input-error">
              {searchError}
            </span>
            <button type="submit" className="search__submit" />
          </div>
          <FilterCheckbox handleChangeRadio={handleChangeRadio} />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
