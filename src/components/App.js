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
import { Switch, Route, Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as MestoAuth from '../utils/MestoAuth.js';
import InfoTooltip from './InfoTooltip';
import success from '../images/Success.svg';

function App() {
  const [cards, updateCards] = useState([]);
  const [currentUser, updateCurrentUser] = useState(null);
  const [isEditProfilePopupOpen, updateIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, updateIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, updateIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, updateSelectedCard] = useState(null);
  const [dataInfoTooltip, updateDataInfoTooltip] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

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

  // сабмит редактирования профиля
  const handleUpdateUser = ({ name, about }) => {
    api.editProfile(name, about)
      .then((res) => {
        updateCurrentUser(res);
        updateIsEditProfilePopupOpen(false);
      })
      .catch(console.log);
  };

  // сабмит редактирования аватара
  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar)
      .then((res) => {
        updateCurrentUser(res);
        updateIsEditAvatarPopupOpen(false);
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
        updateIsAddPlacePopupOpen(false);
      })
      .catch(console.log);
  };

  //const location = useLocation();

  const handleRegister = ({email, password}) => {
    return MestoAuth.register(email, password).then(() => {
      // history.push('/sign-in');
      updateDataInfoTooltip({
        title: 'Вы успешно зарегистрировались!',
        img: success
      })
      history.push('/sign-in')
    })
  }

  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Main
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>

            <Route path="/sign-up">
              <Register handleRegister={handleRegister} updateDataInfoTooltip={updateDataInfoTooltip} />
            </Route>

            <Route path="/sign-in">
              <Login />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

        </div>

        <div className="page__sticky-footer">
          <Footer />
        </div>

        {isEditProfilePopupOpen && <EditProfilePopup // попап редактирования 
          onClose={() => updateIsEditProfilePopupOpen(false)}
          onUpdateUser={handleUpdateUser}
        />}

        {isAddPlacePopupOpen && <AddPlacePopup // попап аватара
          onClose={() => updateIsAddPlacePopupOpen(false)}
          onAddPlace={handleAddPlaceSubmit}
        />}

        {isEditAvatarPopupOpen && <EditAvatarPopup // попап создания карточки
          onClose={() => updateIsEditAvatarPopupOpen(false)}
          onUpdateAvatar={handleUpdateAvatar}
        />}

        {selectedCard && <ImagePopup //попап просмотра
          card={selectedCard}
          onClose={() => updateSelectedCard(null)}
        />}

        {dataInfoTooltip && <InfoTooltip 
          title={dataInfoTooltip.title}
          img={dataInfoTooltip.img}
          onClose={() => updateDataInfoTooltip(null)}
        />}

        {/* {<PopupWithForm //попап подтверждения удаления 
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
        />} */}

      </div>
    </CurrentUserContext.Provider>

  );
};

export default App;