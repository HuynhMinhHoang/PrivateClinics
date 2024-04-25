import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import { getDescriptionClinicByIdService } from "../../../services/userService";
import Select from "react-select";
import DetailDoctorInSpeciatly from "../Doctor/DetailDoctorInSpeciatly";
import _ from "lodash";
import { getAllCodeService } from "../../../services/userService";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},

      idClinic: "",
      arrDoctorId: "",
      descriptionHTML: "",
      nameClinic: " ",
      imageClinic: "",
      addressClinic: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let idClinic = this.props.match.params.id;

      let res = await getDescriptionClinicByIdService(idClinic);

      if (res && res.errCode === 0 && res.data && res.data.doctorClinic) {
        let arrDoctorId = res.data.doctorClinic.map(
          (doctor) => doctor.doctorId
        );

        this.setState({
          arrDoctorId: arrDoctorId,
          descriptionHTML: res.data.descriptionHTML,
          nameClinic: res.data.name,
          imageClinic: res.data.image,
          addressClinic: res.data.address,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let {
      arrDoctorId,
      descriptionHTML,
      nameClinic,
      imageClinic,
      addressClinic,
    } = this.state;

    return (
      <>
        <HomeHeader isShowBanner={false} />

        <div className="bg-container-detail-clinic">
          <div className="bg-banner-clinic">
            <div className="img-clinic">
              <img src={imageClinic} />
            </div>
            <div className="name-clinic">
              <p className="">{nameClinic}</p>
              <p className="">{addressClinic}</p>
            </div>
          </div>

          {descriptionHTML && !_.isEmpty(descriptionHTML) && (
            <>
              <div className="tilte-specialty">
                <div>
                  <p>
                    <i className="fas fa-home"></i>
                  </p>
                  <p>Cơ sở y tế</p>
                </div>
              </div>
              <div className="bg-descriptionHTML">
                <div
                  className="textName-detail-content"
                  dangerouslySetInnerHTML={{
                    __html: descriptionHTML,
                  }}
                ></div>
              </div>
            </>
          )}
          <div className="list-doctor">
            <p>Bác sĩ</p>
            <div></div>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div key={index} className="detail-specialty-container">
                  {/* detail-doctor */}
                  <div className="bg-content-left">
                    <DetailDoctorInSpeciatly
                      doctorId={item}
                      isShowLinkDetailDoctor={true}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
