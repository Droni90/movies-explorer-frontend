import React, { useContext, useState } from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ handleSignOut, handleUpdateUser }) {
  const { email, name } = useContext(CurrentUserContext);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const handleNameInput = (evt) => {
    setNameValue(evt.target.value);
  };
  const handleEmailInput = (evt) => {
    setEmailValue(evt.target.value);
  };
  const onEditSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateUser({ email: emailValue, name: nameValue });
  };
  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, {name}!</h1>
        <form className="profile__form" onSubmit={onEditSubmit}>
          <label className="profile__label" htmlFor="name">
            Имя
            <input
              placeholder={name}
              className="profile__input"
              id="name"
              onChange={handleNameInput}
              value={nameValue}
              type="text"
            />
          </label>
          <label className="profile__label" htmlFor="email">
            Почта
            <input
              placeholder={email}
              type="email"
              className="profile__input"
              id="email"
              onChange={handleEmailInput}
              value={emailValue}
            />
          </label>
          <button className="profile__btn-edit" type="submit">
            Редактировать
          </button>
          <button
            className="profile__btn-logout"
            type="button"
            onClick={handleSignOut}
          >
            Выйти из аккаунта
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
