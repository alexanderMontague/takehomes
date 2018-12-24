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

  // if the score data has not arrived yet
  if (Object.keys(data).length === 0) {
    // show spinner?
    return <div>Loading</div>;
  }

  // if barstool API sport
  if (sport === "basketball" || sport === "soccer") {
    const {
      event_away_team,
      event_home_team,
      event_final_result,
      scores = null,
      goalscorers = null
    } = data;

    rowData = {
      scoringData: scores || goalscorers,
      teams: {
        home: event_home_team,
        away: event_away_team
      }
    };

    detailsData = {
      event_away_team,
      event_home_team,
      event_final_result
    };
  } else {
    const {
      liveData: {
        boxscore: {
          teams: { home, away }
        },
        plays: { allPlays, scoringPlays }
      }
    } = data;

    rowData = {
      teams: {
        home: home.team.name,
        away: away.team.name
      },
      scoringData: scoringPlays.map(index => allPlays[index]),
      homeGoals: home.teamStats.teamSkaterStats.goals,
      awayGoals: away.teamStats.teamSkaterStats.goals
    };

    detailsData = {
      event_away_team: away.team.name,
      event_home_team: home.team.name,
      event_final_result: `${home.teamStats.teamSkaterStats.goals} - ${
        away.teamStats.teamSkaterStats.goals
      }`
    };
  }

  return (
    <div className={css.boxscore}>
      <TeamHeader sport={sport} />
      <TeamRow sport={sport} rowData={rowData} />
      <TeamDetails sport={sport} detailsData={detailsData} />
    </div>
  );
};

export default BoxScore;
