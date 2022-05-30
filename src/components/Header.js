import logo from '../images/logo.svg';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {

  let location = useLocation();
  const [btn, setBtn] = useState(null);

  const checkLocation = () => {
    if (location?.pathname === '/sign-up') {
      setBtn({ link: '/sign-in', name: 'Войти' });
    } else if (location?.pathname === '/sign-in') {
      setBtn({ link: '/sign-up', name: 'Регистрация' });
    }
  };

  useEffect(() => {
    checkLocation();
  }, [location])

  return (
    <header className="header page__container">
      <img className="header__logo" src={logo} alt="Лого" />
      <div className='header__nav'>
        {props.email && <p className='header__email'>{props.email}</p>}
        {
          props?.loggedIn &&
          <button className='header__button' onClick={props.signOut}>Выйти</button>
        }
        {
          !props?.loggedIn && btn &&
          <Link to={btn?.link} className='header__button'>{btn?.name}</Link>
        }
      </div>
    </header>
  );
};

export default Header;