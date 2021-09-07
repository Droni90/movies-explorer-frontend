import React from "react";
import "./Form.css";
import { Link } from "react-router-dom";

function Form({ submitText, handlerSubmit, handleEmail, handlePassword, email, password, children }) {
  console.log(password)
  return (
    <form className="form" onSubmit={handlerSubmit}>
      {children}
      <label htmlFor="email" className="form__label">
        E-mail
      </label>
      <input
        required
        id="email"
        className="form__input"
        type="email"
        onChange={handleEmail}
        value={email}
      />
      <span className="form__input-error">Текст ошибки</span>
      <label htmlFor="password" className="form__label">
        Пароль
      </label>
      <input
        required
        id="password"
        className="form__input form__input_password"
        type="password"
        onChange={handlePassword}
        value={password}
      />
      <span className="form__input-error"> Текст ошибки</span>
      <button className="form__button" type="submit">
        {submitText.buttonText}
      </button>
      <p className="form__promt">
        {`${submitText.promt} `}
        <Link className="form__link" to={submitText.route}>
          {submitText.linkText}
        </Link>
      </p>
    </form>
  );
}

export default Form;
