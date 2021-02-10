import React, { useState, useEffect } from "react";
import { LoginQL } from "./graphql/mutations";
import { useMutation } from "@apollo/client";

const Login = ({ setLoggedIn }) => {
  const [login, { data, err }] = useMutation(LoginQL);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (data && data.loginToChannel.accessToken) {
      localStorage.setItem("@token", data.loginToChannel.accessToken);
      setLoggedIn(true);
    }
    //console.log(data.loginToChannel.errors);
  }, [data]);

  const handleLogin = () => {
    login({ variables: { password } });
  };

  return (
    <>
      <h1>Welcome</h1>
      <h3>Who Are you?</h3>
      <form>
        <label>
          UserName:
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="mypassword"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <br />
      </form>
      <button style={{ height: 30, width: 50 }} onClick={handleLogin}>
        Login
      </button>
      {data && <p>{data.loginToChannel.errors}</p>}
    </>
  );
};

export default Login;
