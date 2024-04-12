import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

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

  handleEditUser = (user) => {
    this.props.handleEditUserFormParent(user);
  };

  mdParser = new MarkdownIt();
  handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
  };

  render() {
    let arrUsersReduxx = this.state.usersRedux;

    console.log("================", arrUsersReduxx);
    return (
      <>
        <div className="users-containers">
          <div className="users-tables">
            <table id="customers">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Position</th>
                  <th>Role</th>
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
                          <td>{item.gender}</td>
                          <td>{item.positionId}</td>
                          <td>{item.roleId}</td>
                          <td className="buttons">
                            <button
                              className="btn-edit"
                              onClick={() => {
                                this.handleEditUser(item);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => {
                                this.handleDeleteUser(item.id);
                              }}
                            >
                              <i className="fas fa-trash-alt"></i>
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
                  
        {/* <div className="editor">
          <MdEditor
            style={{ height: "500px", border: "2px solid gray" }}
            renderHTML={(text) => this.mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div> */}
      </>
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
