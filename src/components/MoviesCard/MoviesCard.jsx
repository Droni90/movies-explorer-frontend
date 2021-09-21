import "./MoviesCard.css";
import { HourDuration } from "../../utils/constatns";

const MoviesCard = ({
  movie,
  savedMoviesId,
  isSaved,
  deleteMovie,
  handleSaveMovie,
}) => {
  const handleIsLike = (card, savedCardsId) => {
    if (card.id) {
      return savedCardsId.some((el) => el === card.id);
    }
  };

  let isLiked = handleIsLike(movie, savedMoviesId);
  const cardLikeButtonClassName = `card__icon ${
    isLiked ? "card__icon_added" : ""
  }`;
  const hours = Math.trunc(movie.duration / HourDuration);
  const minutes = movie.duration % HourDuration;
  const time = `${hours > 0 ? hours + "ч " : ""}${
    minutes > 0 ? minutes + "м" : ""
  }`;
  const trailer = `${isSaved ? movie.trailer : movie.trailerLink}`;

  function handleSave() {
    if (isSaved) {
      deleteMovie(movie);
    } else {
      if (isLiked) {
        deleteMovie(movie);
      } else {
        handleSaveMovie(movie);
      }
    }
  }
  return (
    <li className="card">
      <div className="card__wrap">
        <a
          href={
            trailer.startsWith("https") ? trailer : "https://www.youtube.com"
          }
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="card__image"
            src={
              isSaved
                ? movie.image
                : `https://api.nomoreparties.co${movie.image.url}`
            }
            alt={movie.name}
          />
        </a>
      </div>
      <div className="card__description">
        <p className="card__name">{movie.nameRU}</p>
        <p className="card__duration">{time}</p>
        <button
          className={isSaved ? "card__icon-delete" : cardLikeButtonClassName}
          onClick={handleSave}
        />
      </div>
    </li>
  );
};

export default MoviesCard;
