import { useHistory } from 'react-router';
import useAPIError from '../../hooks/useAPIError';
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
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          history.push('/');
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
          <input name="email" type="email" placeholder="EMAIL" />
          <input name="password" type="password" placeholder="PASSWORD" />
          <input
            name="repeatPassword"
            type="password"
            placeholder="REPEAT PASSWORD"
          />
          <button type="submit"> Register </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
