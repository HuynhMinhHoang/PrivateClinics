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

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkDown: "",
      selectDoctor: null,
      description: "",

      listDoctor: [],

      isBtnSave: true,
      action: true,
    };
  }

  componentDidMount() {
    this.props.getAllDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listAllDoctor !== this.props.listAllDoctor) {
      let dataSelect = this.dataInputSelect(this.props.listAllDoctor);
      this.setState({
        listDoctor: dataSelect,
      });
    }
  }

  mdParser = new MarkdownIt();

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkDown: text,
    });
    console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkdown = () => {
    let checkInput = this.checkValidateInput();
    let { isBtnSave } = this.state;
    if (checkInput === false) return;
    this.props
      .saveInfoDoctor({
        contentHTML: this.state.contentHTML,
        contentMarkDown: this.state.contentMarkDown,
        description: this.state.description,
        doctorId: this.state.selectDoctor.value,
        action: isBtnSave === true ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT,
      })
      .then(() => {
        this.setState({
          contentHTML: "",
          contentMarkDown: "",
          selectDoctor: null,
          description: "",
        });
      });
    console.log("===", this.props.saveInfoDoctor);
  };

  checkValidateInput = () => {
    let flag = true;
    const arrCheck = ["selectDoctor", "description", "contentMarkDown"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        flag = false;
        alert("Vui lòng điền thông tin " + arrCheck[i] + "!");
        break;
      }
    }
    return flag;
  };

  handleChangeSelectDoctor = async (selectDoctor) => {
    this.setState({ selectDoctor: selectDoctor });
    let res = await getDetailInfoDoctorService(selectDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.MarkDown) {
      console.log("=============", res.data);
      let markDown = res.data.MarkDown;
      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkDown: markDown.contentMarkDown,
        description: markDown.description,
        isBtnSave: false,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkDown: "",
        description: "",
        isBtnSave: true,
        action: false,
      });
    }
  };

  hanldeOnChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

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

  render() {
    let { isBtnSave } = this.state;
    console.log("all", this.state.description);
    console.log("all==", this.state.contentMarkDown);
    return (
      <>
        <div className="title">
          {/* <FormattedMessage id="manager-user.add" /> */}
          Thêm thông tin Bác sĩ
        </div>
        <div className="content-containers">
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
            <label>Thông tin giới thiệu:</label>
            <textarea
              value={this.state.description}
              onChange={(e) => {
                this.hanldeOnChangeDescription(e);
              }}
            ></textarea>
          </div>
        </div>

        <div className="editor">
          <MdEditor
            style={{ height: "500px", border: "2px solid gray" }}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
