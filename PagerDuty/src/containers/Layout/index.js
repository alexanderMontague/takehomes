import React, { Component } from "react";

import pagerdutyLogo from "../../assets/pagerduty.png";
import styles from "./Layout.scss";

import Dish from "../../components/Dish";

class Layout extends Component {
  state = {
    dishInput: "",
    dishes: []
  };

  addDishHandler = event => {
    event.preventDefault();

    const { dishInput, dishes } = this.state;
    const newDishes = [...dishes];

    // add new dish without mutating state
    newDishes.push({ dishName: dishInput });

    // update dish array and clear add input
    this.setState({ dishInput: "", dishes: newDishes });
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
          dishName={dish.dishName}
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

  // Add Dish Input Handler
  dishInputHandler = dishInput => {
    this.setState({ dishInput: dishInput.target.value });
  };

  render() {
    return (
      <div className={styles.backdrop}>
        {/* Header */}
        <div className={styles.header}>
          <img className={styles.pagerdutyLogo} src={pagerdutyLogo} />
          PagerDuty Menu Application!
        </div>

        {/* Dish Addition Form */}
        <div className={styles.searchBar}>
          <form onSubmit={this.addDishHandler} className={styles.dishForm}>
            {/* Dish Name Input */}
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Enter a dish name"
              onChange={this.dishInputHandler}
              value={this.state.dishInput}
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
