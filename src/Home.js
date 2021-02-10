import React, { useState, useEffect } from "react";
import Login from "./Login";
import Channel from "./Channel";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("@token");
    if (token) setLoggedIn(true);
  }, []);

  return (
    <>
      {loggedIn ? (
        <Channel setLoggedIn={setLoggedIn} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </>
  );
};

export default Home;
