const baseURL = `https://api.lanets.nomoredomains.club`;

class AuthApi {
  constructor(baseURL) {
    this._baseURL = baseURL;
  }
  _handleResponse(response) {
    if (response.ok) {
      return response.json()
    }
  
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _post(path, credentials){
    return fetch(`${this._baseURL}/${path}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(this._handleResponse);
  }

  register(credentials) {
    return this._post('signup', credentials);
  }

  login(credentials) {
    return this._post('signin', credentials);
  }

  checkToken(token) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._handleResponse)
  }
}

const authApi = new AuthApi(baseURL);

export default authApi;

