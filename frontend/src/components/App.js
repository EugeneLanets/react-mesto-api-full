import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup"
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

import avatarPlaceholder from "../images/avatar-placeholder.jpg";

import { useEffect, useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import authApi from "../utils/auth";
import RegisterStatusPopup from "./RegisterStatusPopup";


const App = () => {
  const history = useHistory();

  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isRegisterStatusPopupOpen, setRegisterStatusPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: '', 
    avatar: avatarPlaceholder, 
    about: '',
    _id: null
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [email, setEmail] = useState(null);

  const getInitialData = () => {
    Promise.all([api.getCards(), api.getUserInfo()])
      .then(([initialCards, userInfo]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch(err => {
        console.log(err);
      })  
  }

  const handleEscPress = () => {
    const onEscPress = (evt) => {
      if (evt.key === 'Escape') closeAllPopups();
    }
    const isAnyPopupOpen = [
      isAddPlacePopupOpen, 
      isEditAvatarPopupOpen, 
      isEditProfilePopupOpen,
      selectedCard,
      isRegisterStatusPopupOpen,
      deletedCard
    ].some(Boolean);

    if (isAnyPopupOpen) {
      document.addEventListener("keydown", onEscPress)
    }

    return () => document.removeEventListener("keydown", onEscPress)
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi.checkToken(jwt)
        .then(({data:{email}}) => {
          setEmail(email);
          setLoggedIn(true);
          history.push("/");
        })
    }
  }
  
  useEffect(getInitialData, []);
  useEffect(tokenCheck);
  useEffect(
    handleEscPress, 
    [
      isAddPlacePopupOpen,
      isEditAvatarPopupOpen, 
      isEditProfilePopupOpen, 
      selectedCard,
      deletedCard,
      isRegisterStatusPopupOpen
    ]
  );

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleLikeClick = ({likes, _id}) => {
    const isLiked = likes.some(({_id}) => _id === currentUser._id);
    const method = isLiked ? "DELETE" : "PUT";
    api.toggleLike(_id, method)
      .then(newCard => {
        setCards(cards => cards.map(card => card._id === _id ? newCard : card))
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleDeleteClick = (card) => {
    setDeletedCard(card);
  }

  const handleDeleteConfirm = ({_id}) => {
    setLoading(true);
    api.deleteCard(_id)
      .then(response => {
        setCards(cards.filter(card => card._id !== _id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleUpdateUser = (userInfo) => {
    setLoading(true);
    api.updateUserInfo(userInfo)
      .then(response => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });    
  }

  const handleUpdateAvatar = (userInfo) => {
    setLoading(true);
    api.updateAvatar(userInfo)
      .then(response => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleAddCard = (newCard) => {
    setLoading(true);
    api.addCard(newCard)
      .then(response => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handlePopupClose = evt => {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    setEditProfileOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setRegisterStatusPopupOpen(false);
  }

  const handleLoginSubmit = (credentials) => {
    authApi.login(credentials)
      .then(({token}) => {
          if (token) {
          console.log('response: ', token);
          localStorage.setItem("jwt", token);
          setLoggedIn(true);
          history.push("/");
        }
      })
  }

  const handleRegistrationEnd = (status) => {
    setRegistrationStatus(status);
    setRegisterStatusPopupOpen(true);
  }

  const handleRegisterSubmit = (credentials) => {
    authApi.register(credentials)
      .then(response => {
        handleRegistrationEnd(true);
        history.push("/signin");
      })
      .catch(err => {
        handleRegistrationEnd(false);
      })
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onLogout={handleLogout}/>
        <Switch>
          <ProtectedRoute 
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards} 
            onEditProfile={()=>{setEditProfileOpen(true)}}
            onAddPlace={()=>{setAddPlacePopupOpen(true)}} 
            onEditAvatar={()=>{setEditAvatarPopupOpen(true)}}
            onCardClick={handleCardClick}
            onLike={handleLikeClick}
            onDelete={handleDeleteClick}
          />
          <Route path="/signup">
            <Register 
              onSubmit={handleRegisterSubmit}
            />
          </Route>
          <Route path="/signin">
            <Login 
              onSubmit={handleLoginSubmit}
            />
          </Route>
        </Switch>

        {loggedIn && <Footer />}
        
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onAddCard={handleAddCard}
          onClose={handlePopupClose}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onClose={handlePopupClose}
          onUpdateAvatar={handleUpdateAvatar}
        />
        
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onClose={handlePopupClose}
          onUpdateUser={handleUpdateUser}
        />
        
        <DeleteCardPopup 
          card={deletedCard}
          isLoading={isLoading}
          onClose={handlePopupClose}
          onConfirmDelete={handleDeleteConfirm}
        />

        <ImagePopup 
          card={selectedCard} 
          onClose={handlePopupClose} 
        />

        <RegisterStatusPopup 
          isOpen={isRegisterStatusPopupOpen}
          registrationSuccessfull={registrationStatus}
          onClose={handlePopupClose}
        />
         
      </CurrentUserContext.Provider>   
    </div>
  );
}

export default App;
