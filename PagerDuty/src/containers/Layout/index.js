import React, { Component } from "react";

import pagerdutyLogo from "../../assets/pagerduty.png";
import styles from "./Layout.scss";

import Dish from "../../components/Dish";

class Layout extends Component {
  state = {
    dishName: "",
    dishIngredients: "",
    dishSearchInput: "",
    dishes: [],
    searchedDishes: []
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

  searchDishHandler = event => {
    event.preventDefault();

    const { dishes, dishSearchInput } = this.state;
    const searchedDishes = [];

    let allDishIngredients = dishSearchInput.split(",");
    allDishIngredients = allDishIngredients.map(ingredient =>
      ingredient.trim()
    );

    dishes.forEach(dish => {
      let madeDishIngredients = dish.dishIngredients.split(",");
      madeDishIngredients = madeDishIngredients.map(ingredient =>
        ingredient.trim()
      );

      const haveIngredients = madeDishIngredients.every(dish =>
        allDishIngredients.includes(dish)
      );

      if (haveIngredients) {
        searchedDishes.push(dish);
      }
    });

    this.setState({ searchedDishes });
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

  renderSearchedDishes = () => {
    let dishRow = [];
    const dishGrid = [];
    const { searchedDishes } = this.state;

    // loop through all current dishes
    searchedDishes.forEach((dish, dishCounter) => {
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
    if (searchedDishes.length % 3 !== 0) {
      dishGrid.push(
        <div className={styles.flexRow} key={dishRow[0].key}>
          {dishRow}
        </div>
      );
    }

    return dishGrid;
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
            {/* Dish Search Input */}
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by ingredients"
              onChange={event =>
                this.setState({ dishSearchInput: event.target.value })
              }
              value={this.state.dishSearchInput}
            />

            <button className={styles.searchButton} type="submit">
              Search for Dishes!
            </button>
          </form>
        </div>
        {this.renderSearchedDishes()}

        {/* Dish Addition Form */}
        <div className={styles.searchBar}>
          <form onSubmit={this.addDishHandler} className={styles.dishForm}>
            {/* Dish Name Input */}
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Enter a dish name"
              onChange={event =>
                this.setState({ dishName: event.target.value })
              }
              value={this.state.dishName}
            />

            {/* Dish Ingredients Input */}
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Enter dish ingredients"
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
