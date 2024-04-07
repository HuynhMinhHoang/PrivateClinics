import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

/**?
 * Life cycle
 * Run component
 * 1 Run construct -> init state
 * 2 Did mount (set state)
 * 3 Render
 */
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (id) => {
    this.props.deleteUsers(id);
  };

  render() {
    let arrUsersReduxx = this.state.usersRedux;
    return (
      <div className="users-container">
        <div className="users-table">
          <table id="customers">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
              {arrUsersReduxx &&
                arrUsersReduxx.length > 0 &&
                arrUsersReduxx.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td className="buttons">
                          <button className="btn-edit" onClick={() => {}}>
                            Edit
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => {
                              this.handleDeleteUser(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
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
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(actions.getAllUsers()),
    deleteUsers: (id) => dispatch(actions.deleteUsers(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
