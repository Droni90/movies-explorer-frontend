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
}) {
  return (
    <div className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShotMoviesFilter={handleShotMoviesFilter}
        isFilmShot={isFilmShot}
      />
      {!searchValue ? <Preloader /> : <MoviesCardList />}
    </div>
  );
}

export default Movies;
