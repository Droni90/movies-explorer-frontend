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
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

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
      Promise.all([mainApi.getUserInfo()])
        .then(([userData]) => {
          setCurrentUser(userData.data);
        })
        .catch((e) => console.log(e));
    }
  }, [loggedIn]);
  //Рендеринг фильмов
  useEffect(() => {
    const newMovies = movies.slice(0, moviesCount().count);
    setFilteredMovies(newMovies);
  }, [movies, windowSize]);

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setWindowSize(window.innerWidth);
    }, 500);
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  function moviesCount() {
    if (windowSize >= 1280) return { count: 12, more: 3 };
    if (windowSize >= 768) return { count: 8, more: 2 };
    if (windowSize >= 320) return { count: 5, more: 2 };
  }
  const onMoreButtonClick = (moves, filteredMoves) => {
    return moves.slice(0, (filteredMoves.length += moviesCount().more));
  };
  // Конец Рендеринг фильмов

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
            onMoreButtonClick={onMoreButtonClick}
            moviesCount={moviesCount}
            windowSize={windowSize}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={Movies}
            movies={filteredMovies}
            onMoreButtonClick={onMoreButtonClick}
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
