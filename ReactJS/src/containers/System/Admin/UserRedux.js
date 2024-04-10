import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils/";
import * as actions from "../../../store/actions";
import TableManageUser from "./TableManageUser.js";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImg: [],
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      gender: "",
      position: "",
      role: "",
      image: "",

      action: "",
      editUserId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const gender = this.props.genderRedux;
    const position = this.props.positonRedux;
    const role = this.props.roleRedux;

    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: gender,
        gender: gender && gender.length > 0 ? gender[0].key : "",
      });
    }

    if (prevProps.positonRedux !== this.props.positonRedux) {
      this.setState({
        positionArr: position,
        position: position && position.length > 0 ? position[0].key : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: role,
        role: role && role.length > 0 ? role[0].key : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        gender: "",
        position: "",
        role: "",
        image: "",
        action: CRUD_ACTIONS.CREATE,
        previewImg: "",
      });
    }
  }

  handleOnChangeImg = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("====",base64)
      const url = URL.createObjectURL(file);
      this.setState({
        previewImg: url,
        image: base64,
      });
    }
  };

  handleSaveUser = () => {
    let isValue = this.checkValidateInput();
    if (isValue === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUsers({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phone,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.image,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUsers({
        id: this.state.editUserId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phone,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.image,
      });
    }

    this.props.getAllUsers();
  };

  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let flag = true;
    const arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phone",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        flag = false;
        alert("Vui lòng điền thông tin " + arrCheck[i] + "!");
        break;
      }
    }
    return flag;
  };

  handleEditUserFormParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phone: user.phonenumber,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      image: "",
      previewImg: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      editUserId: user.id,
    });
  };

  render() {
    const genderInfo = this.state.genderArr;
    const roleInfo = this.state.roleArr;
    const positionInfo = this.state.positionArr;
    const language = this.props.language;
    const {
      email,
      password,
      firstName,
      lastName,
      address,
      phone,
      gender,
      position,
      role,
      image,
    } = this.state;
    return (
      <>
        <div className="title">
          <FormattedMessage id="manager-user.add" />
        </div>
        <div className="user-redux-container">
          <div>
            <div className="user-redux-body">
              <div className="col-md-6">
                <div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">
                        <FormattedMessage id="manager-user.email" />
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          this.onChangeInput(e, "email");
                        }}
                        disabled={
                          this.state.action === CRUD_ACTIONS.EDIT ? true : false
                        }
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">
                        <FormattedMessage id="manager-user.password" />
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          this.onChangeInput(e, "password");
                        }}
                        disabled={
                          this.state.action === CRUD_ACTIONS.EDIT ? true : false
                        }
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputFirstName">
                        <FormattedMessage id="manager-user.firstName" />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputFirstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => {
                          this.onChangeInput(e, "firstName");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputLastName">
                        <FormattedMessage id="manager-user.lastName" />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputLastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => {
                          this.onChangeInput(e, "lastName");
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="inputAddress">
                        <FormattedMessage id="manager-user.address" />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="1234 Main St"
                        value={address}
                        onChange={(e) => {
                          this.onChangeInput(e, "address");
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPhone">
                        <FormattedMessage id="manager-user.phone" />
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputPhone"
                        placeholder="0123456789"
                        value={phone}
                        onChange={(e) => {
                          this.onChangeInput(e, "phone");
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputGender">
                        <FormattedMessage id="manager-user.gender" />
                      </label>
                      <select
                        id="inputGender"
                        className="form-control"
                        onChange={(e) => {
                          this.onChangeInput(e, "gender");
                        }}
                        value={gender}
                      >
                        {genderInfo &&
                          genderInfo.length > 0 &&
                          genderInfo.map((item, index) => {
                            return (
                              <option key={index} value={item.keyMap}>
                                {language === LANGUAGES.VI
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPosition">
                        <FormattedMessage id="manager-user.position" />
                      </label>
                      <select
                        id="inputPosition"
                        className="form-control"
                        onChange={(e) => {
                          this.onChangeInput(e, "position");
                        }}
                        value={position}
                      >
                        {positionInfo &&
                          positionInfo.length > 0 &&
                          positionInfo.map((item, index) => {
                            return (
                              <option key={index} value={item.keyMap}>
                                {language === LANGUAGES.VI
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputRole">
                        <FormattedMessage id="manager-user.role" />
                      </label>
                      <select
                        id="inputRole"
                        className="form-control"
                        onChange={(e) => {
                          this.onChangeInput(e, "role");
                        }}
                        value={role}
                      >
                        {roleInfo &&
                          roleInfo.length > 0 &&
                          roleInfo.map((item, index) => {
                            return (
                              <option key={index} value={item.keyMap}>
                                {language === LANGUAGES.VI
                                  ? item.valueVi
                                  : item.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group image">
                    <label htmlFor="inputImage">
                      <FormattedMessage id="manager-user.image" />
                    </label>
                    <label htmlFor="inputImage" className="file-input-label">
                      <i className="fas fa-upload"></i>
                    </label>
                    <input
                      type="file"
                      id="inputImage"
                      className="form-control-file"
                      onChange={(e) => {
                        this.handleOnChangeImg(e);
                      }}
                      style={{ display: "none" }}
                    />
                    <div
                      className="preview-avt"
                      style={{
                        backgroundImage: `url(${this.state.previewImg})`,
                      }}
                    ></div>
                  </div>

                  <button
                    // type="submit"
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={() => {
                      this.handleSaveUser();
                    }}
                  >
                    <FormattedMessage id="manager-user.save" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* table */}
            <TableManageUser
              handleEditUserFormParent={this.handleEditUserFormParent}
              action={this.state.action}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positonRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUsers: (data) => dispatch(actions.createNewUsers(data)),
    getAllUsers: () => dispatch(actions.getAllUsers()),
    editUsers: (data) => dispatch(actions.editUsers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
