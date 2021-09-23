import React from "react";
import "./Form.css";
import { Link } from "react-router-dom";

function Form({
  submitText,
  handlerSubmit,
  handleChange,
  isValid,
  values,
  children,
  isFormSent,
  isError,
  errors,
}) {
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
        onChange={handleChange}
        name="email"
        value={values.email}
        autoFocus
        autoComplete="off"
        minLength="2"
        maxLength="40"
      />
      {errors.email ? (
        <span className="form__input-error">{errors.email}</span>
      ) : null}
      <label htmlFor="password" className="form__label">
        Пароль
      </label>
      <input
        required
        id="password"
        className="form__input form__input_password"
        type="password"
        onChange={handleChange}
        name="password"
        value={values.password}
        autoComplete="off"
      />
      {errors.password ? (
        <span className="form__input-error"> {errors.password}</span>
      ) : null}
      {isError ? (
        <span className="form__submit-error" id="login-error">
          {isError.message ? isError.message : submitText.errorText}
        </span>
      ) : null}
      <button
        className={`form__button ${
          isValid && !isFormSent ? "" : "form__button_disabled"
        }`}
        type={isValid && !isFormSent ? "submit" : "button"}
      >
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
