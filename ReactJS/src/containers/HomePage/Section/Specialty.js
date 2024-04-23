import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import banner1 from "../../../assets/specialty/banner2.jpg";
import { getSpecialtyHomeService } from "../../../services/userService";
import { Redirect, withRouter } from "react-router-dom";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getSpecialtyHomeService();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
  }

  changeLanguage = (language) => {
    this.props.changeLangugeAppRedux(language);
  };

  handleViewDetailSpecialty = (idSpecialty) => {
    this.props.history.push(`/detail-specialty/${idSpecialty}`);
  };

  render() {
    let { dataSpecialty } = this.state;
    console.log("====dataSpecialty", this.state.dataSpecialty);
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
            {dataSpecialty &&
              dataSpecialty.length > 0 &&
              dataSpecialty.map((item, index) => {
                return (
                  <div className="img-customize">
                    <div
                      className="item-customize"
                      onClick={() => {
                        this.handleViewDetailSpecialty(item.id);
                      }}
                    >
                      <img src={item.image} height="100%" width="100%" />
                      <h3>{item.name}</h3>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
