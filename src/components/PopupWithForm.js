function PopupWithForm(props) {

  return (
    <div className={`popup popup_${props.name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" method="post" name={props.name} onSubmit={props.onSubmit}>
          {props.children}

          <button className="popup__submit" type="submit">{props.buttonText}</button>
        </form>

        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  );
};

export default PopupWithForm;