const PopupWithForm = ({
  title, 
  name,
  buttonText, 
  buttonLoadingText,
  isLoading,
  isOpen, 
  children,
  onSubmit,
  onClose
}) => {
  return (
    <div 
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={onClose}
    >
        <div className="popup__container">
          <form 
            className="form form_type_modal" 
            name={name} 
            noValidate 
            onSubmit={onSubmit}
          >
            <h2 className="form__title">{title}</h2>
            {children}
            <button 
              type="submit" 
              className="button form__submit"
            >{isLoading ? buttonLoadingText : buttonText}</button>
          </form>
          <button 
            className="popup__close-button" 
            aria-label="Закрыть окно" 
            type="button"
            ></button>
        </div>
      </div>
  );
}

export default PopupWithForm;

