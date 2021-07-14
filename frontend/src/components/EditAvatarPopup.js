import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({
  isOpen,
  isLoading,
  onClose,
  onUpdateAvatar
}) => {

  const avatarURLRef = useRef();

  const handleFormSubmit = evt => {
    evt.preventDefault();
    
    onUpdateAvatar({
      avatar: avatarURLRef.current.value
    });
  }

  useEffect(() => {
    avatarURLRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-update"
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <input type="hidden" name="card-name" className="form__field" />
      <input 
        type="url" 
        name="link" 
        className="form__field" 
        placeholder="Сcылка на картинку" 
        id="avatar-change-link" 
        required
        ref={avatarURLRef}
      />
      <p className="form__error card-add-link-error"></p>

    </PopupWithForm>
  );
}

export default EditAvatarPopup;