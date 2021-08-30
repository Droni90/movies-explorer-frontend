import React, { useEffect, useState } from "react";
import './App.css';
import {Route, Switch, useHistory} from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/authApi"
import { getMovies } from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState({isOpened: false})
  const history = useHistory()
  const jwt = localStorage.getItem('jwt');
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res.data) {
          setLoggedIn(true)
          history.push("/");
        }
      })
        .catch(e => console.log(e))
    }
  }, [history])

  const handleSuccessAuth = (success = false) => {
    setIsInfoTooltipOpen({
      isOpened: true,
      success,
    })
  }

  const onLogin = (password, email) => {
    auth.authorize(password, email).then((data) => {
      if(data.token){
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true)
        history.push('/');
      }
    })
      .catch(err => console.log(err))
  }

  const onRegister = (password, email, name) => {
    auth.register(password, email, name).then(() => {
        history.push('/signin');
        handleSuccessAuth(true)
    })
      .catch(() => handleSuccessAuth())
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false)
    history.push('/signin');
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Switch>
        <Route path='/' exact>
          <Header/>
          <Main/>
          <Footer/>
        </Route>
        <Route path='/movies' exact >
          <Header/>
          <Movies/>
          <Footer/>
        </Route>
        <Route path="/saved-movies" exact >
          <Header/>
          <Movies/>
          <Footer/>
        </Route>
        <Route exact path='/profile' >
          <Header/>
          <Profile/>
        </Route>
        <Route exact path='/signin'>
          <Login onLogin={ onLogin } />
        </Route>
        <Route path="/signup" exact >
          <Register onRegister={onRegister } />
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
