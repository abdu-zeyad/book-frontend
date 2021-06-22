import React from "react";

function LoginButton(props) {
  return !props.isAuth && <button onClick={props.loginFunc}>Log in</button>;
}

export default LoginButton;
