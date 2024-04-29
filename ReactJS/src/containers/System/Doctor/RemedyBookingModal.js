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
import "./RemedyBookingModal.scss";
import moment from "moment";
import _ from "lodash";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils/";

class RemedyBookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  componentDidMount() {
    this.setState({
      email: this.props.dataModalRemedy.email,
    });
    // console.log("emailemailemailemail", this.state.email);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModalRemedy != this.props.dataModalRemedy) {
      this.setState({
        email: this.props.dataModalRemedy.email,
      });
    }
  }

  handleOnChangeImg = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendMeredy = () => {
    this.props.handleSendRemedy(this.state);
  };
  render() {
    let { isOpenModalRemedy, closeModalBooking } = this.props;
    return (
      <Modal
        toggle={closeModalBooking}
        isOpen={isOpenModalRemedy}
        className={"custom-modal"}
        centered
      >
        <ModalHeader>Xác nhận lịch khám</ModalHeader>

        <ModalBody>
          <div>
            <FormGroup className="form-group-input">
              <Label for="email">Email bệnh nhân</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup className="form-group-input">
              <Label className="text-file" for="file">
                Gửi file đơn thuốc
              </Label>
              <Input
                type="file"
                name="file"
                id="file"
                onChange={(e) => {
                  this.handleOnChangeImg(e);
                }}
              />
            </FormGroup>
          </div>
        </ModalBody>

        <ModalFooter>
          {this.props.isConfirming ? (
            <div className="loader"></div>
          ) : (
            <>
              <Button
                className="btn-apply"
                onClick={() => this.handleSendMeredy()}
              >
                Xác nhận
              </Button>{" "}
              <Button className="btn-cancel" onClick={closeModalBooking}>
                Trở lại
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyBookingModal);
