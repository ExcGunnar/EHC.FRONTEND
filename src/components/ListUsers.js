import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CustomerService from "../services/customer.service";
import { Link } from "react-router-dom";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeCurrentEmail = e => {
    const currentEmail = e.target.value;
    setCurrentEmail(currentEmail);
  };

  const retrieveUsers = () => {
    CustomerService.getAll()
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const removeAllUsers = () => {
    CustomerService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByEmail = () => {
    CustomerService.findByEmail(currentEmail)
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
    return (
     <div className="col-md-12">
      <div className="col-md-6">
        <h4>Users List - Click on User for Details</h4>

        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.email}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>First Name:</strong>
              </label>{" "}
              {currentUser.firstName}
            </div>
            <div>
              <label>
                <strong>Last Name:</strong>
              </label>{" "}
              {currentUser.lastName}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentUser.email}
            </div>
            <div>
              <label>
                <strong>Password:</strong>
              </label>{" "}
              {currentUser.password}
            </div>
            <div>
              <label>
                <strong>IsAdmin:</strong>
              </label>{" "}
              {currentUser.isAdmin.toString()}
            </div>
            <div>
              <label>
                <strong>DoB:</strong>
              </label>{" "}
              {currentUser.dateOfBirth}
            </div>
            <div>
              <label>
                <strong>Phone:</strong>
              </label>{" "}
              {currentUser.phone}
            </div>
            <div>
              <label>
                <strong>Address:</strong>
              </label>{" "}
              {currentUser.address}
            </div>
            {/* <Link
              to={"/users/" + currentUser.id}
              className="badge badge-warning"
            >
              Edit
            </Link> */}
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUsers;