import { useState } from 'react';
import { Link } from 'react-router-dom';
import fail from '../images/Fail.svg';

function Register(props) {
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
    let {email, password} = formParams;
    props.handleRegister({email, password})
    .catch(() => {
      props.updateDataInfoTooltip({
        title: 'Что-то пошло не так!<br/> Попробуйте ещё раз.',
        img: fail
      })
    })
  }

  return(
    <div className="register page__container">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" method="post" name="register__form" onSubmit={handleSubmit}>
        
        <div className="register__field">
          <input
            id="email-input"
            className="register__input register__input_type_email"
            type="email"
            name="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <span className="email-input-error register__error"></span>
        </div>
        
        <div className="register__field">
          <input
            id="password-input"
            className="register__input register__input_type_password"
            type="password"
            name="password"
            minLength="2"
            maxLength="40"
            placeholder="Password"
            autoComplete="off"
            required
            onChange={handleChange}
          />
          <span className="password-input-error register__error"></span>
        </div>
        <button className="password__submit" type="submit">Зарегистрироваться</button>
        
      </form>
      
      <Link className="register__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
    </div>
  );
};

export default Register;