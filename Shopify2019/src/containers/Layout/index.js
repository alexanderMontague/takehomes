import React, { Component, Fragment } from "react";
import styles from "./Layout.scss";

import Header from "../../components/Header";
import Search from "../Search";
import Favourites from "../../components/Favourites";

class Layout extends Component {
  state = {
    favouritedItems: []
  };

  toggleFavourite = wasteItemDetails => {
    const currentFavourites = this.state.favouritedItems;
    let isInFavs = false;
    if (currentFavourites.includes(wasteItemDetails)) {
      isInFavs = true;
    }

    let updatedFavourites = [];
    // if item is already in favourites
    if (isInFavs) {
      updatedFavourites = currentFavourites.filter(
        wasteItem => wasteItem !== wasteItemDetails
      );
    }
    // if item is not in favourites
    else {
      updatedFavourites = [...currentFavourites];
      updatedFavourites.push(wasteItemDetails);
    }

    this.setState({ favouritedItems: updatedFavourites });
  };

  render() {
    console.log(this.state);

    return (
      <div className={styles.mainContainer}>
        <Header headerText="Toronto Waste Lookup" />
        <Search
          maxDisplayedItems={3}
          toggleFavourite={this.toggleFavourite}
          favourites={this.state.favouritedItems}
        />
        <Favourites />
      </div>
    );
  }
}

export default Layout;
