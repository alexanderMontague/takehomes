import React, { Component } from "react";

import pagerdutyLogo from "../../assets/pagerduty.png";
import styles from "./Layout.scss";

import Dish from "../../components/Dish";

// possible implementations:
// - search
// - order of items
// - add more info to the menu items (ingredients, time to make, price)

class Layout extends Component {
  state = {
    dishName: "",
    dishIngredients: "",
    dishPrice: "",
    dishSearch: "",
    dishes: [],
    searchDishes: []
    // dish format:
    // {
    //   dishName: String
    // }
  };

  addDishHandler = event => {
    event.preventDefault();

    const { dishName, dishIngredients, dishes } = this.state;
    const newDishes = [...dishes];

    // add new dish without mutating state
    newDishes.push({ dishName, dishIngredients });

    // update dish array and clear add input
    this.setState({ dishName: "", dishIngredients: "", dishes: newDishes });
  };

  removeDishHandler = dishName => {
    const { dishes } = this.state;
    // remove dish from state that needs to be removed
    const newDishes = dishes.filter(dish => dish.dishName != dishName);
    this.setState({ dishes: newDishes });
  };

  renderDishes = () => {
    let dishRow = [];
    const dishGrid = [];
    const { dishes } = this.state;

    // sort dishes by alphabetic ascii order
    dishes.sort((dishOne, dishTwo) => {
      if (dishOne.dishName < dishTwo.dishName) {
        return -1;
      } else if (dishOne.dishName > dishTwo.dishName) {
        return 1;
      }

      return 0;
    });

    // loop through all current dishes
    dishes.forEach((dish, dishCounter) => {
      dishRow.push(
        <Dish
          key={dish.dishName}
          dishDetails={dish}
          removeDish={this.removeDishHandler}
        />
      );

      // every 3 items, break off row and add to main grid
      if ((dishCounter + 1) % 3 === 0) {
        dishGrid.push(
          <div className={styles.flexRow} key={dishRow[0].key}>
            {dishRow}
          </div>
        );
        dishRow = [];
      }
    });

    // if there are less than 3 items in a row, add last row to main grid
    if (dishes.length % 3 !== 0) {
      dishGrid.push(
        <div className={styles.flexRow} key={dishRow[0].key}>
          {dishRow}
        </div>
      );
    }

    return dishGrid;
  };

  searchDishHandler = event => {
    event.preventDefault();

    const { dishSearch, dishes } = this.state;
    const searchDishes = dishes.filter(dish =>
      dish.dishName.includes(dishSearch)
    ); // ask if exact or contains

    this.setState({ searchDishes });
  };

  renderSearchDishes = () => {
    const { searchDishes } = this.state;

    return (
      <div className={styles.flexRow}>
        {searchDishes.map(dish => (
          <Dish
            key={dish.dishName}
            dishName={dish.dishName}
            // removeDish={this.removeDishHandler}
          />
        ))}
      </div>
    );
  };

  // Add Dish Input Handler
  dishInputHandler = dishInput => {
    this.setState({ dishName: dishInput.target.value });
  };

  // Add Dish Search Handler
  dishSearchHandler = dishInput => {
    this.setState({ dishSearch: dishInput.target.value });
  };

  render() {
    return (
      <div className={styles.backdrop}>
        {/* Header */}
        <div className={styles.header}>
          <img className={styles.pagerdutyLogo} src={pagerdutyLogo} />
          PagerDuty Menu Application!
        </div>

        {/* Dish Search Form */}
        <div className={styles.searchBar}>
          <form onSubmit={this.searchDishHandler} className={styles.dishForm}>
            {/* Dish Name Input */}
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search for a Dish"
              onChange={this.dishSearchHandler}
              value={this.state.dishSearch}
            />

            <button className={styles.searchButton} type="submit">
              Search for a Dish!
            </button>
          </form>
        </div>
        {this.renderSearchDishes()}

        {/* Dish Addition Form */}
        <div className={styles.searchBar}>
          <form onSubmit={this.addDishHandler} className={styles.dishForm}>
            {/* Dish Name Input */}
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Enter a dish name"
              onChange={this.dishInputHandler}
              value={this.state.dishName}
            />

            <input
              type="text"
              className={styles.searchInput}
              placeholder="Enter the dish ingredients"
              onChange={event =>
                this.setState({ dishIngredients: event.target.value })
              }
              value={this.state.dishIngredients}
            />

            <button className={styles.searchButton} type="submit">
              Add Dish!
            </button>
          </form>
        </div>

        {/* Rendered Dish Grid */}
        {this.renderDishes()}
      </div>
    );
  }
}

export default Layout;
