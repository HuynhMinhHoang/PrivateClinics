import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./About.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import about from "../../../assets/about.png";
// import "slick-carousel/slick/slick-theme.css";

class About extends Component {
  changeLanguage = (language) => {
    this.props.changeLangugeAppRedux(language);
  };

  render() {
    return (
      <div className="section-about">
        <h3>Truyền thông nói gì về BookKingCare</h3>

        <div className="section-about-content">
          <div className="section-about-content-left">
            <iframe
              width="587px"
              height="330px"
              src="https://www.youtube.com/embed/FyDQljKtWnI?si=d2HrLAP0AgQGDfU7"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>

          <div className="section-about-content-right">
            <img src={about} width="587px" height="330px" />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
