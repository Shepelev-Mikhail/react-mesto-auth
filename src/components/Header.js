import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__container">
      <img className="header__logo" src={logo} alt="Лого" />
    </header>
  );
};

export default Header;