import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return (
    <section className="movies">
      <SearchForm
        handleSubmit={props.handleSubmit}
        handleChangeRadio={props.handleChange}
      />
      {props.movies === "NotFound" ? (
        <p className="movies__found-error">Ничего не найдено</p>
      ) : null}
      <MoviesCardList {...props} isSaved={true} />
    </section>
  );
}

export default SavedMovies;
