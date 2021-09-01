import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies }) {
  return (
    <>
      <SearchForm />
      <Preloader />
      <MoviesCardList movies={movies} />
    </>
  );
}

export default Movies;
