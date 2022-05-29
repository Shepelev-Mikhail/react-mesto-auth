import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  const [formParams, setFormParams] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formParams.email || !formParams.password){
      return;
    }
    props.handleLogin({ email: formParams.email, password: formParams.password })
        .catch(err => {
          console.log('no')
        });
  }

  return(
      <div className="login page__container">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" method="post" name="login__form" onSubmit={handleSubmit}>
          
          <div className="login__field">
            <input
              id="email-input"
              className="login__input login__input_type_email"
              type="email"
              name="email"
              minLength="2"
              maxLength="40"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <span className="login-input-error login__error"></span>
          </div>
          
          <div className="login__field">
            <input
              id="password-input"
              className="login__input login__input_type_password"
              type="password"
              name="password"
              minLength="2"
              maxLength="40"
              placeholder="Password"
              autoComplete="off"
              required
              onChange={handleChange}
            />
            <span className="password-input-error login__error"></span>
          </div>

          <button className="login__submit" type="submit">Войти</button>
        </form>
        

      </div>
  );
};

export default Login;


{/* <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" method="post" name={props.name} onSubmit={props.onSubmit}>
          
          <div className="popup__field">
            <input
              id="name-input"
              className="popup__input popup__input_type_name"
              type="text"
              name="name"
              value={name || ''}
              minLength="2"
              maxLength="40"
              required
              onChange={handleChangeName}
            />
            <span className="name-input-error popup__error"></span>
          </div>

          <div className="popup__field">
            <input
              id="description-input"
              className="popup__input popup__input_type_description"
              type="text"
              name="description"
              value={description || ''}
              minLength="2"
              maxLength="200"
              required
              onChange={handleChangeDescription}
            />
            <span className="description-input-error popup__error"></span>
          </div>

          <button className="popup__submit" type="submit">{props.buttonText}</button>
        </form>

        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div> */}