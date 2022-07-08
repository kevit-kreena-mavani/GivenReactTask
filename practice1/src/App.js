import { Fragment, useEffect, useState } from "react";
import "./App.css";
import LoaderScreen from "./components/UI/LoaderScreen";
import UserFinder from "./components/UserFinder";

function App() {
  const [users, getUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    setTimeout(() => {
      setIsLoading(true);
      setMessage("Please Wait...");
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 600);

    getUsers(users);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <Fragment>
      {!isLoading && (
        <UserFinder usersList={users} loader = {setIsLoading}></UserFinder>
      )}
      {isLoading && (
        <LoaderScreen>
          <h1>{message}</h1>
        </LoaderScreen>
      )}
    </Fragment>
  );
}

export default App;
