import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../reducers/auth";
import Card from "../UI/Card";
import styles from "./Auth.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxnTvvz2vRlzr2WeE7oihPCT4KvL0yt9A",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredData.email,
          password: enteredData.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(authActions.loggedIn(enteredData));
        navigate("/products");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const gotoSignupHandler = () => {
    navigate("/signup");
  };

  return (
    <Card className={styles.auth}>
      <form onSubmit={formSubmitHandler}>
        <h2>Sign-in</h2>
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter email" required />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
        <br />
        <button type="submit">Login</button>
        <hr />
        <button
          type="button"
          className={styles.toggle}
          onClick={gotoSignupHandler}
        >
          Create New Account
        </button>
      </form>
    </Card>
  );
};

export default Login;
