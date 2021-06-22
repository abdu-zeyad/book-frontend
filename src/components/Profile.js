import React from "react";

function Profile(props) {
  return props.user ? (
    <>
      <div>Hello {props.user.name}</div>
      <div>Email {props.user.email}</div>
      <img src={props.user.picture} alt="pic" />
    </>
  ) : (
    <p>There is no info</p>
  );
}

export default Profile;
