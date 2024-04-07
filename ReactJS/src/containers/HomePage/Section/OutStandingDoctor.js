import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import banner1 from "../../../assets/outstanding-doctor/doctor1.jpg";
// import "slick-carousel/slick/slick-theme.css";

class OutStandingDoctor extends Component {
  changeLanguage = (language) => {
    this.props.changeLangugeAppRedux(language);
  };

  render() {
    return (
      <div className="section-outstandingdoctor">
        <div className="color-gradient"></div>
        <div className="section-content">
          <div className="section-header">
            <span>Bác sĩ nổi bật tuần qua</span>
            <button>Xem thêm</button>
          </div>
          <Slider {...this.props.settings}>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="50%" width="50%" />
                <h3>Giáo sư, tiến sĩ HoangDev</h3>
                <h5>Khoa xương khớp</h5>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="50%" width="50%" />
                <h3>Giáo sư, tiến sĩ HoangDev</h3>
                <h5>Khoa xương khớp</h5>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="50%" width="50%" />
                <h3>Giáo sư, tiến sĩ HoangDev</h3>
                <h5>Khoa xương khớp</h5>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="50%" width="50%" />
                <h3>Giáo sư, tiến sĩ HoangDev</h3>
                <h5>Khoa xương khớp</h5>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="50%" width="50%" />
                <h3>Giáo sư, tiến sĩ HoangDev</h3>
                <h5>Khoa xương khớp</h5>
              </div>
            </div>
            <div className="img-customize">
              <div className="item-customize">
                <img src={banner1} height="50%" width="50%" />
                <h3>Giáo sư, tiến sĩ HoangDev</h3>
                <h5>Khoa xương khớp</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
