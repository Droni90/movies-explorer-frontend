import { useEffect, useState } from "react";
import "./App.css";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getMovies } from "../../utils/MoviesApi";
import searchMovies from "../../utils/searchMovies";
import SavedMovies from "../SavedMovies/SavedMovies";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const jwt = localStorage.getItem("jwt");
  const [isRegisterError, setIsRegisterError] = useState("");
  const [isLoginError, setIsLoginError] = useState("");
  const [isProfileUpdateError, setIsProfileUpdateError] = useState("");
  const [isSearchError, setIsSearchError] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isOnlyCheckedSearch, setIsOnlyCheckedSearch] = useState(false);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [savedMoviesId, setSavedMoviesId] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [savedKeyWord, setSavedKeyWord] = useState("");
  const [isFormSent, setIsFormSent] = useState(false);
  const [isShortSavedFilmChecked, setIsShortSavedFilmChecked] = useState(false);
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(false);
  const [movies, setMovies] = useState(
    localStorage.getItem("foundMovies")
      ? JSON.parse(localStorage.getItem("foundMovies"))
      : []
  );

  useEffect(() => {
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
          }
        })
        .catch((e) => {
          history.push("/signin");
          console.log(e);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData.data);
          setSavedMovies(moviesData.data);
          setSavedMoviesId(moviesData.map((movie) => movie.movieId));
        })
        .catch((e) => console.log(e));
    }
  }, [loggedIn]);

  useEffect(() => {
    setIsNotFound(false);
  }, [loggedIn]);

  useEffect(() => {
    setIsUpdateSuccessful(false);
  }, [pathname]);

  useEffect(() => {
    if (savedKeyWord) {
      handleSearchSavedMovies(savedKeyWord);
    }
  }, [savedMovies]);
  useEffect(() => {
    if (savedMovies.length || foundSavedMovies.length) {
      handleSearchSavedMovies(savedKeyWord);
    }
  }, [isShortSavedFilmChecked]);
  useEffect(() => {
    if (localStorage.getItem("foundMovies")) {
      handleSearchMoviesChecked();
    }
  }, [isShortFilmChecked]);

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("foundMovies");
    localStorage.removeItem("movies");
    setLoggedIn(false);
    setMovies([]);
    setCurrentUser({ email: "", name: "" });
    history.push("/signin");
  };

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
      .catch((err) => {
        console.log(err);
        setIsLoginError(err);
      })
      .finally(() => {
        setIsFormSent(false);
      });
  };

  const onRegister = (password, email, name) => {
    auth
      .register(password, email, name)
      .then(() => {
        onLogin(password, email);
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterError(err);
      })
      .finally(() => {
        setIsFormSent(false);
      });
  };

  const handleUpdateUser = (userInfo) => {
    mainApi
      .patchProfileInfo(userInfo)
      .then((data) => {
        setCurrentUser(data.data);
        setIsUpdateSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setIsProfileUpdateError(err);
      })
      .finally(() => {
        setIsFormSent(false);
      });
  };

  const handleSearchMoviesChecked = () => {
    const isShort = isShortFilmChecked;
    const cards = JSON.parse(localStorage.getItem("foundMovies"));
    const shortCards = cards.filter((movie) => {
      if (isShort) {
        if (movie.duration < 40) {
          return true;
        }
      } else {
        if (movie.duration >= 40) {
          return true;
        }
      }
    });
    setMovies(shortCards);
    setIsNotFound(!shortCards.length);
  };

  const handleSearchMovies = async (searchValue) => {
    setIsSearchError(false);
    setIsSearchLoading(true);
    setIsNotFound(false);
    try {
      let movies = JSON.parse(localStorage.getItem("movies"));
      if (!movies) {
        const films = await getMovies();
        localStorage.setItem("movies", JSON.stringify(films));
        movies = JSON.parse(localStorage.getItem("movies"));
      }
      const cards = searchMovies(movies, searchValue);
      localStorage.setItem("foundMovies", JSON.stringify(cards));
      handleSearchMoviesChecked();
    } catch (err) {
      console.error(err);
      setIsSearchError(true);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleSearchSavedMovies = (searchValue) => {
    setIsOnlyCheckedSearch(false);
    if (!searchValue) {
      setIsOnlyCheckedSearch(true);
    }
    setSavedKeyWord(searchValue);
    const movies = searchMovies(
      savedMovies,
      searchValue,
      isShortSavedFilmChecked
    );
    setFoundSavedMovies(movies);
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((m) => {
        setSavedMoviesId([...savedMoviesId, movie.id]);
        setSavedMovies([...savedMovies, m]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const deleteMovie = (movie) => {
    let movieId = savedMovies.filter(
      (f) => f.movieId == movie.id || f.data?.movieId == movie.id
    )[0];
    console.log(movie, movieId, savedMovies);
    if (movieId) {
      movieId = movieId._id;
    }
    mainApi
      .removeMovie(movie.owner ? movie._id : movieId)
      .then((c) => {
        setSavedMovies(savedMovies.filter((film) => film._id != c.data._id));
        setSavedMoviesId(savedMoviesId.filter((id) => id != c.data.movieId));
      })
      .catch((err) => {
        console.error(err);
      });
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
            exact
            path="/movies"
            loggedIn={jwt}
            component={Movies}
            movies={movies}
            savedMoviesId={savedMoviesId}
            handleSubmit={handleSearchMovies}
            isLoading={isSearchLoading}
            isError={isSearchError}
            isNotFound={isNotFound}
            handleSaveMovie={handleSaveMovie}
            deleteMovie={deleteMovie}
            handleChange={setIsShortFilmChecked}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={jwt}
            component={SavedMovies}
            movies={
              savedKeyWord || isOnlyCheckedSearch
                ? foundSavedMovies.length
                  ? foundSavedMovies
                  : "NotFound"
                : savedMovies
            }
            deleteMovie={deleteMovie}
            handleSubmit={handleSearchSavedMovies}
            handleChange={setIsShortSavedFilmChecked}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={jwt}
            component={Profile}
            handleSignOut={handleSignOut}
            handleUpdateUser={handleUpdateUser}
            isError={isProfileUpdateError}
            setError={setIsProfileUpdateError}
            isSuccess={isUpdateSuccessful}
            isFormSent={isFormSent}
            setIsFormSent={setIsFormSent}
            setSuccess={setIsUpdateSuccessful}
          />
          <Route exact path="/signin">
            {!loggedIn ? (
              <Login
                onLogin={onLogin}
                isError={isLoginError}
                setError={setIsLoginError}
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
              />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
          <Route path="/signup" exact>
            {!loggedIn ? (
              <Register
                onRegister={onRegister}
                isError={isRegisterError}
                setError={setIsRegisterError}
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
              />
            ) : (
              <Redirect to="/movies" />
            )}
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
