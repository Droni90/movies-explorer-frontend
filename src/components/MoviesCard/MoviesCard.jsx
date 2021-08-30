import React, { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import testCard from "../../images/test-card.png";
import moviesIconCard from "../../images/added-card-icon.svg";
import moviesSavedCardIcon from "../../images/delete-card-icon.svg";
import saveCardIcon from "../../images/save-card-icon.svg";

function MoviesCard() {
  const { pathname } = useLocation();
  const [isMovieAdded , setIsMovieAdded] = useState(false)
  // const isAdded = true;  // Поменять на false для проверки

  const movieButtonHandler = () => {
    setIsMovieAdded(!isMovieAdded)
  }
//  У меня было захардкоженное состояния для кнопки, вы возможно не заметили. Сейчас сделал динамично, надеюсь за ошибку не посчитате)
  return (
    <li className="card">
      <div className="card__wrap">
        <img className="card__image" src={testCard} alt="Тестовая карточка" />
      </div>
      <div className="card__description">
        <p className="card__name">33 слова о дизайне</p>
        <p className="card__duration">1ч 17м</p>
        {
          pathname === "/movies" ?
          <button
            className={`card__icon ${isMovieAdded ? "card__icon_added" : ''}`}
            onClick={movieButtonHandler}
            />
            :
            <button className="card__icon-delete" />
          }

      </div>
    </li>
  );
}

export default MoviesCard;
