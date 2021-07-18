const apiParams = {
  baseUrl: 'https://api.lanets.nomoredomains.club',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

class Api {
  constructor({
    baseUrl, 
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;

  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json()
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _get(urlOptions) {
    return fetch(`${this._baseUrl}/${urlOptions}`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._handleResponse);
  }

  getUserInfo() {
    console.log('Get USer Info');
    return this._get("users/me ");
  }

  getCards() {
    return this._get("cards");
  }

  _update(urlOptions, newData) {
    return fetch(`${this._baseUrl}/${urlOptions}`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(newData),
    })
    .then(this._handleResponse);
  }

  updateUserInfo(newData) {
    return this._update("users/me", newData);
  }

  updateAvatar(newData) {
    return this._update("users/me/avatar", newData)
  }

  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({name, link})
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  toggleLike(id, method) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method,
      headers: this._headers,
    })
    .then(this._handleResponse);
  }
}

const api = new Api(apiParams);

export default api;

