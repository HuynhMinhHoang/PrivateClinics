import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { LANGUAGES } from "../../utils/constant";
import { FormattedMessage } from "react-intl";

import { changeLanguageApp } from "../../store/actions/";

class HomeHearder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: LANGUAGES.VI,
    };
  }

  changeLanguage = (language) => {
    this.props.changeLangugeAppRedux(language);
    this.setState({ selectedLanguage: language });
  };

  render() {
    const { selectedLanguage } = this.state;

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars menu"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <b>
                  <FormattedMessage id="homeheader.speciality" />
                </b>

                <div>
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>

              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.facilities" />
                  </b>
                </div>

                <div>
                  <FormattedMessage id="homeheader.chooseHospitalOrClinic" />
                </div>
              </div>

              <div className="child-content">
                <b>
                  <FormattedMessage id="homeheader.doctor" />
                </b>

                <div>
                  <FormattedMessage id="homeheader.chooseGoodDoctor" />
                </div>
              </div>

              <div className="child-content">
                <b>
                  <FormattedMessage id="homeheader.examination" />
                </b>

                <div>
                  <FormattedMessage id="homeheader.generalHealth" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={`flag ${
                  selectedLanguage === LANGUAGES.VI ? "active" : ""
                }`}
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={`flag ${
                  selectedLanguage === LANGUAGES.EN ? "active" : ""
                }`}
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">
              <FormattedMessage id="section.medicalBackground" />
            </div>
            <div className="title2">
              <FormattedMessage id="section.comprehensiveHealthCare" />
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Please enter search..." />
            </div>
          </div>

          <div className="content-down">
            <div className="options">
              <div className="options-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="section.specialistExamination" />
                </div>
              </div>

              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-phone-volume"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="section.remoteExamination" />
                </div>
              </div>

              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-book"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="section.generalExamination" />
                </div>
              </div>

              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-syringe"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="section.medicalTests" />
                </div>
              </div>

              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-universal-access"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="section.mentalHealth" />
                </div>
              </div>

              <div className="options-child">
                <div className="icon-child">
                  <i class="fas fa-bed"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="section.dentalExamination" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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
  return {
    changeLangugeAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHearder);
