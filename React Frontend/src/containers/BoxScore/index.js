import React from "react";

import TeamHeader from "../../components/TeamHeader";
import TeamRow from "../../components/TeamRow";
import TeamDetails from "../../components/TeamDetails";

import css from "./BoxScore.scss";

const BoxScore = props => {
  const { sport, data } = props;
  let headerData = {};
  let rowData = {};
  let detailsData = {};
  console.log("PROPS", props);

  // if the score data has not arrived yet
  if (Object.keys(data).length === 0) {
    // show spinner?
    return <div />;
  }

  switch (sport) {
    case "basketball":
      const { event_away_team, event_home_team, event_final_result } = data;
      detailsData = {
        event_away_team,
        event_home_team,
        event_final_result
      };
      break;

    case "soccer":
      detailsData = {
        event_away_team,
        event_home_team,
        event_final_result
      };
      break;

    case "hockey":
      break;

    default:
      console.log("Unknown Sport");
      break;
  }

  return (
    <div className={css.boxscore}>
      <TeamHeader headerData={headerData} />
      <TeamRow rowData={rowData} />
      <TeamDetails detailsData={detailsData} />
    </div>
  );
};

export default BoxScore;
