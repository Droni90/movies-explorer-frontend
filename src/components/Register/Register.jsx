import React, { useState } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";
import useFormWithValidation from "../../hooks/useFormValidation";

function Register({
  onRegister,
  setError,
  setIsFormSent,
  isError,
  isFormSent,
}) {
  const history = useHistory();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: "",
    password: "",
    name: "",
  });

  React.useEffect(() => {
    setError(false);
  }, [history]);

  function handleSubmit(e) {
    setIsFormSent(true);
    e.preventDefault();
    const { email, password, name } = values;
    onRegister(password, email, name);
  }
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <Form
          submitText={{
            buttonText: "Зарегистрироваться",
            promt: "Уже зарегистрированы?",
            route: "/signin",
            linkText: "Войти",
            errorText: "При попытке регистрации произошла ошибка.",
          }}
          handleChange={handleChange}
          errors={errors}
          handlerSubmit={handleSubmit}
          values={values}
          isFormSent={isFormSent}
          isValid={isValid}
          isError={isError}
        >
          <label htmlFor="name" className="form__label">
            Имя
          </label>
          <input
            required
            id="name"
            value={values.name}
            onChange={handleChange}
            name="name"
            autoFocus
            autoComplete="off"
            className="form__input"
            type="text"
            minLength="2"
            maxLength="40"
          />
          {errors.name ? (
            <span className="form__input-error"> {errors.name}</span>
          ) : null}
        </Form>
      </div>
    </section>
  );
}

export default Register;
