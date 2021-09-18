import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  searchValue,
  handleSearchSubmit,
  handleShotMoviesFilter,
  isFilmShot,
  filteredMovies,
  onMoreButtonClick,
  handleSaveMovie
}) {
  return (
    <div className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShotMoviesFilter={handleShotMoviesFilter}
        isFilmShot={isFilmShot}
      />
        {
        !searchValue ?
        <Preloader /> :
        <MoviesCardList
        filteredMovies={filteredMovies}
        onMoreButtonClick={onMoreButtonClick}
        handleSaveMovie={handleSaveMovie}
      />
      }
    </div>
  );
}

export default Movies;
