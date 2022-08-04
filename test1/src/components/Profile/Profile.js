import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../reducers/auth";
import styles from "./Profile.module.css";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [successMsg , setSuccessMsg] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredData = {
      email: event.target?.email.value,
      name: event.target?.username.value,
      mobileNumber: event.target?.mobileNumber.value,
      address: event.target?.address.value,
    };

    dispatch(authActions.updateUserData(enteredData));
    setSuccessMsg("Changes Updated Successfully!")
  };
  const discardChangeHandler = () => {
    dispatch(authActions.discardChange());
    navigate(0);
  };

  const closeBtnHandler = () =>{
    navigate(-1)
  }
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h1> Your Profile </h1>
        <button onClick={closeBtnHandler}> close</button>
      </div>

      <form className={styles.profileForm} onSubmit={formSubmitHandler}>
        <div>
          <label>Name : </label>
          <input defaultValue={userData.name} name="username" />
        </div>
        <div>
          <label>Email : </label>
          <input defaultValue={userData.email} name="email" />
        </div>
        <div>
          <label>Mobile Number : </label>
          <input
            defaultValue={userData.mobileNumber}
            type="number"
            name="mobileNumber"
          />
        </div>
        <div>
          <label>Address : </label>
          <input defaultValue={userData.address} name="address" />
        </div>
        
        <button type="submit">Update Profile</button>
        <button type="button" onClick={discardChangeHandler}>
          Discard Changes
        </button>
      </form>
      {successMsg && <h2>{successMsg}</h2>}
    </div>
  );
}

export default Profile;
