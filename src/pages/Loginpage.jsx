import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth'

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signin} = useAuth();

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const user = form.username.value;

        signin(user, () => navigate(fromPage, {replace: true}));
    }

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <label>
            Name: <input name="username" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export {LoginPage};
