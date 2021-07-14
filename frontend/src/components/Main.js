import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from "./Card";


const Main = ({
  cards,
  onEditProfile, 
  onAddPlace, 
  onEditAvatar,
  onCardClick,
  onLike,
  onDelete
}) => {
  const {name, avatar, about} = useContext(CurrentUserContext);

  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>  
          <img 
          src={avatar} alt="Аватар пользователя" 
          className="profile__avatar-image" 
          
        />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <p className="profile__status">{about}</p>
          <button type="button" 
            className="button profile__button profile__button_type_edit" aria-label="Редактировать профиль"
            onClick={onEditProfile}
          ></button>
        </div>
        <button type="button" 
          className="button profile__button profile__button_type_add" aria-label="Добавить новое фото"
          onClick={onAddPlace}
        >+</button>
      </section>
      <section className="gallery" aria-label="Фотогалерея">
        {cards.map(card => 
          <Card 
            card={card} 
            key={card._id} 
            onCardClick={onCardClick}
            onLikeClick={onLike}
            onDeleteClick={onDelete}
        />)}
      </section>
    </main>
  );
}

export default Main;