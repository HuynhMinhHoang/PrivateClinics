import React, { Component } from "react";
import { connect } from "react-redux";
import "./VerifyEmail.scss";
import { verifyBookingPatientService } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");

      let res = await verifyBookingPatientService({
        idToken: token,
        doctorId: doctorId,
      });

      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    return (
      <>
        <HomeHeader />
        <div
          className={
            this.state.statusVerify ? "success-message" : "error-message"
          }
        >
          {this.state.statusVerify
            ? "Xác nhận lịch hẹn thành công!"
            : "Lịch hẹn đã được xác nhận, Vui lòng thử lại!!"}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
