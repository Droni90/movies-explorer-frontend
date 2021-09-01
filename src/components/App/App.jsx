import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/authApi";
import mainApi from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const jwt = localStorage.getItem("jwt");
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
            history.push("/movies");
          }
        })
        .catch((e) => console.log(e));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), getMovies()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData.data);
          setMovies(moviesData);
        })
        .catch((e) => console.log(e));
    }
  }, [loggedIn]);

  const onLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => console.log(err));
  };

  const onRegister = (password, email, name) => {
    auth
      .register(password, email, name)
      .then(() => {
        onLogin(password, email);
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  };

  //обработчик информации о пользователе
  const handleUpdateUser = (userInfo) => {
    mainApi
      .patchProfileInfo(userInfo)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            movies={movies}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={Movies}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            handleSignOut={handleSignOut}
            handleUpdateUser={handleUpdateUser}
          />
          <Route exact path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/signup" exact>
            <Register onRegister={onRegister} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
