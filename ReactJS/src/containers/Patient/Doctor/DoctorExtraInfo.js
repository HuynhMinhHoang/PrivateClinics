import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { getDoctorExtraInfoService } from "../../../services/userService";
import NumberFormat from "react-number-format";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      listExtraInfo: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorId) {
      let res = await getDoctorExtraInfoService(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          listExtraInfo: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId != prevProps.doctorId) {
      let res = await getDoctorExtraInfoService(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          listExtraInfo: res.data,
        });
      }
    }
  }

  handleClickOpenDetail = (status) => {
    this.setState({
      isShowDetailInfo: !status,
    });
  };

  render() {
    let { isShowDetailInfo, listExtraInfo } = this.state;
    // console.log("Dataaaaaaaaaa listExtraInfo", listExtraInfo);
    return (
      <>
        <div className="doctorextra-container">
          <div className="title-address-clinic">ĐỊA CHỈ KHÁM</div>
          <div className="address-clinic">
            Bệnh viện -{" "}
            {listExtraInfo && listExtraInfo.nameClinic
              ? listExtraInfo.nameClinic
              : ""}
          </div>
          <div className="address-detail">
            {listExtraInfo && listExtraInfo.addressClinic
              ? listExtraInfo.addressClinic
              : ""}
          </div>
          <div className="br-text"></div>
          <div>
            <div className="price">
              GIÁ KHÁM:{" "}
              {isShowDetailInfo === false && (
                <>
                  <span>
                    <NumberFormat
                      value={
                        listExtraInfo &&
                        listExtraInfo.priceTypeData &&
                        listExtraInfo.priceTypeData.valueVi
                          ? listExtraInfo.priceTypeData.valueVi
                          : ""
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"đ"}
                    />
                  </span>
                </>
              )}
              <span
                className="open-detail"
                onClick={() => {
                  this.handleClickOpenDetail(isShowDetailInfo);
                }}
              >
                {isShowDetailInfo === false ? "Xem" : "Ẩn"} chi tiết
              </span>
            </div>
            {isShowDetailInfo === true && (
              <>
                <div className="table-detail">
                  <div className="bg-text-detail-up">
                    <div>
                      {listExtraInfo && listExtraInfo.note
                        ? listExtraInfo.note
                        : ""}
                    </div>
                    <div>
                      <NumberFormat
                        value={
                          listExtraInfo &&
                          listExtraInfo.priceTypeData &&
                          listExtraInfo.priceTypeData.valueVi
                            ? listExtraInfo.priceTypeData.valueVi
                            : ""
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"đ"}
                      />
                    </div>
                  </div>

                  <div className="bg-text-detail-down">
                    Bệnh viện có các hình thức thanh toán:{" "}
                    {listExtraInfo && listExtraInfo.paymentTypeData
                      ? listExtraInfo.paymentTypeData.valueVi
                      : ""}
                  </div>
                </div>
                {/* <div
                  className="close-detail"
                  onClick={() => {
                    this.handleClickOpenDetail(false);
                  }}
                >
                  Ẩn bảng giá
                </div> */}
              </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
