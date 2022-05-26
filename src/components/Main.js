import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  const cardsList = props.cards.map((card) =>
    (<Card
      card={card}
      key={card._id}
      onCardClick={props.onCardClick}
      onCardLike={props.onCardLike}
      onCardDelete={props.onCardDelete}
    />)
  );

  return (
    currentUser &&
    <main>
      <section className="profile page__container">
        <div className="profile__info">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img className="profile__image" src={currentUser.avatar} alt="Аватар" />
          </div>
          <div className="profile__name">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать"
              title="Редактировать"
              onClick={props.onEditProfile}
            />
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          title="Добавить"
          onClick={props.onAddPlace}
        />
      </section>

      <section>
        <ul className="gallery page__container">
          {cardsList}
        </ul>
      </section>
    </main>
  );
};

export default Main;