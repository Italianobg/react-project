import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
  return (
    <nav>
      <ul>
        <li> Welcome {props.name} </li>
        <li>
          <NavLink to="/" activeClassName="selected" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-car" activeClassName="selected" exact>
            Add Car
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="selected" exact>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" activeClassName="selected" exact>
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" activeClassName="selected" exact>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
