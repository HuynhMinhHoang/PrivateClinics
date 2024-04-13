import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
    };
  }

  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
        console.log("admin");
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
        console.log("bacsi");
      }
    }

    this.setState({
      menuList: menu,
    });
  }
  render() {
    const { processLogout, userInfo } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuList} />
        </div>

        <div className="languages">
          <span className="welcome  ">
            <FormattedMessage id="homeheader.welcome" />,{" "}
            {userInfo && userInfo.lastName
              ? userInfo.lastName
              : "Vui lòng login!"}
            !
          </span>
          <span
            className="language-vi"
            onClick={() => {
              this.handleChangeLanguage(LANGUAGES.VI);
            }}
          >
            VI
          </span>
          <span
            className="language-en"
            onClick={() => {
              this.handleChangeLanguage(LANGUAGES.EN);
            }}
          >
            EN
          </span>

          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
