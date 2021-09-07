import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { getMovies } from "../../utils/MoviesApi";

function Movies({ onMoreButtonClick, moviesCount, windowSize }) {
  const [isFilmsShot, setIsFilmsShot] = useState(false);
  const [moviesRender, setMoviesRender] = useState([]);
  const [loadError, setLoadError] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [isMoreHidden, setIsMoreHidden] = useState(false);
  const handleShotFilmsFilter = () => {
    setIsFilmsShot(!isFilmsShot);
  };

  const handleSearchSubmit = (value) => {
    setSearchValue(value);
    getMovies()
      .then((data) => {
        setAllMovies(data);
      })
      .catch(() => {
        setLoadError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  };
  console.log(isMoreHidden);
  useEffect(() => {
    const newFilms = allMovies.filter((movie) => {
      return (
        movie.nameRU?.toLowerCase().includes(searchValue.toLowerCase()) ||
        movie.nameEN?.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredFilms(newFilms);
    setMoviesRender(newFilms.slice(0, moviesCount().count));
    if (moviesRender.length >= filteredFilms.length) {
      setIsMoreHidden(true);
    } else {
      setIsMoreHidden(false);
    }
  }, [allMovies, searchValue, windowSize]);

  const handleMoreButton = () => {
    setMoviesRender(onMoreButtonClick(filteredFilms, moviesRender));
  };

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
          filteredMovies={moviesRender}
          handleMoreButton={handleMoreButton}
          searchValue={searchValue}
          isFilmsShot={isFilmsShot}
          loadError={loadError}
          isMoreHidden={isMoreHidden}
        />
      )}
    </div>
  );
}

export default Movies;
