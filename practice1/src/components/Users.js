import React from "react";
import Card from "./UI/Card";
import styles from "./User.module.css";

const Users = (props) => {
  const user = props.usersList.map((user) => (
    <li key={user.id}>{user.name}</li>
  ));
  return (
    <div className={styles.users}>
      <ul>{user}</ul>
      {user.length === 0 && <p>User not Found</p>}
    </div>
  );
};
export default Users;
