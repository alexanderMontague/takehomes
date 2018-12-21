import React from "react";

import css from "./TeamDetails.scss";

const TeamDetails = props => {
  console.log(props);

  const {
    event_away_team,
    event_home_team,
    event_final_result
  } = props.detailsData;
  const homeIdentifier = event_home_team.match(/\b(\w)/g).join(".");
  const awayIdentifier = event_away_team.match(/\b(\w)/g).join(".");
  console.log("team details", props);

  return (
    <div className={css.boxscore__details}>
      <div
        className={[
          css.boxscore__details__team,
          css["boxscore__details__team--away"]
        ].join(" ")}
      >
        <p>
          <strong>{event_home_team}</strong>
          <small>{homeIdentifier}</small>
        </p>
        {/* <span>56-38</span> */}
      </div>
      <div className={css.boxscore__details__info}>
        <strong>
          FINAL
          <br />
          <br />
          {event_final_result}
        </strong>
      </div>
      <div
        className={[
          css.boxscore__details__team,
          css["boxscore__details__team--home"]
        ].join(" ")}
      >
        <p>
          <strong>{event_away_team}</strong>
          <small>{awayIdentifier}</small>
        </p>
        {/* <span>56-38</span> */}
      </div>
    </div>
  );
};

export default TeamDetails;
