import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
const Home = () => {
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{"Welcome to the E-Healthcare Portal! Please sign in or sign up."}</h3>
      </header>
    </div>
  );
};
export default Home;
