import React, { useContext, useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import testCard from "../../images/test-card.png";
import moviesIconCard from "../../images/added-card-icon.svg";
import moviesSavedCardIcon from "../../images/delete-card-icon.svg";
import saveCardIcon from "../../images/save-card-icon.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function MoviesCard({ movie, handleSaveMovie }) {
  const {
    country,
    created_at,
    description,
    director,
    duration,
    id,
    image,
    nameEN,
    nameRU,
    trailerLink,
    updated_at,
    year,
  } = movie;
  const url = "https://api.nomoreparties.co";
  const { pathname } = useLocation();
  const [isMovieAdded, setIsMovieAdded] = useState(false);
  const currentUser = useContext(CurrentUserContext)


  const saveMovieButton = () => {
    handleSaveMovie({
        country: movie.country,
        year: movie.year,
        description: movie.description,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        director: movie.director,
        duration: movie.duration,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id + '',
      })
    setIsMovieAdded(!isMovieAdded);
  }
  const time = () => {
    const minutes = duration % 60;
    const houre = Math.floor(duration / 60);
    return `${houre > 0 ? houre + "ч" : ""}${minutes > 0 ? minutes + "м" : ""}`;
  };
  return (
    <li className="card">
      <div className="card__wrap">
        <img
          className="card__image"
          src={`${url}${image.url}`}
          alt={image.name}
        />
      </div>
      <div className="card__description">
        <p className="card__name">{nameRU}</p>
        <p className="card__duration">{time()}</p>
        {pathname === "/movies" ? (
          <button
            className={`card__icon ${isMovieAdded ? "card__icon_added" : ""}`}
            onClick={saveMovieButton}
          />
        ) : (
          <button className="card__icon-delete" />
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
