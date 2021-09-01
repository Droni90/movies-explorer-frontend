import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies, onMoreButtonClick }) {
  const [isFilmsShot, setIsFilmsShot] = useState();
  const handleShotFilmsFilter = (evt) => {
    setIsFilmsShot(evt.target.value);
  };
  console.log(isFilmsShot);
  return (
    <>
      <SearchForm
        setIsFilmsShot={handleShotFilmsFilter}
        isFilmsShot={isFilmsShot}
      />
      <Preloader />
      <MoviesCardList movies={movies} onMoreButtonClick={onMoreButtonClick} />
    </>
  );
}

export default Movies;
