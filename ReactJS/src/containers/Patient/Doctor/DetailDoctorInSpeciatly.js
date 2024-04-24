import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDoctorInSpeciatly.scss";
import * as actions from "../../../store/actions";
import { getDetailInfoDoctorService } from "../../../services/userService";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
class DetailDoctorInSpeciatly extends Component {
  constructor(props) {
    super(props);
    this.state = { detailDoctor: {} };
  }

  async componentDidMount() {
    let res = await getDetailInfoDoctorService(this.props.doctorId);
    if (res && res.errCode === 0) {
      this.setState({
        detailDoctor: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId != prevProps.doctorId) {
      let res = await getDetailInfoDoctorService(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  render() {
    let { detailDoctor } = this.state;
    // console.log("0000000000", detailDoctor);
    return (
      <>
        <div className="bg-content-detail">
          <div className="avt-detail">
            <img
              src={detailDoctor && detailDoctor.image ? detailDoctor.image : ""}
            />
            <div className="view-detail-doctor">
              <Link to={`/detail-doctor/${detailDoctor.id}`}>Xem thêm</Link>
            </div>
          </div>

          <div className="text-detail">
            {detailDoctor &&
              detailDoctor.positionData &&
              detailDoctor.positionData.valueVi && (
                <div className="textName-detail">
                  {detailDoctor.positionData.valueVi}, {detailDoctor.firstName}{" "}
                  {detailDoctor.lastName}
                </div>
              )}

            {detailDoctor &&
              detailDoctor.MarkDown &&
              detailDoctor.MarkDown.description && (
                <span>{detailDoctor.MarkDown.description}</span>
              )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailDoctorInSpeciatly);
