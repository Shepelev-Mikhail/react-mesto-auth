import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  };

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          id="avatar-input"
          className="popup__input popup__input_type_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="avatar-input-error popup__error"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;