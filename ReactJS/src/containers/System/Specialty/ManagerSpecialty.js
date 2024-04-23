import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagerSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils/";
import { createSpecialtyService } from "../../../services/userService";
import { toast } from "react-toastify";

class ManagerSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSpecialty: "",
      descriptionHTML: "",
      descriptionMarkDown: "",
      imageSpecialty: "",

      previewImg: "",
    };
  }
  mdParser = new MarkdownIt();

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  hanldeOnChangeText = (e, name) => {
    let stateCopy = { ...this.state };
    stateCopy[name] = e.target.value;
    // console.log(",e.target.value;", e.target.value);
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeImg = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const url = URL.createObjectURL(file);
      this.setState({
        previewImg: url,
        imageSpecialty: base64,
      });
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkDown: text,
    });
  };

  handleSaveSpecialty = async () => {
    let res = await createSpecialtyService({
      nameSpecialty: this.state.nameSpecialty,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkDown: this.state.descriptionMarkDown,
      imageSpecialty: this.state.imageSpecialty,
    });

    if (res && res.errCode === 0) {
      toast.success("Tạo chuyên khoa thành công!");
      this.setState({
        nameSpecialty: "",
        descriptionHTML: "",
        descriptionMarkDown: "",
        imageSpecialty: "",
        previewImg: "",
      });
    } else {
      toast.error("Tạo chuyên khoa thất bại!");
    }
  };

  render() {
    console.log(this.state.descriptionHTML, this.state.descriptionMarkDown);
    return (
      <>
        <div className="title">
          {/* <FormattedMessage id="manager-user.add" /> */}
          Quản lý chuyên khoa
        </div>
        <div className="bg-manage-specialty-container">
          <div className="content-input-container">
            <div className="content-input">
              <label>Tên chuyên khoa:</label>
              <input
                type="text"
                value={this.state.nameSpecialty}
                onChange={(e) => {
                  this.hanldeOnChangeText(e, "nameSpecialty");
                }}
              />
            </div>
          </div>

          <div className="form-group image">
            <label htmlFor="inputImage">Ảnh chuyên khoa</label>
            <label htmlFor="inputImage" className="file-input-label">
              <i className="fas fa-upload"></i>
            </label>
            <input
              type="file"
              id="inputImage"
              className="form-control-file"
              onChange={(e) => {
                this.handleOnChangeImg(e);
              }}
              style={{ display: "none" }}
            />
            <div
              className="preview-avt"
              style={{
                backgroundImage: `url(${this.state.previewImg})`,
              }}
            ></div>
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
            value={this.state.descriptionMarkDown}
          />
        </div>

        <div className="bg-btn">
          <button
            className="btn-submit"
            onClick={() => {
              this.handleSaveSpecialty();
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSpecialty);
