import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/UI/Card";
import LoaderScreen from "./components/UI/LoaderScreen";
import UserFinder from "./components/UserFinder";

function App() {
  const [users, getUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    getUsers(users);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('loaderScreen').value="loading"
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Fragment>

      {!isLoading && <UserFinder usersList={users}></UserFinder>}
      {isLoading && <LoaderScreen id ="loaderScreen"><h1>Loading</h1></LoaderScreen>}

    </Fragment>
  );
}

export default App;
