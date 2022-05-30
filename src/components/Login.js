import { useState } from 'react';

function Login(props) {
  const [formParams, setFormParams] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formParams.email || !formParams.password) {
      return;
    }
    props.handleLogin({ email: formParams.email, password: formParams.password })
  };

  return (
    <div className="authorization page__container">
      <h2 className="authorization__title">Вход</h2>
      <form className="authorization__form" method="post" name="login__form" onSubmit={handleSubmit}>
        <div className="authorization__field">
          <input
            id="email-input"
            className="authorization__input authorization__input_type_email"
            type="email"
            name="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            autoComplete="off"
            required
            onChange={handleChange}
          />
          <span className="email-input-error authorization__error"></span>
        </div>

        <div className="authorization__field">
          <input
            id="password-input"
            className="authorization__input authorization__input_type_password"
            type="password"
            name="password"
            minLength="2"
            maxLength="40"
            placeholder="Password"
            autoComplete="off"
            required
            onChange={handleChange}
          />
          <span className="password-input-error authorization__error"></span>
        </div>
        <button className="authorization__submit" type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;