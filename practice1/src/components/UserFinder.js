import { Fragment, useEffect, useState } from "react";
import Card from "./UI/Card";
import Users from "./Users";

const UserFinder = (props) => {
  const coppiedUser = [...props.usersList];

  const [filteredUser, getFilteredUser] = useState([]);
  const [searchTerm, getSearchTerm] = useState("");

  const searchTermHandler = (event) => {
    getSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      getFilteredUser(
        coppiedUser.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 1 second!')
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  console.log(filteredUser);
  
  return (
    <Fragment>
      <Card>
        <input type="search" onChange={searchTermHandler} />
      </Card>
      <Users
        usersList={searchTerm === "" ? props.usersList : filteredUser}
      ></Users>
    </Fragment>
  );
};

export default UserFinder;
