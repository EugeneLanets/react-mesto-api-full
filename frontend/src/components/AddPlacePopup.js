import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({
  isOpen,
  isLoading,
  onAddCard,
  onClose
}) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const inputCallbacks = {
    'card-name': setName,
    'card-link': setLink
  };

  const handleInputChange = evt => {
    inputCallbacks[evt.target.name](evt.target.value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    onAddCard({
      name, link
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="card-add"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input 
        type="text" 
        name="card-name" 
        className="form__field" 
        placeholder="Название" 
        id="card-add-name" 
        required 
        value={name}
        onChange={handleInputChange}
      />
      <p className="form__error card-add-name-error"></p>
      <input 
        type="url" 
        name="card-link" 
        className="form__field" 
        placeholder="Сcылка на картинку" 
        id="card-add-link" 
        required 
        value={link}
        onChange={handleInputChange}
      />
      <p className="form__error card-add-link-error"></p>
    </PopupWithForm>
  )
}

export default AddPlacePopup;