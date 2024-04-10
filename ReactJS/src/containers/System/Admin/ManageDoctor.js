import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectDoctor: null,
      description: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  mdParser = new MarkdownIt();

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkdown = () => {
    console.log("===", this.state);
  };

  handleChange = (selectDoctor) => {
    this.setState({ selectDoctor: selectDoctor });
  };

  hanldeOnChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
    // console.log("==", this.state.description);
  };

  render() {
    // console.log("==", this.state.contentHTML);
    // console.log("==", this.state.contentMarkdown);

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
              onChange={this.handleChange}
              options={options}
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
    // listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getAllUsers: () => dispatch(actions.getAllUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
