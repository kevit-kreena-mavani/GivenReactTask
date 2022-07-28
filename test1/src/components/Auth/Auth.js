import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import Card from "../UI/Card";
import styles from "./Auth.module.css";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login());

    navigate("/product-list");
  };

  return (
    <Card className={styles.auth}>
      <form onSubmit={formSubmitHandler}>
        <label>Email</label>
        <input type="email" placeholder="Enter email" required />
        <br />
        <label>Password</label>
        <input type="password" placeholder="Enter password" required />
        <br />
        <button type="submit">Login</button>
        <br />
        <button type="button" className={styles.toggle}>
          Create New Account
        </button>
      </form>
    </Card>
  );
};

export default Auth;
