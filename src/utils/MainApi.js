export const BASE_URL = 'https://api.movies.students.nomoredomains.club';

class Api {
  constructor(options) {
    this._options = options
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }
  _updateToken() {
    this._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    this._updateToken();
    return fetch(`${this._baseUrl}/users/me`, this._options)
      .then(this._checkResponse)
  }
  //отправка инфо
  patchProfileInfo(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method: 'PATCH',
    }
    return fetch(`${this._baseUrl}/users/me`, newOptions)
      .then(this._checkResponse)
  }
  // Отправляет информацию о пользователе на сервер
  patchAddCard(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method:'POST',
    }
    return fetch(`${this._baseUrl}/cards`, newOptions)
      .then(this._checkResponse)
  }
  //Удаляем карту
  removeCard(cardId) {
    const newOptions = {
      ...this._options,
      method:'DELETE',
    }
    return fetch(`${this._baseUrl}/cards/${cardId}`, newOptions)
      .then(this._checkResponse)
  }
  //Ставим лайк
  changeLikeCardStatus(cardId, isLiked) {
    const putOptions = {
      ...this._options,
      method:'PUT',
    }
    const delOptions = {
      ...this._options,
      method:'DELETE',
    }
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, isLiked ? delOptions : putOptions)
      .then(this._checkResponse)
  }

  //Обновляем аватар
  refreshAvatar(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method: 'PATCH',
    }
    return fetch(`${this._baseUrl}/users/me/avatar`, newOptions)
      .then(this._checkResponse)
  }
}

export default new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});
