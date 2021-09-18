import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  filteredMovies,
  onMoreButtonClick,
  isFilmsShot,
  loadError,
  isMoreHidden,
  handleSaveMovie
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
                <MoviesCard movie={movie} key={movie.id} handleSaveMovie={handleSaveMovie}/>
              ))
            : filteredMovies
                .filter((movie) => movie.duration < 80)
                .map((movie) => <MoviesCard movie={movie} key={movie.id} handleSaveMovie={handleSaveMovie} />)}
        </ul>
      )}
      {isMoreHidden ? null : (
        <button
          className="movies__button"
          type="button"
          onClick={onMoreButtonClick}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
