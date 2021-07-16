const baseURL = `https://api.lanets.nomoredomains.club`;

class AuthApi {
  constructor(baseURL) {
    this._baseURL = baseURL;
  }
  _handleResponse(response) {
    if (response.ok) {
      return response.json()
    }
  
    return Promise.reject(`Ошибка: ${response.status} ${response.message}`);
  }

  _post(path, credentials){
    return fetch(`${this._baseURL}/${path}`, {
      method: "POST",
      credentials: 'include',
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

  checkToken() {
    console.log('Token');
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(this._handleResponse)
  }
}

const authApi = new AuthApi(baseURL);

export default authApi;

