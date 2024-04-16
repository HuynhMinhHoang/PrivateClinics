import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctorService } from "../../../services/userService";
import DoctorSchedule from "./DoctorSchedule";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
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
    console.log(detailDoctor);
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
              <DoctorSchedule doctorId={detailDoctor.id} />
            </div>

            <div className="content-right">right</div>
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
    // isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
