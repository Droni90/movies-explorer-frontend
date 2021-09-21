import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";
import useFormWithValidation from "../../hooks/useFormValidation";

function Login({ onLogin, setError, setIsFormSent, isFormSent, isError }) {
  const history = useHistory();
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: "",
    password: "",
  });

  useEffect(() => {
    setError(false);
  }, [history]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsFormSent(true);
    const { email, password } = values;
    onLogin(password, email);
  };
  return (
    <section className="login">
      <div className="login__container">
        <Link className="login__link" to="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <Form
          submitText={{
            buttonText: "Войти",
            promt: "Ещё не зарегистрированы?",
            route: "/signup",
            linkText: "Регистрация",
            errorText: "При попытке авторизации произошла ошибка.",
          }}
          handleChange={handleChange}
          errors={errors}
          handlerSubmit={handleSubmit}
          values={values}
          isFormSent={isFormSent}
          isValid={isValid}
          isError={isError}
        />
      </div>
    </section>
  );
}

export default Login;
