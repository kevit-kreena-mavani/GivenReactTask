import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <header>
        <h1>React Test</h1>
        <Link to ='/user-detail'>Profile</Link>
      </header>
    </div>
  );
};
export default Header;
