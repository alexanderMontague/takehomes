import axios from "axios";

export const getTopStories = () => {
  return axios
    .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
    .then(res => res.data)
    .catch(err => console.error(err));
};

export const getIndividualStory = id => {
  return axios
    .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then(res => res.data)
    .catch(err => console.error(err));
};
