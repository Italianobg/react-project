import { useHistory } from 'react-router';
import useAPIError from '../../hooks/useAPIError';
import {
  getUsersCounter,
  incrementUser,
} from '../../services/User/userFirebase';
import { auth } from '../../utils/firebase';
import './Register.css';

function Register(props) {
  const { addError } = useAPIError();
  const history = useHistory();

  function registerHandler(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const repeatPassword = e.target.repeatPassword.value;
    let errors = [];
    let counter = '';

    if (email === '') {
      errors.push('Please specify email');
    }
    if (password === '') {
      errors.push('Please write down your password');
    }
    if (repeatPassword === '') {
      errors.push('Please repeat your password');
    }
    if (password !== repeatPassword) {
      errors.push(`Passwords don't match`);
    }
    if (errors.length > 0) {
      addError(errors);
    } else {
      getUsersCounter()
        .then((res) => {
          counter = res.data().counter;
        })
        .catch((err) => {
          addError(err.message);
        });

      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          incrementUser({ counter: counter + 1 })
            .then((res) => {
              history.push('/');
            })
            .catch((err) => {
              addError(err.message);
            });
        })
        .catch((err) => {
          addError(err.message);
        });
    }
  }
  return (
    <div className="wrapper wrapper-register">
      <div className="register">
        <form onSubmit={registerHandler}>
          <div className="input">
            <i className="fas fa-envelope"></i>
            <input name="email" type="email" placeholder="EMAIL" />
          </div>
          <div className="input">
            <i className="fas fa-unlock-alt"></i>
            <input name="password" type="password" placeholder="PASSWORD" />
          </div>
          <div className="input">
            <i className="fas fa-unlock-alt"></i>
            <input
              name="repeatPassword"
              type="password"
              placeholder="REPEAT PASSWORD"
            />
          </div>
          <button type="submit"> Register </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
