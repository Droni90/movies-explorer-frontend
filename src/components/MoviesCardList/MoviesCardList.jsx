import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  onMoreButtonClick,
  searchValue,
  isFilmsShot,
}) {
  return (
    <section className="movies">
      {movies.length === 0 ? (
        <p className="movies__not-found">Ничего не найдено</p>
      ) : (
        <ul className="movies__list">
          {!isFilmsShot
            ? movies.map((movie) => <MoviesCard movie={movie} key={movie.id} />)
            : movies
                .filter((movie) => movie.duration < 80)
                .map((movie) => <MoviesCard movie={movie} key={movie.id} />)}
        </ul>
      )}

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
