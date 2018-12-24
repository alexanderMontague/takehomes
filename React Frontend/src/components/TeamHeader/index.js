import React from "react";

import css from "./TeamHeaders.scss";

const TeamHeader = props => {
  const { sport } = props;

  const sportToPeriodMap = {
    basketball: 4,
    soccer: 2,
    hockey: 3
    // fill in more sports as needed
  };

  const renderPlayingPeriod = () => {
    const periodArray = [];
    for (let i = 0; i < sportToPeriodMap[sport]; i++) {
      periodArray.push(<span key={i}>{i + 1}</span>);
    }
    return periodArray;
  };

  return (
    <div
      className={[css.boxscore__team, css["boxscore__team--header"]].join(" ")}
    >
      <label />
      <div className={css.boxscore__team__units}>{renderPlayingPeriod()}</div>
      <div className={css.boxscore__team__results}>
        <span>TOTAL</span>
      </div>
    </div>
  );
};

export default TeamHeader;
