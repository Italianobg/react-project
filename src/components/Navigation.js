import './Navigation.css';

function Navigation(props) {
  return (
    <ul>
      <li> Welcome {props.name} </li>
      <li> Add Car </li>
      <li> Login </li>
      <li> Register </li>
      <li> Logout </li>
    </ul>
  );
}

export default Navigation;
