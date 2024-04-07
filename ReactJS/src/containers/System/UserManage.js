import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUser,
  createNewUser,
  deleteUser,
  editUser,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";

import { emitter } from "../../utils/emitter";
/**?
 * Life cycle
 * Run component
 * 1 Run construct -> init state
 * 2 Did mount (set state)
 * 3 Render
 */
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isModalUser: false,
      isModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    let response = await getAllUser("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
      // console.log("================", this.state.arrUsers);
    }
  }

  //add user
  handleAddNewUser = () => {
    this.setState({
      isModalUser: true,
    });
  };

  toggleModal = () => {
    this.setState({
      isModalUser: !this.state.isModalUser,
    });
  };

  toggleModalEditUser = () => {
    this.setState({
      isModalEditUser: !this.state.isModalEditUser,
    });
  };

  createUser = async (data) => {
    try {
      let res = await createNewUser(data);
      console.log(res);
      if (res && res.errCode !== 0) {
        alert(res.message);
      } else {
        await this.componentDidMount();
        this.setState({
          isModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (data) => {
    try {
      let res = await deleteUser(data.id);
      if (res && res.errCode !== 0) {
        alert("Lỗi " + res.message);
      } else {
        await this.componentDidMount();
        alert("Xóa thành công user" + data.firstName);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUser(user);
      if (res && res.errCode !== 0) {
        alert("Lỗi " + res.errMessage);
      } else {
        alert(res.errMessage);
        await this.componentDidMount();

        this.setState({
          isModalEditUser: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;

    return (
      <div className="users-container">
        <div className="title text-center">Quản lý thông tin người dùng</div>
        <ModalUser
          isOpen={this.state.isModalUser}
          isToggle={this.toggleModal}
          createUser={this.createUser}
        />
        {this.state.isModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isModalEditUser}
            isToggle={this.toggleModalEditUser}
            editUser={this.state.userEdit}
            dataEditUser={this.doEditUser}
          />
        )}

        <div className="mx-1">
          <button
            className="btn btn-primary px=4"
            onClick={() => this.handleAddNewUser()}
          >
            Add
          </button>
        </div>

        <div className="users-table">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td className="buttons">
                        <button
                          className="btn-edit"
                          onClick={() => {
                            this.handleEditUser(item);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
