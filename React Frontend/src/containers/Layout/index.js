import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
  fetchBarstoolSportData,
  fetchHockeyData
} from "../../helpers/requests";

import BoxScore from "../BoxScore";

import css from "./Layout.scss";

class Layout extends Component {
  state = {
    basketballData: {},
    soccerData: {},
    hockeyData: {}
  };

  async componentDidMount() {
    const basketballData = await fetchBarstoolSportData("basketball");
    const soccerData = await fetchBarstoolSportData("soccer");
    const hockeyData = await fetchHockeyData();

    this.setState({ basketballData, soccerData, hockeyData });
  }

  render() {
    const { basketballData, soccerData, hockeyData } = this.state;
    return (
      <Fragment>
        <BoxScore sport="basketball" data={basketballData} />
        <BoxScore sport="soccer" data={soccerData} />
        <BoxScore sport="hockey" data={hockeyData} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

// Condensed version of MDTP
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
