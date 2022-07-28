import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import styles from "./Header.module.css";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gotoLoginHandler = () =>{
    navigate('/login')
  }

  const logoutHandler = () =>{
    dispatch(authActions.logout())
  }
  return (
    <header className={styles.header}>
      <h1>Shopping Site</h1>
      {isAuth ? (
        <nav>
          <ul>
            <li>Cart</li>
            <li>Profile</li>
            <li>About Us</li>
            <li>
              <button onClick={logoutHandler}>logout</button>
            </li>
          </ul>
        </nav>
      ) : (
        <button onClick ={gotoLoginHandler}>Login</button>
      )}
    </header>
  );
};

export default Header;
