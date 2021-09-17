export const BASE_URL = "https://api.movies.students.nomoredomains.club";

class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _updateToken() {
    this._headers.authorization = `Bearer ${localStorage.getItem("jwt")}`;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    this._updateToken();
    return fetch(`${this._baseUrl}/users/me`, this._options).then(
      this._checkResponse
    );
  }

  getMovies() {
    this._updateToken();
    return fetch(`${this._url}/movies`, this._options).then(this._response);
  }
  //отправка инфо
  patchProfileInfo(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method: "PATCH",
    };
    return fetch(`${this._baseUrl}/users/me`, newOptions).then(
      this._checkResponse
    );
  }

  saveMovie(movie) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(movie),
      method: "POST",
    };
    return fetch(`${this._baseUrl}/movies`, newOptions).then(
      this._checkResponse
    );
  }

  removeMovie(movieId) {
    const newOptions = {
      ...this._options,
      method: "DELETE",
    };
    return fetch(`${this._baseUrl}/movies/${movieId}`, newOptions).then(
      this._checkResponse
    );
  }
}

export default new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});
