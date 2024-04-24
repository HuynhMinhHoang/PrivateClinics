import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import { getDescriptionSpecialtyByIdService } from "../../../services/userService";
import Select from "react-select";
import DetailDoctorInSpeciatly from "../Doctor/DetailDoctorInSpeciatly";
import _ from "lodash";
import { getAllCodeService } from "../../../services/userService";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},

      idSpecialty: "",
      location: "",
      arrDoctorId: "",
      descriptionHTML: "",
      nameSpecialty: " ",

      listProvince: [],
      selectProvince: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let idSpecialty = this.props.match.params.id;

      let resProvince = await getAllCodeService("PROVINCE");
      let res = await getDescriptionSpecialtyByIdService(idSpecialty, "ALL");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let arrDoctorId = res.data.doctorSpecialty.map(
          (doctor) => doctor.doctorId
        );

        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc",
          });
        }
        this.setState({
          arrDoctorId: arrDoctorId,
          descriptionHTML: res.data.descriptionHTML,
          nameSpecialty: res.data.name,
          listProvince: dataProvince,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleChangeSelectOptions = async (e) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let idSpecialty = this.props.match.params.id;

      let res = await getDescriptionSpecialtyByIdService(
        idSpecialty,
        e.target.value
      );

      if (res && res.errCode === 0) {
        let arrDoctorId = res.data.doctorSpecialty.map(
          (doctor) => doctor.doctorId
        );

        this.setState({
          arrDoctorId: arrDoctorId,
          descriptionHTML: res.data.descriptionHTML,
          nameSpecialty: res.data.name,
          selectProvince: e.target.value,
        });
      }
    }
  };

  render() {
    let {
      arrDoctorId,
      detailDoctor,
      descriptionHTML,
      nameSpecialty,
      selectProvince,
      listProvince,
    } = this.state;

    console.log("===============selectProvince", listProvince);
    return (
      <>
        <HomeHeader isShowBanner={false} />

        <div className="bg-container-detail-specialty">
          {descriptionHTML && !_.isEmpty(descriptionHTML) && (
            <>
              <div className="tilte-specialty">
                <div>
                  <p>
                    <i className="fas fa-home"></i>
                  </p>
                  <p>Khám chuyên khoa</p>
                </div>
                <p className="text-tilte-specialty">{nameSpecialty}</p>
              </div>
              <div className="bg-descriptionHTML">
                <div
                  className="textName-detail-content"
                  dangerouslySetInnerHTML={{
                    __html: descriptionHTML,
                  }}
                ></div>
              </div>

              <div className="search-province">
                <select
                  onChange={(e) => {
                    this.handleChangeSelectOptions(e);
                  }}
                >
                  {listProvince &&
                    listProvince.length > 0 &&
                    listProvince.map((item, index) => {
                      return (
                        <>
                          <option key={index} value={item.keyMap}>
                            {item.valueVi}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
            </>
          )}

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
