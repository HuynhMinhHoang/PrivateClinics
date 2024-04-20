import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  Modal,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      gender: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      bookingFor: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleConfirm = () => {
    console.log("Booking confirmed with data:", this.state);
  };

  render() {
    let { closeModalBooking, isModalBooking, dataTimeParent } = this.props;
    console.log("=====dataTimeParent", dataTimeParent);
    return (
      <>
        <Modal
          isOpen={isModalBooking}
          toggle={""}
          className={"custom-modal"}
          centered
        >
          <ModalHeader toggle={""}>THÔNG TIN ĐẶT LỊCH KHÁM</ModalHeader>
          <ProfileDoctor doctorId={dataTimeParent.doctorId} />

          <ModalBody>
            <div className="row">
              <div className="col-md-6">
                <FormGroup className="form-group-input">
                  <Label for="fullName">Họ và tên</Label>
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={this.state.fullName}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup className="form-group-input">
                  <Label for="gender">Giới tính</Label>
                  <Input
                    type="select"
                    name="gender"
                    id="gender"
                    value={this.state.gender}
                    onChange={this.handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Input>
                </FormGroup>
              </div>
            </div>
            <FormGroup className="form-group-input">
              <Label for="phoneNumber">Số điện thoại</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup className="form-group-input">
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup className="form-group-input">
              <Label for="address">Địa chỉ</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={this.state.address}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup className="form-group-input">
              <Label for="reason">Lý do khám</Label>
              <Input
                type="text"
                name="reason"
                id="reason"
                value={this.state.reason}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup className="form-group-input">
              <Label for="bookingFor">Khám cho ai</Label>
              <Input
                type="text"
                name="bookingFor"
                id="bookingFor"
                value={this.state.bookingFor}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-apply" onClick={this.handleConfirm}>
              Xác nhận
            </Button>{" "}
            <Button className="btn-cancel" onClick={closeModalBooking}>
              Trở lại
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
