import { Fragment, useEffect, useState } from "react";
import Card from "./UI/Card";
import Users from "./Users";

const UserFinder = (props) => {
  const copiedUser = [...props.usersList];
  const [isTrue, setTrue] = useState(false);
  const [filteredUser, getFilteredUser] = useState([]);
  const [searchTerm, getSearchTerm] = useState("");

  const searchTermHandler = (event) => {
    getSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      getFilteredUser(
        copiedUser.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm === "" || searchTerm.length > 0) {
      setTimeout(() => {
        setTrue(true);
      }, 300);
    }
    setTrue(false);
  }, [searchTerm]);

  return (
    <Fragment>
      <Card>
        <input type="search" onChange={searchTermHandler} />
      </Card>

      <Card>
        {isTrue && (
          <Users
            usersList={searchTerm === "" ? props.usersList : filteredUser}
          ></Users>
        )}
        {!isTrue && searchTerm.trim().length > 0 && (
          <p>Searching for users...</p>
        )}
      </Card>
      
    </Fragment>
  );
};

export default UserFinder;
