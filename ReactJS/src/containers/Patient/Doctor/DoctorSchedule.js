import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleByDateService } from "../../../services/userService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDate: [],
    };
  }

  componentDidMount() {
    this.setArrDate();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  setArrDate = () => {
    let allDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      let dayLabel = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      dayLabel = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
      object.label = dayLabel;
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDate.push(object);
    }

    this.setState({
      allDate: allDate,
    });
  };

  handleOnchangeSelect = async (e) => {
    let doctorId = this.props.doctorId;
    let date = parseInt(e.target.value);

    console.log(doctorId, date);

    let res = await getScheduleByDateService(doctorId, date);
    console.log("=====onchanges", res.data);
  };
  render() {
    let { allDate } = this.state;
    console.log(allDate);
    return (
      <div className="schedule-container">
        <div>
          <select
            className="select-day"
            onChange={(e) => {
              this.handleOnchangeSelect(e);
            }}
          >
            {allDate &&
              allDate.length > 0 &&
              allDate.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>

        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
