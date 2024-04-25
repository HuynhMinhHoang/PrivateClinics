import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInfoDoctorService } from "../../../services/userService";
import { CRUD_ACTIONS } from "../../../utils/constant";
import NumberFormat from "react-number-format";

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //markdown
      contentHTML: "",
      contentMarkDown: "",
      selectDoctor: null,
      description: "",

      //doctor_info
      listDoctor: [],
      listPrice: [],
      selectPrice: "",
      listPayment: [],
      selectPayment: "",
      listProvince: [],
      selectProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",

      listClinic: "",
      selectedClinic: "",
      listSpecialty: "",
      selectedSpecialty: "",

      isBtnSave: true,
      action: true,
    };
  }

  componentDidMount() {
    this.props.getAllDoctor();
    this.props.fetchDoctorInfoPrive();
    this.props.fetchDoctorInfoPayment();
    this.props.fetchDoctorInfoProvine();
    this.props.fetchSpecialty();
    this.props.fetchClinic();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listAllDoctor !== this.props.listAllDoctor) {
      let dataSelect = this.dataInputSelect(
        this.props.listAllDoctor,
        "ALLDOCTOR"
      );
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.listDoctorInfoPrice !== this.props.listDoctorInfoPrice) {
      let dataSelect = this.dataInputSelect(
        this.props.listDoctorInfoPrice,
        "PRICE"
      );
      // console.log("========", dataSelect);
      this.setState({
        listPrice: dataSelect,
      });
    }

    if (prevProps.listDoctorInfoPayment !== this.props.listDoctorInfoPayment) {
      let dataSelect = this.dataInputSelect(
        this.props.listDoctorInfoPayment,
        "PAYMENT"
      );
      this.setState({
        listPayment: dataSelect,
      });
    }

    if (
      prevProps.listDoctorInfoProvince !== this.props.listDoctorInfoProvince
    ) {
      let dataSelect = this.dataInputSelect(
        this.props.listDoctorInfoProvince,
        "PROVINCE"
      );
      this.setState({
        listProvince: dataSelect,
      });
    }

    if (prevProps.listSpecialtyRedux !== this.props.listSpecialtyRedux) {
      let dataSelect = this.dataInputSelect(
        this.props.listSpecialtyRedux,
        "SPECIALTY"
      );
      // console.log("========", dataSelect);
      this.setState({
        listSpecialty: dataSelect,
      });
    }

    if (prevProps.listClinicRedux !== this.props.listClinicRedux) {
      let dataSelect = this.dataInputSelect(
        this.props.listClinicRedux,
        "CLINIC"
      );
      // console.log("========listCliniclistCliniclistClinic", dataSelect);
      this.setState({
        listClinic: dataSelect,
      });
    }
  }

  dataInputSelect = (inputdata, type) => {
    let result = [];
    if (inputdata && inputdata.length > 0) {
      if (type === "ALLDOCTOR") {
        inputdata.map((item, index) => {
          let object = {};
          object.value = item.id;
          object.label = `${item.firstName} ${item.lastName}`;
          result.push(object);
        });
      }

      if (type === "PRICE") {
        inputdata.map((item, index) => {
          let object = {};
          object.value = item.keyMap;
          object.label = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.valueVi);
          result.push(object);
        });
      }

      if (type === "PAYMENT" || type === "PROVINCE") {
        inputdata.map((item, index) => {
          let object = {};
          object.value = item.keyMap;
          object.label = `${item.valueVi}`;
          result.push(object);
        });
      }

      if (type === "SPECIALTY") {
        inputdata.map((item, index) => {
          let object = {};
          object.value = item.id;
          object.label = item.name;
          result.push(object);
        });
      }

      if (type === "CLINIC") {
        inputdata.map((item, index) => {
          let object = {};
          object.value = item.id;
          object.label = item.name;
          result.push(object);
        });
      }
    }
    return result;
  };

  mdParser = new MarkdownIt();

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkDown: text,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkdown = () => {
    let checkInput = this.checkValidateInput();
    let { isBtnSave } = this.state;
    if (checkInput === false) return;
    this.props
      .saveInfoDoctor({
        //save markdown
        contentHTML: this.state.contentHTML,
        contentMarkDown: this.state.contentMarkDown,
        description: this.state.description,
        doctorId: this.state.selectDoctor.value,
        action: isBtnSave === true ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT,

        //save dotor_info
        selectPrice: this.state.selectPrice.value,
        selectPayment: this.state.selectPayment.value,
        selectProvince: this.state.selectProvince.value,
        nameClinic: this.state.nameClinic,
        addressClinic: this.state.addressClinic,
        note: this.state.note,

        //save specialty
        selectedSpecialty: this.state.selectedSpecialty.value,

        //save clinic
        selectedClinic: this.state.selectedClinic.value,
      })
      .then(() => {
        this.setState({
          contentHTML: "",
          contentMarkDown: "",
          selectDoctor: null,
          description: "",
          nameClinic: "",
          addressClinic: "",
          note: "",
          selectPayment: "",
          selectProvince: "",
          selectPrice: "",

          selectedSpecialty: "",
          selectedClinic: "",
        });
      });
    // console.log("===", this.props.saveInfoDoctor);
  };

  checkValidateInput = () => {
    let flag = true;
    const arrCheck = [
      "selectDoctor",
      "description",
      "contentMarkDown",
      "selectPrice",
      "selectPayment",
      "selectProvince",
      "nameClinic",
      "addressClinic",
      "note",
      "selectedSpecialty",
      "selectedClinic",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        flag = false;
        alert("Vui lòng điền thông tin " + arrCheck[i] + "!");
        break;
      }
    }
    return flag;
  };

  handleChangeSelect = async (selectDoctor) => {
    this.setState({ selectDoctor: selectDoctor });
    let res = await getDetailInfoDoctorService(selectDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.MarkDown) {
      console.log("=============", res.data);
      let markDown = res.data.MarkDown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        provinceId = "",
        priceId = "",
        selectedSpecialty = "",
        specialtyId = "",
        selectedClinic = "",
        clinicId = "";

      if (res && res.data && res.data.Doctor_Info) {
        nameClinic = res.data.Doctor_Info.nameClinic;
        addressClinic = res.data.Doctor_Info.addressClinic;
        note = res.data.Doctor_Info.note;
        paymentId = {
          value: res.data.Doctor_Info.paymentId,
          label: res.data.Doctor_Info.paymentTypeData.valueVi,
        };
        provinceId = {
          value: res.data.Doctor_Info.provinceId,
          label: res.data.Doctor_Info.provinceTypeData.valueVi,
        };
        priceId = {
          value: res.data.Doctor_Info.priceId,
          label: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(res.data.Doctor_Info.priceTypeData.valueVi),
        };

        specialtyId = res.data.Doctor_Info.specialtyId;

        selectedSpecialty = this.state.listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });

        clinicId = res.data.Doctor_Info.clinicId;

        selectedClinic = this.state.listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }

      this.setState({
        //markdown
        contentHTML: markDown.contentHTML,
        contentMarkDown: markDown.contentMarkDown,
        description: markDown.description,
        isBtnSave: false,

        //doctor-info
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note: note,
        selectPayment: paymentId,
        selectProvince: provinceId,
        selectPrice: priceId,

        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkDown: "",
        description: "",

        nameClinic: "",
        addressClinic: "",
        note: "",
        selectPayment: "",
        selectProvince: "",
        selectPrice: "",
        isBtnSave: true,
        action: false,

        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };

  handleChangeSelectOptions = async (selectedOptions, name) => {
    // console.log("selectedoptions", selectedOptions);
    // console.log("name", name);
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOptions;
    this.setState({
      ...stateCopy,
    });
  };

  hanldeOnChangeText = (e, name) => {
    let stateCopy = { ...this.state };
    stateCopy[name] = e.target.value;
    // console.log(",e.target.value;", e.target.value);
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { isBtnSave, listSpecialty, listClinic } = this.state;
    let { listDoctorInfoPrice, listDoctorInfoPayment, listDoctorInfoProvince } =
      this.props;
    // console.log("listClinic============", this.state.selectedClinic);
    return (
      <>
        <div className="title">
          {/* <FormattedMessage id="manager-user.add" /> */}
          Thêm thông tin Bác sĩ
        </div>
        <div className="content-containers">
          <div className="content-right">
            <label>Chọn Bác sĩ:</label>
            <Select
              value={this.state.selectDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctor}
              placeholder={"Chọn tên bác sĩ"}
              className="select"
            />
          </div>
          <div className="content-left">
            <label>Thông tin giới thiệu:</label>
            <textarea
              value={this.state.description}
              onChange={(e) => {
                this.hanldeOnChangeText(e, "description");
              }}
            ></textarea>
          </div>
        </div>

        <div className="content-containers">
          <div className="content-right">
            <label>Chọn phòng khám:</label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectOptions}
              options={listClinic}
              placeholder={"Chọn tên phòng khám"}
              className="select"
              name="selectedClinic"
            />
          </div>

          <div className="content-right">
            <label>Chọn Chuyên khoa:</label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectOptions}
              options={listSpecialty}
              placeholder={"Chọn tên chuyên khoa"}
              className="select"
              name="selectedSpecialty"
            />
          </div>
        </div>

        <div className="content-input-container">
          <div className="content-input-select">
            <label>Chọn giá:</label>

            <Select
              value={this.state.selectPrice}
              onChange={this.handleChangeSelectOptions}
              name="selectPrice"
              options={this.state.listPrice}
              placeholder={"Chọn giá"}
              className="select"
            />
          </div>
          <div className="content-input-select">
            <label>Chọn phương thức thanh toán:</label>
            <Select
              value={this.state.selectPayment}
              onChange={this.handleChangeSelectOptions}
              name="selectPayment"
              options={this.state.listPayment}
              placeholder={"Chọn phương thức"}
              className="select"
            />
          </div>
          <div className="content-input-select">
            <label>Chọn tỉnh thành:</label>
            <Select
              value={this.state.selectProvince}
              onChange={this.handleChangeSelectOptions}
              name="selectProvince"
              options={this.state.listProvince}
              placeholder={"Chọn tỉnh thành"}
              className="select"
            />
          </div>
        </div>

        <div className="content-input-container">
          <div className="content-input">
            <label>Tên phòng khám:</label>
            <input
              value={this.state.nameClinic}
              onChange={(e) => {
                this.hanldeOnChangeText(e, "nameClinic");
              }}
            />
          </div>
          <div className="content-input">
            <label>Địa chỉ phòng khám:</label>
            <input
              value={this.state.addressClinic}
              onChange={(e) => {
                this.hanldeOnChangeText(e, "addressClinic");
              }}
            />
          </div>
          <div className="content-input">
            <label>Ghi chú:</label>
            <input
              value={this.state.note}
              onChange={(e) => {
                this.hanldeOnChangeText(e, "note");
              }}
            />
          </div>
        </div>

        <div className="editor">
          <MdEditor
            style={{
              height: "500px",
              border: "0.5px solid rgb(204, 204, 204)",
            }}
            renderHTML={(text) => this.mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkDown}
          />
        </div>
        {isBtnSave === true ? (
          <div className="bg-btn">
            <button
              className="btn-submit"
              onClick={() => {
                this.handleSaveContentMarkdown();
              }}
            >
              Lưu thông tin
            </button>
          </div>
        ) : (
          <div className="bg-btn ">
            <button
              className="btn-submit btnUpdate"
              onClick={() => {
                this.handleSaveContentMarkdown();
              }}
            >
              Cập nhật thông tin
            </button>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listAllDoctor: state.admin.allDoctor,
    listDoctorInfoPrice: state.admin.price,
    listDoctorInfoPayment: state.admin.payment,
    listDoctorInfoProvince: state.admin.province,
    listSpecialtyRedux: state.admin.specialty,
    listClinicRedux: state.admin.clinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),

    fetchDoctorInfoPrive: () => dispatch(actions.fetchDoctorInfoPrive()),
    fetchDoctorInfoPayment: () => dispatch(actions.fetchDoctorInfoPayment()),
    fetchDoctorInfoProvine: () => dispatch(actions.fetchDoctorInfoProvine()),
    fetchSpecialty: () => dispatch(actions.fetchSpecialty()),
    fetchClinic: () => dispatch(actions.fetchClinic()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
