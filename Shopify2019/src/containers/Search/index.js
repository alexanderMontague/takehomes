import React, { Component } from "react";
import styles from "./Search.scss";

import WasteItem from "../../components/WasteItem";

import wasteData from "../../assets/wasteLookupData.json";
import { FaSearch } from "react-icons/fa"; // super cool library

class Search extends Component {
  state = {
    searchInput: "",
    wasteItems: []
  };

  searchInputHandler = event => {
    if (event.target.value.length === 0) {
      this.setState({ wasteItems: [] });
    }

    this.setState({ searchInput: event.target.value });
  };

  wasteLookupHandler = event => {
    event.preventDefault();

    const { searchInput } = this.state;
    const { toggleFavourite, maxDisplayedItems, favourites } = this.props;
    console.log("favs", favourites);

    const wasteItems = wasteData
      .map(item => {
        const { title, keywords, body } = item;
        // only searches keywords as per the spec
        // the design seems to also search the titles
        if (keywords.toLowerCase().includes(searchInput.toLowerCase())) {
          console.log(favourites.includes(title) ? true : false);

          return (
            <WasteItem
              title={title}
              description={body}
              toggleFavourite={toggleFavourite}
              isInFavs={favourites.includes(title) ? true : false}
              key={title}
            />
          );
        }
        return null;
      })
      .filter(wasteComponent => !!wasteComponent)
      .slice(0, maxDisplayedItems);

    this.setState({ wasteItems });
  };

  render() {
    return (
      <div className={styles.searchContainer}>
        <form className={styles.form} onSubmit={this.wasteLookupHandler}>
          <input
            className={styles.searchBar}
            onChange={this.searchInputHandler}
          />
          <div
            className={styles.searchButton}
            onClick={this.wasteLookupHandler}
          >
            <FaSearch color="#ffffff" size="1.5em" />
          </div>
        </form>
        {this.state.wasteItems}
      </div>
    );
  }
}

export default Search;
