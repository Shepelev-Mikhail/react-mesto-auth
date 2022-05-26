function Login() {
  return(
      <div className="login page__container">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" method="post" name="login__form">
          <input
            id="email-input"
            className="login__input login__input_type_email"
            type="email"
            name="email"
            minLength="2"
            maxLength="40"
            required
            onChange={() => {

            }}
          />
          <input
            id="password-input"
            className="login__input login__input_type_password"
            type="password"
            name="password"
            minLength="2"
            maxLength="40"
            required
            onChange={() => {
              
            }}
          />
        </form>
        <button className="login__submit" type="submit">Войти</button>
      </div>
  );
};

export default Login;

{/* <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
  <div className="popup__container">
    <h2 className="popup__title">{props.title}</h2>
    <form className="popup__form" method="post" name={props.name} onSubmit={props.onSubmit}>
      {props.children}

      <button className="popup__submit" type="submit">{props.buttonText}</button>
    </form>

    <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
  </div>
</div> */}