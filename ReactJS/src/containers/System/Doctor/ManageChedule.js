import React, { Component } from "react";
import { connect } from "react-redux";
class ManageChedule extends Component {
  render() {
    return (
      <>
        <div>ManageChedule</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageChedule);
