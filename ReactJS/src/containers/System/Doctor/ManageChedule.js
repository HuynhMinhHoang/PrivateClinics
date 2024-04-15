import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageChedule.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import FormattedDate from "../../../components/Formating/FormattedDate";
import { toast } from "react-toastify";
import _ from "lodash";
import { dateFormat } from "../../../utils";
import { createScheduleService } from "../../../services/userService";
class ManageChedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDoctor: null,

      listDoctor: [],
      listTime: [],
      currentDate: new Date(),
    };
  }

  componentDidMount() {
    this.props.getAllDoctor();
    this.props.fetchCheduleHours();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listAllDoctor !== this.props.listAllDoctor) {
      let dataSelect = this.dataInputSelect(this.props.listAllDoctor);
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.listHours !== this.props.listHours) {
      let data = this.props.listHours;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        listTime: data,
      });
    }
  }

  dataInputSelect = (inputdata) => {
    let result = [];
    if (inputdata && inputdata.length > 0) {
      inputdata.map((item, index) => {
        let object = {};

        object.value = item.id;
        object.label = `${item.firstName} ${item.lastName}`;
        result.push(object);
      });
    }
    return result;
  };

  handleChangeSelectDoctor = async (selectDoctor) => {
    this.setState({ selectDoctor: selectDoctor });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = (time) => {
    let { listTime } = this.state;
    if (listTime && listTime.length > 0) {
      listTime = listTime.map((item) => {
        if (time.id === item.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });

      this.setState({
        listTime: listTime,
      });
    }
  };

  handleSaveChedule = async () => {
    let result = [];
    let { selectDoctor, listTime, currentDate } = this.state;
    if (!currentDate) {
      toast.error("Vui lòng chọn ngày!");
      return;
    } else if (!selectDoctor && _.isEmpty(currentDate)) {
      toast.error("Vui lòng chọn bác sĩ!");
      return;
    }

    // let formatDate = new Date(currentDate).getTime();
    let selectedTime = [];
    if (listTime && listTime.length > 0) {
      selectedTime = listTime.filter((item) => item.isSelected === true);
    }

    if (selectedTime && selectedTime.length > 0) {
      selectedTime.map((item, index) => {
        let object = {};
        object.doctorId = selectDoctor.value;
        object.date = currentDate;
        object.timeType = item.keyMap;
        // object.maxNumber = "";
        result.push(object);
      });
    }

    let res = await createScheduleService({
      arrSchedule: result,
      doctorId: selectDoctor.value,
      date: currentDate,
    });
    if (res && res.errCode === 0) {
      toast.success("Tạo kế hoạch khám thành công!");
    } else {
      toast.error("Tạo kế hoạch khám thất bại!");
    }
    console.log("result", res);
  };

  render() {
    let { listTime } = this.state;
    // console.log("listTimelistTime", listTime);
    return (
      <>
        <div className="container-chedule">
          <div className="title">Quản lý kế hoạch khám bệnh của bác sĩ</div>
          <div className="bg-input">
            <div className="content-right">
              <label>Chọn Bác sĩ</label>
              <Select
                value={this.state.selectDoctor}
                onChange={this.handleChangeSelectDoctor}
                options={this.state.listDoctor}
                className="select"
              />
            </div>
            <div className="content-left">
              <label>Chọn ngày</label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                minDate={new Date()}
                value={this.state.currentDate}
              />
            </div>
          </div>

          <div className="bg-selectDay">
            <div className="div-hours">
              {listTime &&
                listTime.length > 0 &&
                listTime.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        item.isSelected === true
                          ? "active-hours-item"
                          : "div-hours-item"
                      }
                      onClick={() => {
                        this.handleClickBtnTime(item);
                      }}
                    >
                      {item.valueVi}
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="bg-btn">
            <button
              className="btn-submit"
              onClick={() => {
                this.handleSaveChedule();
              }}
            >
              Lưu thông tin
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    listAllDoctor: state.admin.allDoctor,
    listHours: state.admin.hours,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchCheduleHours: () => dispatch(actions.fetchCheduleHours()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageChedule);
