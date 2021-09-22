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
  // const [batchLength, setBatchLength] = useState(0);
  // const [batchLengthMore, setBatchLengthMore] = useState(0);
  // const [size, setSize] = useState(document.documentElement.clientWidth);
  // let timer;
  // useEffect(() => {
  //   window.addEventListener("resize", measureResizing);
  //   return () => {
  //     window.removeEventListener("resize", measureResizing);
  //   };
  // });
  // useEffect(() => {
  //   if (size > WidthScreenRebuild) {
  //     if (batchLength > FilmsBatchLengthWide) {
  //       setBatchLength(batchLength);
  //     } else {
  //       setBatchLength(FilmsBatchLengthWide);
  //     }
  //     setBatchLengthMore(FilmsBatchLengthWideMore);
  //   } else {
  //     if (batchLength > FilmsBatchLengthNarrow) {
  //       setBatchLength(batchLength);
  //     } else {
  //       setBatchLength(FilmsBatchLengthNarrow);
  //     }
  //     setBatchLengthMore(FilmsBatchLengthNarrowMore);
  //   }
  // }, [movies, size]);

  // function measureResizing() {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  //   timer = setTimeout(
  //     () => setSize(document.documentElement.clientWidth),
  //     2000
  //   );
  // // }
  // function handleMore() {
  //   setBatchLength(batchLength + batchLengthMore);


  const [filtredMovies, setFiltredMovies] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);


  useEffect(() => {
    const newMovies = movies.slice(0, moviesCount().count);
    setFiltredMovies(newMovies);
  }, [movies, windowSize]);

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setWindowSize(window.innerWidth);
    }, 500);
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  function moviesCount() {
    if (windowSize >= 1280) return { count: 12, more: 3 };
    if (windowSize >= 768) return { count: 8, more: 2 };
    if (windowSize >= 320) return { count: 5, more: 2 };
  }
  const onMoreButtonClick = () => {
    setFiltredMovies(
      movies.slice(0, (filtredMovies.length += moviesCount().more))
    );
  };

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
              console.log(filmsBatch.length, batchLength);
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
      {movies.length && (
        <button
          onClick={onMoreButtonClick}
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
