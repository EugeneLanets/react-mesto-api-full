import regSuccess from "../images/reg__successs.svg";
import regError from "../images/reg__error.svg";

const RegisterStatusPopup = ({isOpen, registrationSuccessfull, onClose}) => {
  return (
    <div 
      className={`popup popup_type_register-status ${isOpen ? 'popup_opened' : '' }`}
      onClick={onClose}
    >
      <div className="popup__container">
        <div className="register-status">
          <img 
            src={registrationSuccessfull ? regSuccess : regError} 
            className={`register-status__icon`} 
            alt=""
          /> 
          <p className="register-status__text">
            {registrationSuccessfull 
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
            }
          </p>
        </div>
        <button 
          className="popup__close-button popup__close_button_centered" 
          aria-label="Закрыть окно" 
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default RegisterStatusPopup;