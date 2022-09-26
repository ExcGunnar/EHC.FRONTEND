import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vPassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vFirstName = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The first name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vLastName = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The last name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vDateOfBirth = value => {
  if (!value instanceof Date) {
    return (
      <div className="alert alert-danger" role="alert">
        The DoB is required.
      </div>
    );
  }
};

const vPhone = value => {
  if (value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        The phone must be 10 characters.
      </div>
    );
  }
};
const vAddress = value => {
  if (value.length < 1 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The address must be between 1 and 40 characters.
      </div>
    );
  }
};
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeDoB = this.onChangeDoB.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNo: "",
      address: "",
      successful: false,//delete
      message: ""//delete
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeDoB(e) {
    this.setState({
      dateOfBirth: e.target.value
    });
  }

  onChangePhone(e) {
    this.setState({
      phoneNo: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.password,
        this.state.dateOfBirth,
        this.state.phoneNo,
        this.state.address,
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
           <span style={{'color':'red'}}>{this.state.message}</span>
           <span style={{'color':'red'}}>{"Upon successful registry, form will shrink. Please navigate to sign in with your credentials."}</span>

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
           {!this.state.successful && (
            <div>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, vEmail]}
                />
                </div>

                <div className="form-group">
               <label htmlFor="password">Password</label>
               <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, vPassword]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChangeFirstName}
                  validations={[required, vFirstName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                  validations={[required, vLastName]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">DoB</label>
                <Input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={this.state.dateOfBirth}
                  onChange={this.onChangeDoB}
                  validations={[required, vDateOfBirth]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phoneNo"
                  value={this.state.phoneNo}
                  onChange={this.onChangePhone}
                  validations={[required, vPhone]}
                />
              </div>              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChangeAddress}
                  validations={[required, vAddress]}
                />
              </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {"Successfully Registered: " + this.state.successful}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
        <span style={{'color':'red'}}>{this.state.successful}</span>
      </div>
      
    );
  }
}