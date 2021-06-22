import React from "react";

function LogoutButton(props) {
  return (
    props.isAuth && (
      <button
        onClick={() => {
          props.logoutFunc({ returnTo: window.location.origin });
        }}
      >
        Log out
      </button>
    )
  );
}

export default LogoutButton;
