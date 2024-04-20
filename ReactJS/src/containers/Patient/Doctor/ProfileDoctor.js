import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorService } from "../../../services/userService";
import NumberFormat from "react-number-format";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorInfo: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      doctorInfo: data,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInfoDoctor(this.props.doctorId);
    }
  }

  getInfoDoctor = async (idDoctor) => {
    let result = {};
    let res = await getProfileDoctorService(idDoctor);
    if (res && res.errCode === 0) {
      result = res.data;
    }
    return result;
  };

  render() {
    let { doctorInfo } = this.state;
    console.log("==============doctorInfodoctorInfo", doctorInfo);

    return (
      <>
        <div className="bg-content-detail">
          <div className="avt-detail">
            <img src={doctorInfo && doctorInfo.image ? doctorInfo.image : ""} />
          </div>

          <div className="text-detail">
            {doctorInfo &&
              doctorInfo.positionData &&
              doctorInfo.positionData.valueVi && (
                <div className="textName-detail">
                  {doctorInfo.positionData.valueVi}, {doctorInfo.firstName}{" "}
                  {doctorInfo.lastName}
                </div>
              )}
          </div>

          <div className="price-modal">
            Giá khám:
            <span className="price">
              <NumberFormat
                value={
                  doctorInfo.Doctor_Info &&
                  doctorInfo.Doctor_Info.priceTypeData &&
                  doctorInfo.Doctor_Info.priceTypeData.valueVi
                    ? doctorInfo.Doctor_Info.priceTypeData.valueVi
                    : ""
                }
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            </span>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
