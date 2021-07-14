const ImagePopup = ({card, onClose}) => {
  const {name, link} = card ? card : {name: "", link: ""}
  return (
    <div 
      className={`popup popup_type_card-picture ${card ? 'popup_opened' : '' }`}
      onClick={onClose}
    >
        <div className="popup__container">
          <figure className="big-picture">
            <img src={link} alt={name} className="big-picture__image" />
            <figcaption className="big-picture__caption">{name}</figcaption>
          </figure>
          <button 
            className="popup__close-button" 
            aria-label="Закрыть окно" 
            type="button"
          ></button>
        </div>
      </div>
  );
}

export default ImagePopup;