import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import Card from "../UI/Card";
import styles from "./Auth.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gotoLoginHandler = () => {
    navigate("/login");
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredData = {
      email: event.target?.email.value,
      password: event.target?.password.value,
    };

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxnTvvz2vRlzr2WeE7oihPCT4KvL0yt9A",
      {
        method: "POST",
        body: JSON.stringify({
          email : enteredData.email,
          password : enteredData.password,
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
        console.log(data);
        dispatch(authActions.loggingIn())
        navigate("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
     
  };
  return (
    <Card className={styles.auth}>
      <form onSubmit={formSubmitHandler}>
        <h2>Create Account</h2>
        <label>Your Name</label>
        <input type="text" placeholder="Enter Full Name" />
        <br />
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter email" />
        <br />
        <label>Mobile number</label>
        <input type="number" minLength={10} placeholder="Enter Mobile number" />
        <br />
        <label>Enter Password</label>
        <input
          type="password"
          placeholder="At least 6 characters"
          name="password"
        />
        <br />
        <label>Enter Valid Address</label>
        <textarea placeholder="Enter Address" />
        <br />
        <button type="submit">SignUp</button>
        <hr />
        <button
          type="button"
          className={styles.toggle}
          onClick={gotoLoginHandler}
        >
          Already have an Account
        </button>
      </form>
    </Card>
  );
};
export default SignUp;
