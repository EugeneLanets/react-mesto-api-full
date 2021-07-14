import { useState } from "react";

const SignForm = ({name, title, buttonText, onSubmit, children}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputCallbacks = {
    email: setEmail,
    password: setPassword
  }

  const handleInputChange = (evt) => {
    inputCallbacks[evt.target.name](evt.target.value);
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({email, password});
  }

  return (
    <div className="sign-form">
      <form 
        className="form sign-form__form" 
        name={name} 
        noValidate 
        onSubmit={handleSubmit}
      >
        <h2 className="form__title sign-form__title">{title}</h2>
        <div className="form__fields">
          <input 
            type="email" 
            name="email" 
            className="form__field" 
            placeholder="Email" 
            required 
            onChange={handleInputChange}
          />
          <p className="form__error card-add-name-error"></p>
          <input 
            type="password" 
            name="password" 
            className="form__field" 
            placeholder="Пароль" 
            required
            onChange={handleInputChange} 
          />
          <p className="form__error card-add-link-error"></p>
        </div>
        <button 
          type="submit" 
          className="button form__submit sign-form__button"
        >{buttonText}</button>
        {children}
      </form>
    </div>
  );
}

export default SignForm;