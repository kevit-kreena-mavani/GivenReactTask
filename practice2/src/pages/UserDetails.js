import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";
import styles from "./UserDetails.module.css";

const UserDetails = (props) => {
  const navigate = useNavigate();
  const [isSubmit , setIsSubmit] = useState(false);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const UserData = {
      name: event.target.userName.value,
      gender: event.target.gender.value,
      birthDate: event.target.birthDate.value,
      language: event.target.language.value,
    };
    props.onSaveUserDetails(UserData);

    fetch(
      "https://mcqtest-project-default-rtdb.firebaseio.com/user-info.json",
      {
        method: "PUT",
        body: JSON.stringify(UserData),
      }
    );
    setIsSubmit(true);
  };

  const goToTestHandler = () => {
    if(isSubmit){
      navigate("/test");
    }
   
  };

  return (
    <Card>
      <form className={styles.form} onSubmit={submitFormHandler}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="userName"
            placeholder="Enter Full Name"
            required
          />
        </div>
        <div className={styles.radioGroups}>
          <label>Gender</label>
          <span>
            <input type="radio" value="Male" name="gender" defaultChecked />
            Male
          </span>
          <span>
            <input type="radio" value="Female" name="gender" />
            Female
          </span>
        </div>
        <div>
          <label>Birth Date</label>
          <input
            type="date"
            name="birthDate"
            min="2000-01-01"
            max="2020-01-01"
            required
          />
        </div>
        <div>
          <label>Language</label>
          <select className={styles.select} required name="language">
            <option value="english" defaultChecked>
              English
            </option>
            <option value="hindi">Hindi</option>
          </select>
        </div>
        <div className={styles.actions}>
          <button type="submit" >Submit</button>
          <button type="button" onClick={goToTestHandler} disabled={!isSubmit}>
            Go To Test
          </button>
        </div>
        {isSubmit && <h3>Data is submitted successfully!</h3>}
      </form>
    </Card>
  );
};

export default UserDetails;
