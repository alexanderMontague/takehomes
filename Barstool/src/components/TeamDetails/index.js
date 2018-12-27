import React from "react";

import css from "./TeamDetails.scss";

const TeamDetails = props => {
  const {
    event_away_team,
    event_home_team,
    event_final_result
  } = props.detailsData;

  return (
    <div className={css.boxscore__details}>
      <div
        className={[
          css.boxscore__details__team,
          css[`boxscore__details__home--${props.sport}`]
        ].join(" ")}
      >
        <p>
          <strong>{event_home_team}</strong>
        </p>
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
          css[`boxscore__details__away--${props.sport}`]
        ].join(" ")}
      >
        <p>
          <strong>{event_away_team}</strong>
        </p>
      </div>
    </div>
  );
};

export default TeamDetails;
