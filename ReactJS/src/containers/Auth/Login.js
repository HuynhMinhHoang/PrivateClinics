import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginAPI } from "../../services/userService";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMessage: "",
    };
  }
  handleOnchangeUsername = (e) => {
    this.setState({
      email: e.target.value,
    });
    // console.log(e.target.value);
  };

  handleOnchangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
    // console.log(e.target.value);
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginAPI(this.state.email, this.state.password);
      // console.log(data);
      if (data && data.userData && data.userData.errCode !== 0) {
        this.setState({
          errMessage: data.userData.errMessage,
        });
      }
      if (data && data.userData && data.userData.errCode === 0) {
        this.props.userLoginSuccess(data.userData.user);
        console.log("login success!", data.userData.user);
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login">LOGIN</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                placeholder="Enter username"
                type="text"
                className="form-control"
                // value={this.state.username}
                onChange={(e) => this.handleOnchangeUsername(e)}
              />
            </div>

            <div className="col-12 form-group login-input">
              <label>Password: </label>
              <input
                placeholder="Enter password"
                type="password"
                className="form-control"
                // value={this.state.password}
                onChange={(e) => this.handleOnchangePassword(e)}
              />
            </div>

            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>

            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>

            <div className="col-12">
              <span>Forget Password?</span>
            </div>

            <div className="col-12 text-center">
              <span className="">Or login with:</span>
            </div>

            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    userLoginFail: () => dispatch(actions.userLoginFail()),

    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSucccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
