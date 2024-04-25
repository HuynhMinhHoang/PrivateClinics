import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import banner1 from "../../../assets/medical-facility/banner1.jpg";
import { getClinicHomeService } from "../../../services/userService";
import { Redirect, withRouter } from "react-router-dom";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }

  async componentDidMount() {
    let res = await getClinicHomeService();
    // console.log("====res", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data,
      });
    }
  }
  changeLanguage = (language) => {
    this.props.changeLangugeAppRedux(language);
  };

  handleViewDetailClinic = (idClinic) => {
    this.props.history.push(`/detail-clinic/${idClinic}`);
  };

  render() {
    let { dataClinic } = this.state;
    console.log("====dataClinic", this.state.dataClinic);
    return (
      <div className="section-medical-facility">
        {/* <div className="color-gradient-up"></div> */}
        <div className="section-content">
          <div className="section-header">
            <span>Cơ sở y tế nổi bật</span>
            <button>Xem thêm</button>
          </div>
          <Slider {...this.props.settings}>
            {dataClinic &&
              dataClinic.length > 0 &&
              dataClinic.map((item, index) => {
                return (
                  <div className="img-customize">
                    <div
                      className="item-customize"
                      onClick={() => {
                        this.handleViewDetailClinic(item.id);
                      }}
                    >
                      <div className="imgDoctor">
                        <img src={item.image} />
                      </div>
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                );
              })}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
