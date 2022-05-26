import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__container">
      <img className="header__logo" src={logo} alt="Лого" />
      <div className='header__nav'>
        <p className='header__email'>email</p>
        <button className='header__button'>Войти</button>
      </div>
    </header>
  );
};

export default Header;