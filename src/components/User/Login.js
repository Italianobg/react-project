import { useHistory } from 'react-router';
import useAPIError from '../../hooks/useAPIError';
import { auth } from '../../utils/firebase';
import './Login.css';

function Login(props) {
  const { addError } = useAPIError();
  const history = useHistory();

  function onLoginFormSubmitHandler(e) {
    e.preventDefault();
    let errors = [];
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === '') {
      errors.push('Please specify email');
    }
    if (password === '') {
      errors.push('Please type password');
    }

    if (errors.length > 0) {
      addError(errors);
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push('/');
        })
        .catch((err) => {
          addError(err.message);
        });
    }
  }

  return (
    <div className="wrapper wrapper-login">
      <div className="login">
        <form onSubmit={onLoginFormSubmitHandler}>
          <div className="input">
            <i className="fas fa-envelope"></i>
            <input type="email" name="email" placeholder="EMAIL" />
          </div>
          <div className="input">
            <i className="fas fa-unlock-alt"></i>
            <input type="password" name="password" placeholder="PASSWORD" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
