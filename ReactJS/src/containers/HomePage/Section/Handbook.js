import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Handbook.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import banner1 from "../../../assets/medical-facility/banner1.jpg";
// import "slick-carousel/slick/slick-theme.css";

class Handbook extends Component {
  changeLanguage = (language) => {
    this.props.changeLangugeAppRedux(language);
  };

  render() {
    return (
      <div className="section-handbook">
        {/* <div className="color-gradient-up"></div> */}
        <div className="section-content">
          <div className="section-header">
            <span>Cẩm nang</span>
            {/* <button>Xem thêm</button> */}
          </div>
          <Slider {...this.props.settings}>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="60%" width="60%" />
                <h3>
                  Chuyên gia Tư vấn Tâm lý hôn nhân gia đình online uy tín
                </h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="60%" width="60%" />
                <h3>Hệ thống y tế 1</h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="60%" width="60%" />
                <h3>Hệ thống y tế 1</h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="60%" width="60%" />
                <h3>Hệ thống y tế 1</h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="60%" width="60%" />
                <h3>Hệ thống y tế 1</h3>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="60%" width="60%" />
                <h3>Hệ thống y tế 1</h3>
              </div>
            </div>
          </Slider>
        </div>
        {/* <div className="color-gradient-down"></div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
