import {  useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";

const Welcome = () => {
    const Navigate = useNavigate();
    const onClickHandler =() =>{
        Navigate('/login')
    }
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h2>Enjoy Shopping... </h2>
        <button onClick={onClickHandler}>Shop Now </button>
      </div>
    </div>
  );
};
export default Welcome;
