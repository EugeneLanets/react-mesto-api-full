import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({
  card, 
  onCardClick, 
  onLikeClick,
  onDeleteClick
}) => {
  const {_id: currentUserId} = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUserId;
  
  const isLiked = card.likes.some(({_id}) => _id === currentUserId);
  
  const handleClick = () => {
    onCardClick(card);
  }
  const handleLikeClick = () => {
    onLikeClick(card);
  }
  const handleDeleteClick = () => {
    onDeleteClick(card);
  }

  return (
    <article className="card">
      <img 
        src={card.link} 
        alt={card.name} 
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__like-section">
          <button 
            type="button" 
            className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`} 
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
        
      </div>
      <button 
        type="button" 
        className={`card__delete ${isOwn ? '' : 'card__delete_hidden'}`} 
        onClick={handleDeleteClick}  
        aria-label="Удалить карточку"
      ></button>
    </article>
  );
}

export default Card;