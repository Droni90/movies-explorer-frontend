import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  console.log(movies);
  return (
    <section className="movies">
      <p className="movies__not-found">Ничего не найдено</p>
      <ul className="movies__list">
        {movies.map((movie) => (
          <MoviesCard movie={movie} key={movie.id} />
        ))}
      </ul>
      <button className="movies__button" type="button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
