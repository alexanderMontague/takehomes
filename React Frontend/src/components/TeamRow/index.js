import React, { Fragment } from "react";

import css from "./TeamRow.scss";

const TeamRow = props => {
  return (
    <Fragment>
      <div
        className={[css.boxscore__team, css["boxscore__team--away"]].join(" ")}
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
        className={[css.boxscore__team, css["boxscore__team--home"]].join(" ")}
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
    </Fragment>
  );
};

export default TeamRow;
