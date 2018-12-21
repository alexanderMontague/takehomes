import axios from "axios";

// to prevent CORS / CORBS
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

// get barstool API specific sport data
export const fetchBarstoolSportData = sport => {
  return axios
    .get(
      `${PROXY_URL}https://chumley.barstoolsports.com/dev/data/${sport}.json`
    )
    .then(res => res.data)
    .catch(err => err.message);
};

// use NHL API to get a leafs vs jets game
export const fetchHockeyData = () => {
  return axios
    .get("https://statsapi.web.nhl.com/api/v1/game/2017020001/feed/live")
    .then(res => res.data)
    .catch(err => err.message);
};
