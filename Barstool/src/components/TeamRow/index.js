import React, { Fragment } from "react";

import css from "./TeamRow.scss";

const TeamRow = props => {
  const {
    sport,
    rowData: { teams, scoringData, homeGoals, awayGoals }
  } = props;

  // idealy get this from the API for the actual shorthand team names
  const homeIdentifier = teams.home.match(/\b(\w)/g).join(".");
  const awayIdentifier = teams.away.match(/\b(\w)/g).join(".");

  // arrays that hold scoring data for each playing period
  const homeScoreArray = [];
  const awayScoreArray = [];
  // score counters
  let homeScore = 0;
  let awayScore = 0;

  switch (sport) {
    case "basketball":
      /*
       *  Schema:
       *  scoringData = [
       *    1stQuarter: {
       *      quarter.score_home: String,
       *      quarter.score_away: String
       *    },
       *    2ndQuarter: {
       *      ...
       *    }
       *  ]
       */
      // looping allows scalability in API changes later
      scoringData["1stQuarter"].forEach(quarter => {
        homeScore += Number(quarter.score_home);
        awayScore += Number(quarter.score_away);
        homeScoreArray.push(
          <span key={quarter.score_home}>{quarter.score_home}</span>
        );
        awayScoreArray.push(
          <span key={quarter.score_away}>{quarter.score_away}</span>
        );
      });
      scoringData["2ndQuarter"].forEach(quarter => {
        homeScore += Number(quarter.score_home);
        awayScore += Number(quarter.score_away);
        homeScoreArray.push(
          <span key={quarter.score_home}>{quarter.score_home}</span>
        );
        awayScoreArray.push(
          <span key={quarter.score_away}>{quarter.score_away}</span>
        );
      });
      scoringData["3rdQuarter"].forEach(quarter => {
        homeScore += Number(quarter.score_home);
        awayScore += Number(quarter.score_away);
        homeScoreArray.push(
          <span key={quarter.score_home}>{quarter.score_home}</span>
        );
        awayScoreArray.push(
          <span key={quarter.score_away}>{quarter.score_away}</span>
        );
      });
      scoringData["4thQuarter"].forEach(quarter => {
        homeScore += Number(quarter.score_home);
        awayScore += Number(quarter.score_away);
        homeScoreArray.push(
          <span key={quarter.score_home}>{quarter.score_home}</span>
        );
        awayScoreArray.push(
          <span key={quarter.score_away}>{quarter.score_away}</span>
        );
      });
      break;

    case "soccer":
      /*
       *  Schema:
       *  scoringData = [
       *    {
       *      away_scorer: String || "",
       *      home_scorer: String || "",
       *      score: String ("away - home"),
       *      time: String
       *    },
       *    {
       *      ...
       *    }
       *  ]
       */
      // extra arrays to hold goals in the same column
      // the way the css is set up, this needs to be done
      const homeFirstHalf = [];
      const homeSecondHalf = [];
      const awayFirstHalf = [];
      const awaySecondHalf = [];

      scoringData.forEach(goal => {
        // tally score based on home or away team
        goal.home_scorer.length > 0 ? homeScore++ : awayScore++;

        // if goal is in first half
        if (Number(goal.time) <= 45) {
          // add score to home or away
          goal.home_scorer.length > 0
            ? homeFirstHalf.push(
                <span key={JSON.stringify(goal)}>{`${goal.home_scorer} ${
                  goal.time
                }"`}</span>
              )
            : awayFirstHalf.push(
                <span key={JSON.stringify(goal)}>{`${goal.away_scorer} ${
                  goal.time
                }"`}</span>
              );
        } else {
          // same logic for if second half
          goal.home_scorer.length > 0
            ? homeSecondHalf.push(
                <span key={JSON.stringify(goal)}>{`${goal.home_scorer} ${
                  goal.time
                }"`}</span>
              )
            : awaySecondHalf.push(
                <span key={JSON.stringify(goal)}>{`${goal.away_scorer} ${
                  goal.time
                }"`}</span>
              );
        }
      });

      // Add half scores to home or away main array
      homeScoreArray.push(
        <div key={1} className={css.columnScore}>
          {homeFirstHalf}
        </div>,
        <div key={2} className={css.columnScore}>
          {homeSecondHalf}
        </div>
      );
      awayScoreArray.push(
        <div key={3} className={css.columnScore}>
          {awayFirstHalf}
        </div>,
        <div key={4} className={css.columnScore}>
          {awaySecondHalf}
        </div>
      );

      // NOTE: API does not give back correct score data
      // Final states 2-4, but we only receive data on 4 of the goals
      break;

    case "hockey":
      /*
       *  Schema:
       *  scoringData = [
       *    {
       *      about: {
       *        period: Number,
       *        periodTime: String,
       *        goals: Object
       *      },
       *      players: [
       *        {
       *          player: {
       *            fullName: String
       *          }
       *        }
       *      ],
       *      result: Object,
       *      team: Object
       *    },
       *    {
       *      ...
       *    }
       *  ]
       */
      // use the same strategy as soccer to deal with css
      const homePeriodOne = [];
      const homePeriodTwo = [];
      const homePeriodThree = [];
      const awayPeriodOne = [];
      const awayPeriodTwo = [];
      const awayPeriodThree = [];

      // update score
      homeScore = homeGoals;
      awayScore = awayGoals;

      // used to determine home and away goal
      let homeCounter = 0;
      let awayCounter = 0;

      scoringData.forEach(goal => {
        const { about, players } = goal;

        switch (about.period) {
          case 1:
            homeCounter === about.goals.home && awayCounter !== about.goals.away
              ? awayPeriodOne.push(
                  <span key={players[0].player.fullName}>{`${
                    players[0].player.fullName
                  } ${about.periodTimeRemaining}`}</span>
                )
              : homePeriodOne.push(
                  <span key={players[0].player.fullName}>{`${
                    players[0].player.fullName
                  } ${about.periodTimeRemaining}`}</span>
                );
            break;

          case 2:
            homeCounter === about.goals.home && awayCounter !== about.goals.away
              ? awayPeriodTwo.push(
                  <span key={players[0].player.fullName}>{`${
                    players[0].player.fullName
                  } ${about.periodTimeRemaining}`}</span>
                )
              : homePeriodTwo.push(
                  <span key={players[0].player.fullName}>{`${
                    players[0].player.fullName
                  } ${about.periodTimeRemaining}`}</span>
                );
            break;

          case 3:
            homeCounter === about.goals.home && awayCounter !== about.goals.away
              ? awayPeriodThree.push(
                  <span key={players[0].player.fullName}>{`${
                    players[0].player.fullName
                  } ${about.periodTimeRemaining}`}</span>
                )
              : homePeriodThree.push(
                  <span key={players[0].player.fullName}>{`${
                    players[0].player.fullName
                  } ${about.periodTimeRemaining}`}</span>
                );
            break;

          default:
            // Could be OT or shootout ... TODO
            console.error("Unknown Period");
        }

        homeCounter = about.goals.home;
        awayCounter = about.goals.away;
      });

      // Add period scores to home or away main array
      homeScoreArray.push(
        <div key={1} className={css.columnScore}>
          {homePeriodOne}
        </div>,
        <div key={2} className={css.columnScore}>
          {homePeriodTwo}
        </div>,
        <div key={3} className={css.columnScore}>
          {homePeriodThree}
        </div>
      );
      awayScoreArray.push(
        <div key={1} className={css.columnScore}>
          {awayPeriodOne}
        </div>,
        <div key={2} className={css.columnScore}>
          {awayPeriodTwo}
        </div>,
        <div key={3} className={css.columnScore}>
          {awayPeriodThree}
        </div>
      );
      break;

    default:
      console.error("Unknown Sport");
  }

  return (
    <Fragment>
      <div
        className={[css.boxscore__team, css["boxscore__team--away"]].join(" ")}
      >
        <label>{homeIdentifier}</label>
        <div className={css.boxscore__team__units}>{homeScoreArray}</div>
        <div className={css.boxscore__team__results}>
          <span>{homeScore}</span>
        </div>
      </div>
      <div
        className={[css.boxscore__team, css["boxscore__team--home"]].join(" ")}
      >
        <label>{awayIdentifier}</label>
        <div className={css.boxscore__team__units}>{awayScoreArray}</div>
        <div className={css.boxscore__team__results}>
          <span>{awayScore}</span>
        </div>
      </div>
    </Fragment>
  );
};

export default TeamRow;
