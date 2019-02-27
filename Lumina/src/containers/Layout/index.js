import React, { Component } from "react";
import styles from "./Layout.scss";

import { getTopStories, getIndividualStory } from "../../helpers/requests";

// current time global
// https://www.electrictoolbox.com/unix-timestamp-javascript/
const CURR_UNIX_TIME = Math.round(new Date().getTime() / 1000);

class Layout extends Component {
  state = {
    topStories: [],
    numTopStories: 10 // if time, implement user selected number of top stories
  };

  async componentDidMount() {
    // get top story ID's
    const topStoryIds = await getTopStories();

    // get more info about each story
    const topStories = [];
    for (let i = 0; i < this.state.numTopStories; i++) {
      topStories.push(await getIndividualStory(topStoryIds[i]));
    }

    this.setState({ topStories });
  }

  renderStories = () => {
    const { topStories } = this.state;

    return topStories.map(story => {
      let source = story.url
        .match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]
        .replace("www.", "")
        .replace(".com", "")
        .replace(".io", "")
        .replace(".net", "")
        .replace(".org", "");

      return (
        <div className={styles.story} key={story.id}>
          <a href={story.url} target="_blank" rel="noopener">
            {story.title} {`(${source})`}
          </a>
          <div>
            {`${story.score} points by ${story.by} ${(
              (CURR_UNIX_TIME - story.time) /
              3600000
            ) // 3600000 ms to hour
              .toFixed(6)} hours ago | ${story.kids.length} comments`}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div className={styles.title}>Top Stories</div>
        <div className={styles.storyContainer}>{this.renderStories()}</div>
      </div>
    );
  }
}

export default Layout;
