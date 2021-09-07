import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies, onMoreButtonClick }) {
  const [isFilmsShot, setIsFilmsShot] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredFilms, setFilteredFilms] = useState([]);
  const handleShotFilmsFilter = () => {
    setIsFilmsShot(!isFilmsShot);
  };
  const handleSearchSubmit = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const newFilms = movies.filter((movie) => {
      return (
        movie.nameRU?.toLowerCase().includes(searchValue.toLowerCase()) ||
        movie.nameEN?.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredFilms(newFilms);
  }, [searchValue]);

  return (
    <div className="movies">
      <SearchForm
        setIsFilmsShot={handleShotFilmsFilter}
        isFilmsShot={isFilmsShot}
        handleSearchSubmit={handleSearchSubmit}
      />
      {!searchValue ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={filteredFilms}
          onMoreButtonClick={onMoreButtonClick}
          searchValue={searchValue}
          isFilmsShot={isFilmsShot}
        />
      )}
    </div>
  );
}

export default Movies;
