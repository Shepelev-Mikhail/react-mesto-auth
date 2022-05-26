import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [cards, updateCards] = useState([]);
  const [currentUser, updateCurrentUser] = useState(null);
  const [isEditProfilePopupOpen, updateIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, updateIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, updateIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, updateSelectedCard] = useState(null);

  useEffect(() => {
    return () => {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([res, cardList]) => {
          updateCurrentUser(res);
          updateCards(cardList);
        })
        .catch(console.log);
    };
  }, []);

  //клик на аватар
  const handleEditAvatarClick = () => {
    updateIsEditAvatarPopupOpen(true);
  };

  //клик на редактирование профиля
  const handleEditProfileClick = () => {
    updateIsEditProfilePopupOpen(true);
  };

  //клик на создание карточки
  const handleAddPlaceClick = () => {
    updateIsAddPlacePopupOpen(true);
  };

  //клик на картику карточки
  const handleCardClick = (card) => {
    updateSelectedCard(card);
  };

  //клик на крестик
  const closeAllPopups = () => {
    if (isEditAvatarPopupOpen) {
      updateIsEditAvatarPopupOpen(false);
    }
    if (isEditProfilePopupOpen) {
      updateIsEditProfilePopupOpen(false);
    }
    if (isAddPlacePopupOpen) {
      updateIsAddPlacePopupOpen(false);
    }
    if (selectedCard) {
      updateSelectedCard(null);
    }
  };

  // сабмит редактирования профиля
  const handleUpdateUser = ({ name, about }) => {
    api.editProfile(name, about)
      .then((res) => {
        updateCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log);
  };

  // сабмит редактирования аватара
  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar)
      .then((res) => {
        updateCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log);
  };

  // Лайки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        updateCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.log);
  };

  // удаление карточки
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        updateCards((state) => state.filter((e) => e._id !== card._id));
      })
      .catch(console.log);
  };

  // сабмит создания карточки
  const handleAddPlaceSubmit = ({ name, link }) => {
    api.addCard(name, link)
      .then((res) => {
        updateCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </div>

        <div className="page__sticky-footer">
          <Footer />
        </div>

        <EditProfilePopup // попап редактирования 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup // попап аватара
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup // попап создания карточки
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm //попап подтверждения удаления 
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
        />

        <ImagePopup //попап просмотра
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>

  );
};

export default App;