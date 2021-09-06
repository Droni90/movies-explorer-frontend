import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies, onMoreButtonClick }) {
  const [isFilmsShot, setIsFilmsShot] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredFilms, setFilteredFilms] = useState([]);
  console.log(movies);
  const handleShotFilmsFilter = () => {
    setIsFilmsShot(!isFilmsShot);
  };
  const handleSearchSubmit = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const newFilms = movies.filter((movie) => {
      const RU = movie.nameRU
        .split(" ")
        .filter((word) =>
          word.toLowerCase().startsWith(searchValue.toLowerCase())
        );
      const EN = movie.nameEN
        .split(" ")
        .filter((word) =>
          word.toLowerCase().startsWith(searchValue.toLowerCase())
        );
      return RU.length || EN.length;
    });
    console.log(newFilms);
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
        />
      )}
    </div>
  );
}

export default Movies;
