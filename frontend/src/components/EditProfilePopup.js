import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({
    isOpen,
    isLoading,
    onClose,
    onUpdateUser
  }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  const inputCallbacks = {
    'username': setName,
    'status': setDescription
  };

  const handleInputChange = evt => {
    inputCallbacks[evt.target.name](evt.target.value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateUser({
      name, about: description
    });
  }
  
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm 
      title="Редактировать профиль" 
      name="profile-edit"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <input 
        type="text" 
        name="username" 
        className="form__field" 
        placeholder="Ваше имя" 
        id="profile-username" 
        required 
        minLength="2" 
        maxLength="40"
        value={name} 
        onChange={handleInputChange}
      />
      <p className="form__error profile-username-error"></p>
      <input 
        type="text" 
        name="status" 
        className="form__field" 
        placeholder="Пара слов о себе"
        id="profile-status" 
        required  
        minLength="2" 
        maxLength="200"
        value={description}
        onChange={handleInputChange}
      />
      <p className="form__error profile-status-error"></p>
    </PopupWithForm>
  )
}

export default EditProfilePopup;