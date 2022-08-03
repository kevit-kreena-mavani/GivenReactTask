import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";
import Footer from "../layout/Footer";

const Welcome = () => {
  const Navigate = useNavigate();
  const onClickHandler = () => {
    Navigate("/login");
  };
  return (
    <>
      <main>
        <div className={styles.outerdiv}>
          <div className={styles.content}>
            <h2>Enjoy Shopping!!</h2>
            <button onClick={onClickHandler}>Shop Now </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Welcome;
