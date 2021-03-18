import './Register.css';

function Register(props) {
  return (
    <div className="wrapper wrapper-register">
      <div className="register">
        <form action="">
          <input type="email" placeholder="EMAIL" />
          <input type="password" placeholder="PASSWORD" />
          <input type="password" placeholder="REPEAT PASSWORD" />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
