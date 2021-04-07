import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../utils/firebase';
import useAPIUser from '../hooks/useAPIUser';
import './Navigation.css';

function Navigation(props) {
  const history = useHistory();
  const { user } = useAPIUser();

  function logoutHandler(e) {
    auth.signOut();
    history.push('/');
  }

  return (
    <nav>
      <ul>
        <li>
          {user !== null && user.user !== null
            ? `Welcome ${user.user.email}`
            : ''}
        </li>
        <li>
          <NavLink to="/" activeClassName="selected" exact>
            Home
          </NavLink>
        </li>
        {user !== null && user.user !== null ? (
          <li>
            <NavLink to="/add-car" activeClassName="selected" exact>
              Add Car
            </NavLink>
          </li>
        ) : (
          ''
        )}
        {user !== null && user.user !== null ? (
          ''
        ) : (
          <li>
            <NavLink to="/login" activeClassName="selected" exact>
              Login
            </NavLink>
          </li>
        )}
        {user !== null && user.user !== null ? (
          ''
        ) : (
          <li>
            <NavLink to="/register" activeClassName="selected" exact>
              Register
            </NavLink>
          </li>
        )}
        {user !== null && user.user !== null ? (
          <li onClick={logoutHandler}>
            <NavLink to="/logout" activeClassName="selected" exact>
              Logout
            </NavLink>
          </li>
        ) : (
          ''
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
