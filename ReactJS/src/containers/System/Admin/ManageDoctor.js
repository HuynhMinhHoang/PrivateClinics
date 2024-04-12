import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectDoctor: null,
      description: "",

      listDoctor: [],
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
      contentMarkdown: text,
    });
    console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkdown = () => {
    let checkInput = this.checkValidateInput();
    if (checkInput === false) return;
    this.props.saveInfoDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkDown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectDoctor.value,
    });
    console.log("===", this.state);
  };

  checkValidateInput = () => {
    let flag = true;
    const arrCheck = ["selectDoctor", "description", "contentMarkdown"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        flag = false;
        alert("Vui lòng điền thông tin " + arrCheck[i] + "!");
        break;
      }
    }
    return flag;
  };

  handleChangeSelectDoctor = (selectDoctor) => {
    this.setState({ selectDoctor: selectDoctor });
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
    console.log("all", this.state);
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
          />
        </div>

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
