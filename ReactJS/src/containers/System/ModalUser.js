import React, { Component } from "react";
import { connect } from "react-redux";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }

  componentDidMount() {}

  toggle = () => {
    this.props.isToggle();
  };

  handleOnchangeInput = (e, id) => {
    //biến đổi gián tiếp để tăng hiệu năng
    let copyState = { ...this.state };
    copyState[id] = e.target.value;

    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValidate = true;
    let arr = ["email", "password", "firstName", "lastName", "address"];

    for (let i = 0; i < arr.length; i++) {
      if (!this.state[arr[i]]) {
        isValidate = false;
        alert("Vui long nhap " + arr[i]);
        break;
      }
    }
    return isValidate;
  };

  handleAddNewUser = () => {
    let isInput = this.checkValidateInput();
    if (isInput) {
      this.props.createUser(this.state);
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className={"dgdfg"}
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>
            Create New User
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-6 form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.handleOnchangeInput(e, "email");
                    }}
                    value={this.state.email}
                  />
                </div>

                <div className="col-6 form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    onChange={(e) => {
                      this.handleOnchangeInput(e, "password");
                    }}
                    value={this.state.password}
                  />
                </div>

                <div className="col-6 form-group">
                  <label>First Name</label>
                  <input
                    type="firstName"
                    onChange={(e) => {
                      this.handleOnchangeInput(e, "firstName");
                    }}
                    value={this.state.firstName}
                  />
                </div>

                <div className="col-6 form-group">
                  <label>Last Name</label>
                  <input
                    type="lastName"
                    onChange={(e) => {
                      this.handleOnchangeInput(e, "lastName");
                    }}
                    value={this.state.lastName}
                  />
                </div>

                <div className="col-6 form-group">
                  <label>Address</label>
                  <input
                    type="address"
                    onChange={(e) => {
                      this.handleOnchangeInput(e, "address");
                    }}
                    value={this.state.address}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleAddNewUser()}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={() => this.toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
