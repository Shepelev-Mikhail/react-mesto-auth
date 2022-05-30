import logo from '../images/logo.svg';
import { Link, Switch, Route } from 'react-router-dom';

function Header(props) {
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
          !props?.loggedIn &&
          <Switch>
            <Route path='/sign-up'>
              <Link to='/sign-in' className='header__button'>Войти</Link>
            </Route>
            <Route path='/sign-in'>
              <Link to='/sign-up' className='header__button'>Регистрация</Link>
            </Route>
          </Switch>
        }
      </div>
    </header>
  );
};

export default Header;