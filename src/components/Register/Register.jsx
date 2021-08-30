import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";

function Register({onRegister}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handlePassword = (evt) => {
    setPassword(evt.target.value)
  }

  const handleName = (evt) => {
    setName(evt.target.value)
  }
  const  handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(password, email, name)
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
          }}
          handlerSubmit={handleSubmit}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          email={email}
          password={password}
        >
          <label htmlFor="name" className="form__label">
            Имя
          </label>
          <input
            required
            id="name"
            className="form__input"
            type="text"
            value={name}
            onChange={handleName}
          />
          <span className="form__input-error">Текст ошибки</span>
        </Form>
      </div>
    </section>
  );
}

export default Register;
