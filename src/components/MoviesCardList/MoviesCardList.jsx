import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import {
  WidthScreenRebuild,
  FilmsBatchLengthWide,
  FilmsBatchLengthNarrow,
  FilmsBatchLengthWideMore,
  FilmsBatchLengthNarrowMore,
} from "../../utils/constatns";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = ({
  movies,
  isSaved,
  handleSaveMovie,
  savedMoviesId,
  deleteMovie,
}) => {
  const [batchLength, setBatchLength] = useState(0);
  const [batchLengthMore, setBatchLengthMore] = useState(0);
  const [size, setSize] = useState(document.documentElement.clientWidth);
  let timer;
  useEffect(() => {
    window.addEventListener("resize", measureResizing);
    return () => {
      window.removeEventListener("resize", measureResizing);
    };
  });
  useEffect(() => {
    if (size > WidthScreenRebuild) {
      if (batchLength > FilmsBatchLengthWide) {
        setBatchLength(batchLength);
      } else {
        setBatchLength(FilmsBatchLengthWide);
      }
      setBatchLengthMore(FilmsBatchLengthWideMore);
    } else {
      if (batchLength > FilmsBatchLengthNarrow) {
        setBatchLength(batchLength);
      } else {
        setBatchLength(FilmsBatchLengthNarrow);
      }
      setBatchLengthMore(FilmsBatchLengthNarrowMore);
    }
  }, [movies, size]);

  function measureResizing() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      () => setSize(document.documentElement.clientWidth),
      2000
    );
  }
  function handleMore() {
    setBatchLength(batchLength + batchLengthMore);
  }
  return (
    <>
      <ul className="movies__list">
        {movies === "NotFound"
          ? ""
          : isSaved
          ? movies.map((movie) => (
              <MoviesCard
                movie={movie}
                isSaved={isSaved}
                key={movie._id}
                handleSaveMovie={handleSaveMovie}
                savedCardsId={savedMoviesId}
                deleteMovie={deleteMovie}
              />
            ))
          : movies.reduce((filmsBatch, movie) => {
              if (filmsBatch.length < batchLength) {
                filmsBatch.push(
                  <MoviesCard
                    movie={movie}
                    isSaved={isSaved}
                    key={isSaved ? movie._id : movie.id}
                    handleSaveMovie={handleSaveMovie}
                    savedMoviesId={savedMoviesId}
                    deleteMovie={deleteMovie}
                  />
                );
              }
              return filmsBatch;
            }, [])}
      </ul>
      )
      {!isSaved && (
        <button
          onClick={handleMore}
          type="button"
          aria-label="Ещё"
          className={`movies__button ${
            movies.length <= batchLength ? "movies__button_hidden" : ""
          }`}
        >
          Ещё
        </button>
      )}
    </>
  );
};

export default MoviesCardList;
