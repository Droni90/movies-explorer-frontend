import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const Movies = (props) => {
  return (
    <section className="movies">
      <SearchForm
        handleSubmit={props.handleSubmit}
        handleChangeRadio={props.handleChange}
      />
      {props.isLoading ? <Preloader /> : null}
      {props.isNotFound ? (
        <p className="movies__found-error">Ничего не найдено</p>
      ) : null}
      {props.isError ? (
        <p className="movies__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      ) : null}
      <MoviesCardList isSaved={false} {...props} />
    </section>
  );
};

export default Movies;
