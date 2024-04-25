import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageBooking.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import { getListBookingService } from "../../../services/userService";

class ManageBooking extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentDateISO = currentDate.toISOString();
    this.state = { currentDate: currentDateISO, dataBooking: {} };
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
    console.log("data", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataBooking: res.data,
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
                  <th>Email</th>
                  <th>Họ</th>
                  <th>Tên</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Actions</th>
                </tr>
                {dataBooking &&
                  dataBooking.length > 0 &&
                  dataBooking.map((item, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>
                            {item.timeTypeBookingData
                              ? item.timeTypeBookingData.valueVi
                              : ""}
                          </td>
                          <td>{item.patientData.email}</td>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.lastName}</td>
                          <td>{item.patientData.address}</td>
                          <td>
                            {item.patientData.genderData
                              ? item.patientData.genderData.valueVi
                              : ""}
                          </td>

                          <td className="buttons">
                            <button className="btn-edit" onClick={() => {}}>
                              Xác nhận
                            </button>
                            <button className="btn-delete" onClick={() => {}}>
                              Gửi mail
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
