function searchMovies(movies, keyWord, isShort) {
  if (movies.length) {
    if (movies[0].owner) {
      return movies.filter((movie) => {
        if (movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())) {
          if (isShort) {
            if (movie.duration < 40) {
              return true;
            }
          } else {
            if (movie.duration >= 40) {
              return true;
            }
          }
        }
      });
    } else {
      return movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(keyWord.toLowerCase());
      });
    }
  }
}

export default searchMovies;
