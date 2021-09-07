import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  filteredMovies,
  handleMoreButton,
  isFilmsShot,
  loadError,
  isMoreHidden,
}) {
  return (
    <section className="movies">
      {filteredMovies.length === 0 ? (
        <p className="movies__not-found">
          {loadError ? loadError : "Ничего не найдено"}
        </p>
      ) : (
        <ul className="movies__list">
          {!isFilmsShot
            ? filteredMovies.map((movie) => (
                <MoviesCard movie={movie} key={movie.id} />
              ))
            : filteredMovies
                .filter((movie) => movie.duration < 80)
                .map((movie) => <MoviesCard movie={movie} key={movie.id} />)}
        </ul>
      )}
      {isMoreHidden ? null : (
        <button
          className="movies__button"
          type="button"
          onClick={handleMoreButton}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
