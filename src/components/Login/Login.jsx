import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";

function Login({onLogin}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePassword = (evt) => {
    setPassword(evt.target.value)
  }

  const  handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(password, email )
  }
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
          }}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          handlerSubmit={handleSubmit}
          email={email}
          password={password}
        />
      </div>
    </section>
  );
}

export default Login;
