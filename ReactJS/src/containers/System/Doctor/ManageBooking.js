import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageBooking.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  getListBookingService,
  sendRemedyBookingService,
} from "../../../services/userService";
import RemedyBookingModal from "./RemedyBookingModal";

class ManageBooking extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentDateISO = currentDate.toISOString();
    this.state = {
      currentDate: currentDateISO,
      dataBooking: {},
      isOpenModalRemedy: false,
      dataModalRemedy: {},

      isConfirming: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeDatePicker = (date) => {
    const selectedDate = new Date(date[0]);
    selectedDate.setHours(0, 0, 0, 0);
    const isoDateString = selectedDate.toISOString();
    this.setState(
      {
        currentDate: isoDateString,
      },
      () => {
        this.getDataPatient();
      }
    );
  };

  getDataPatient = async () => {
    let idDoctor = this.props.userInfo.id;
    let date = this.state.currentDate;
    let res = await getListBookingService(idDoctor, date);
    // console.log("data", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataBooking: res.data,
      });
    }
  };

  handleConfirmBooking = async (item) => {
    let data = {
      idDoctor: item.doctorId,
      idPatient: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,

      namePatient: item.patientData.firstName + item.patientData.lastName,
    };

    this.setState({
      isOpenModalRemedy: true,
      dataModalRemedy: data,
    });
    console.log("item", item);
  };

  closeModalBooking = () => {
    this.setState({
      isOpenModalRemedy: false,
      dataModalRemedy: {},
    });
  };

  handleSendRemedy = async (dataFromRemedyModal) => {
    this.setState({ isConfirming: true });
    let res = await sendRemedyBookingService({
      email: dataFromRemedyModal.email,
      imgBase64: dataFromRemedyModal.imgBase64,
      doctorId: this.state.dataModalRemedy.idDoctor,
      patientId: this.state.dataModalRemedy.idPatient,
      timeType: this.state.dataModalRemedy.timeType,

      namePatient: this.state.dataModalRemedy.namePatient,
      language: this.props.language,
    });
    if (res && res.errCode === 0) {
      toast.success("Xác nhận lịch khám thành công!");
      this.setState({
        isOpenModalRemedy: false,
        isConfirming: false,
      });
      await this.getDataPatient();
    } else {
      toast.error("Xác nhận lịch khám thất bại!");
      this.setState({
        isOpenModalRemedy: false,
      });
    }
  };

  render() {
    let { dataBooking } = this.state;
    return (
      <>
        <div className="container-booking">
          <div className="title">Quản lý lịch hẹn khám bệnh</div>
        </div>
        <div className="content-left">
          <label>Chọn ngày</label>
          <DatePicker
            onChange={this.handleOnchangeDatePicker}
            value={this.state.currentDate}
          />
        </div>
        <div className="users-containers">
          <div className="users-tables">
            <table id="customers">
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Trạng thái</th>
                  <th>Họ</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Actions</th>
                </tr>
                {dataBooking &&
                  dataBooking.length > 0 &&
                  dataBooking.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          {item.timeTypeBookingData
                            ? item.timeTypeBookingData.valueVi
                            : ""}
                        </td>
                        <td>
                          {item.statusIdData ? item.statusIdData.valueVi : ""}
                        </td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.lastName}</td>
                        <td>{item.patientData.email}</td>
                        <td>{item.patientData.address}</td>
                        <td>
                          {item.patientData.genderData
                            ? item.patientData.genderData.valueVi
                            : ""}
                        </td>

                        <td className="buttons">
                          <button
                            className="btn-edit"
                            onClick={() => {
                              this.handleConfirmBooking(item);
                            }}
                          >
                            Xác nhận
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <RemedyBookingModal
          dataModalRemedy={this.state.dataModalRemedy}
          isOpenModalRemedy={this.state.isOpenModalRemedy}
          closeModalBooking={this.closeModalBooking}
          handleSendRemedy={this.handleSendRemedy}
          isConfirming={this.state.isConfirming}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
