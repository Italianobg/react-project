import './Navigation.css';

function Navigation(props) {
  return (
    <nav>
      <ul>
        <li> Welcome {props.name} </li>
        <li>
          <a href="#"> Add Car </a>
        </li>
        <li>
          <a href="#"> Login </a>
        </li>
        <li>
          <a href="#"> Register </a>
        </li>
        <li>
          <a href="#"> Logout </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
