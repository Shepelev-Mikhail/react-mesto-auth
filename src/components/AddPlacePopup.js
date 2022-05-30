import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [place, changePlace] = useState('');
  const [link, changeLink] = useState('');

  function handleChangePlace(e) {
    changePlace(e.target.value);
  };

  function handleChangeLink(e) {
    changeLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: place,
      link: link
    });
  };

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText="Создать"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          id="place-input"
          className="popup__input popup__input_type_place"
          type="text"
          name="name"
          placeholder="Название"
          value={place}
          minLength="2"
          maxLength="30"
          required
          onChange={handleChangePlace}
        />
        <span className="place-input-error popup__error"></span>
      </div>

      <div className="popup__field">
        <input
          id="link-input"
          className="popup__input popup__input_type_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={link}
          required
          onChange={handleChangeLink}
        />
        <span className="link-input-error popup__error"></span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;