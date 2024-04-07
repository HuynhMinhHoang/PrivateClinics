import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import banner1 from "../../../assets/specialty/banner2.jpg";
// import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  changeLanguage = (language) => {
    this.props.changeLangugeAppRedux(language);
  };

  render() {
    return (
      <div className="section-specialty">
        <div className="section-content">
          <div className="section-header">
            <span>
              <FormattedMessage id="section.popularSpecialties" />
            </span>
            <button>
              <FormattedMessage id="section.seeMore" />
            </button>
          </div>
          <Slider {...this.props.settings}>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="100%" width="100%" />
                <h3>Cơ xương khớp 1</h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="100%" width="100%" />
                <h3>Cơ xương khớp 1</h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="100%" width="100%" />
                <h3>Cơ xương khớp 1</h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="100%" width="100%" />
                <h3>Cơ xương khớp 1</h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="100%" width="100%" />
                <h3>Cơ xương khớp 5</h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="100%" width="100%" />
                <h3>Cơ xương khớp 6</h3>
              </div>
            </div>
          </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
