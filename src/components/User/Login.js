import './Login.css';

function Login(props) {
  return (
    <div className="wrapper wrapper-login">
      <div className="login">
        <form action="">
          <input type="email" placeholder="EMAIL" />
          <input type="password" placeholder="PASSWORD" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
