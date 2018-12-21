import React from "react";

import css from "./TeamHeaders.scss";

const TeamHeader = props => {
  return (
    <div
      className={[css.boxscore__team, css["boxscore__team--header"]].join(" ")}
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
  );
};

export default TeamHeader;
