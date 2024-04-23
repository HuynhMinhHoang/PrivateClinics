import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import { getDescriptionSpecialtyByIdService } from "../../../services/userService";

import DetailDoctorInSpeciatly from "../Doctor/DetailDoctorInSpeciatly";
import _ from "lodash";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},

      idSpecialty: "",
      location: "",
      arrDoctorId: "",
      descriptionHTML: "",
    };
  }

  async componentDidMount() {
    let idSpecialty = this.props.match.params.id;
    let location = "ALL";

    let res = await getDescriptionSpecialtyByIdService(idSpecialty, location);

    if (res && res.errCode === 0) {
      let arrDoctorId = res.data.doctorSpecialty.map(
        (doctor) => doctor.doctorId
      );

      this.setState({
        arrDoctorId: arrDoctorId,
        descriptionHTML: res.data.descriptionHTML,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrDoctorId, detailDoctor, descriptionHTML } = this.state;
    console.log("===============", arrDoctorId);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        {descriptionHTML && !_.isEmpty(descriptionHTML) && (
          <div className="bg-descriptionHTML">
            <div
              className="textName-detail-content"
              dangerouslySetInnerHTML={{
                __html: descriptionHTML,
              }}
            ></div>
          </div>
        )}

        {arrDoctorId &&
          arrDoctorId.length > 0 &&
          arrDoctorId.map((item, index) => {
            return (
              <div key={index} className="detail-specialty-container">
                {/* detail-doctor */}
                <div className="bg-content-left">
                  <DetailDoctorInSpeciatly doctorId={item} />
                </div>

                {/* DoctorSchedule-DoctorExtraInfo */}
                <div className="bg-content-right">
                  <DoctorSchedule doctorId={item} />
                  <div className="br"></div>
                  <DoctorExtraInfo doctorId={item} />
                </div>
              </div>
            );
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
