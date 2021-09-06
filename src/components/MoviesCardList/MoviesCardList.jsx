import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onMoreButtonClick, searchValue }) {
  return (
    <section className="movies">
      <p className="movies__not-found">Ничего не найдено</p>
      <ul className="movies__list">
        {movies.map((movie, idx) => (
          <MoviesCard movie={movie} key={movie.id} />
        ))}
      </ul>
      <button
        className="movies__button"
        type="button"
        onClick={onMoreButtonClick}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
