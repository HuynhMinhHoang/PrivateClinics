import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import banner1 from "../../../assets/outstanding-doctor/doctor1.jpg";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils/";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  async componentDidMount() {
    this.props.fetchTopDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorArr !== this.props.topDoctorArr) {
      this.setState({
        arrDoctors: this.props.topDoctorArr,
      });
    }
  }

  changeLanguage = (language) => {
    this.props.changeLangugeAppRedux(language);
  };

  render() {
    let topDoctorList = this.state.arrDoctors;
    let language = this.props.language;
    // console.log(topDoctorList);
    return (
      <div className="section-outstandingdoctor">
        <div className="color-gradient"></div>
        <div className="section-content">
          <div className="section-header">
            <span>
    
              <FormattedMessage id="section.outstandingDoctorsOfTheWeek" />
            </span>
            <button>
              <FormattedMessage id="section.seeMore" />
            </button>
          </div>
          <Slider {...this.props.settings}>
            {topDoctorList &&
              topDoctorList.length > 0 &&
              topDoctorList.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div className="img-customize" key={index}>
                    <div className="item-customize">
                      <div className="imgDoctor">
                        <img src={imageBase64} />
                      </div>
                      <h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                      <h5>Khoa xương khớp</h5>
                    </div>
                  </div>
                );
              })}
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
    topDoctorArr: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
