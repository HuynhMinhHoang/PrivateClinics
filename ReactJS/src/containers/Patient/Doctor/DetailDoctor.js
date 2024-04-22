import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctorService } from "../../../services/userService";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import { LANGUAGES } from "../../../utils/constant";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.setState({
        currentDoctorId: this.props.match.params.id,
      });
      let res = await getDetailInfoDoctorService(this.props.match.params.id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let detailDoctor = this.state.detailDoctor;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="container-detail-doctor">
          <div className="bg-content-detail">
            <div className="avt-detail">
              <img
                src={
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                }
              />
            </div>

            <div className="text-detail">
              {detailDoctor &&
                detailDoctor.positionData &&
                detailDoctor.positionData.valueVi && (
                  <div className="textName-detail">
                    {detailDoctor.positionData.valueVi},{" "}
                    {detailDoctor.firstName} {detailDoctor.lastName}
                  </div>
                )}

              {detailDoctor &&
                detailDoctor.MarkDown &&
                detailDoctor.MarkDown.description && (
                  <span>{detailDoctor.MarkDown.description}</span>
                )}
            </div>
          </div>
          {/* schedule */}
          <div className="bg-schedule">
            <div className="content-left">
              <DoctorSchedule
                doctorId={this.state.currentDoctorId}
                nameDoctor={
                  detailDoctor.firstName + " " + detailDoctor.lastName
                }
                languageParent={this.props.language}
              />
            </div>

            <div className="content-right">
              <DoctorExtraInfo doctorId={this.state.currentDoctorId} />
            </div>
          </div>

          <div className="container-detail-content">
            {detailDoctor &&
              detailDoctor.MarkDown &&
              detailDoctor.MarkDown.contentHTML && (
                <div
                  className="textName-detail-content"
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.MarkDown.contentHTML,
                  }}
                ></div>
              )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
