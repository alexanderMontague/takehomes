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
        {/* <BoxScore sport="hockey" data={hockeyData} /> */}

        {/* <div className={css.boxscore}>
          <div
            className={[css.boxscore__team, css["boxscore__team--header"]].join(
              " "
            )}
          >
            <label />
            <div className={css.boxscore__team__units}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
            </div>
            <div className={css.boxscore__team__results}>
              <span>R</span>
              <span>H</span>
              <span>E</span>
            </div>
          </div>
          <div
            className={[css.boxscore__team, css["boxscore__team--away"]].join(
              " "
            )}
          >
            <label>CHC</label>
            <div className={css.boxscore__team__units}>
              <span>1</span>
              <span>0</span>
              <span>2</span>
              <span>0</span>
              <span>0</span>
              <span>0</span>
              <span>0</span>
              <span>1</span>
              <span>1</span>
            </div>
            <div className={css.boxscore__team__results}>
              <span>5</span>
              <span>12</span>
              <span>0</span>
            </div>
          </div>
          <div
            className={[css.boxscore__team, css["boxscore__team--home"]].join(
              " "
            )}
          >
            <label>STL</label>
            <div className={css.boxscore__team__units}>
              <span>0</span>
              <span>0</span>
              <span>0</span>
              <span>3</span>
              <span>0</span>
              <span>0</span>
              <span>0</span>
              <span>0</span>
              <span>1</span>
            </div>
            <div className={css.boxscore__team__results}>
              <span>4</span>
              <span>8</span>
              <span>1</span>
            </div>
          </div>
          <div className={css.boxscore__details}>
            <div
              className={[
                css.boxscore__details__team,
                css["boxscore__details__team--away"]
              ].join(" ")}
            >
              <p>
                <strong>Cubs</strong>
                <small>CHC</small>
              </p>
              <span>56-38</span>
            </div>
            <div className={css.boxscore__details__info}>
              <strong>
                Btm
                <br />
                9th
              </strong>
            </div>
            <div
              className={[
                css.boxscore__details__team,
                css["boxscore__details__team--home"]
              ].join(" ")}
            >
              <p>
                <strong>Cardinals</strong>
                <small>STL</small>
              </p>
              <span>56-38</span>
            </div>
          </div>
            </div> */}

        <div className={css.boxscore}>
          <div
            className={[css.boxscore__team, css["boxscore__team--header"]].join(
              " "
            )}
          >
            <label />
            <div className={css.boxscore__team__units}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
            <div className={css.boxscore__team__results}>
              <span>TOTAL</span>
            </div>
          </div>
          <div
            className={[css.boxscore__team, css["boxscore__team--away"]].join(
              " "
            )}
          >
            <label>NYJ</label>
            <div className={css.boxscore__team__units}>
              <span>0</span>
              <span>3</span>
              <span>0</span>
              <span>7</span>
            </div>
            <div className={css.boxscore__team__results}>
              <span>10</span>
            </div>
          </div>
          <div
            className={[css.boxscore__team, css["boxscore__team--home"]].join(
              " "
            )}
          >
            <label>NE</label>
            <div className={css.boxscore__team__units}>
              <span>14</span>
              <span>3</span>
              <span>7</span>
              <span>10</span>
            </div>
            <div className={css.boxscore__team__results}>
              <span>33</span>
            </div>
          </div>
          <div className={css.boxscore__details}>
            <div
              className={[
                css.boxscore__details__team,
                css["boxscore__details__team--away"]
              ].join(" ")}
              style={{ background: "#203731" }}
            >
              <p>
                <strong>JETS</strong>
                <small>NYJ</small>
              </p>
              <span>56-38</span>
            </div>
            <div className={css.boxscore__details__info}>
              <strong>Final</strong>
            </div>
            <div
              className={[
                css.boxscore__details__team,
                css["boxscore__details__team--home"]
              ].join(" ")}
              style={{ background: "#002244" }}
            >
              <p>
                <strong>PATRIOTS</strong>
                <small>NE</small>
              </p>
              <span>56-38</span>
            </div>
          </div>
        </div>
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
