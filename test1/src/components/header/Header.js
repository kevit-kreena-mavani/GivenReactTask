import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../reducers/auth";
import styles from "./Header.module.css";

const Header = () => {
  const isAuth = useSelector((state) => state.isAuthenticated);
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
            <li><Link to='/cart'>Cart</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/about-us'>About Us</Link></li>
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
