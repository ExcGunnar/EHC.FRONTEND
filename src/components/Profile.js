import React from "react";
import AuthService from "../services/auth.service";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.email}</strong> Profile
        </h3> 
        <h3>
            <strong>{currentUser.lastName}</strong> LastName
          </h3>
      </header>
        <p>
        <strong>FirstName:</strong> {currentUser.firstName}
      </p>
      <p>
      <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Token:</strong> {currentUser.accessToken}
      </p>
      <strong>Authorities:</strong> {currentUser.isAdmin.toString()}
    </div>
  );
};
export default Profile;
