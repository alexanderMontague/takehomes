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
    const newDishes = dishes;

    // add new item without mutating state
    newDishes.push(
      <Dish
        key={dishInput}
        dishName={dishInput}
        removeDish={this.removeDishHandler}
      />
    );
    this.setState({ dishInput: "", dishes: newDishes });
  };

  removeDishHandler = dishName => {
    const { dishes } = this.state;
    const newDishes = dishes.filter(dish => dish.props.dishName != dishName);
    this.setState({ dishes: newDishes });
  };

  renderDishes = () => {
    let itemCount = 0;
    let dishRow = [];
    const dishGrid = [];
    const { dishes } = this.state;

    dishes.forEach(dish => {
      dishRow.push(dish);
      itemCount++;

      // every 3 items, break off row and add to main grid
      if (itemCount % 3 === 0) {
        dishGrid.push(
          <div className={styles.flexRow} key={dishRow[0].props.dishName}>
            {dishRow}
          </div>
        );
        itemCount = 0;
        dishRow = [];
      }
    });

    // if there are less than 3 items in a row, add row to main grid
    if (dishes.length % 3 !== 0) {
      dishGrid.push(
        <div className={styles.flexRow} key={dishRow[0].props.dishName}>
          {dishRow}
        </div>
      );
    }

    return dishGrid;
  };

  dishInputHandler = dishInput => {
    this.setState({ dishInput: dishInput.target.value });
  };

  render() {
    return (
      <div className={styles.backdrop}>
        <div className={styles.header}>
          <img className={styles.pagerdutyLogo} src={pagerdutyLogo} />
          Pagerduty Menu Application!
        </div>
        <div className={styles.searchBar}>
          <form onSubmit={this.addDishHandler}>
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
        {this.renderDishes()}
      </div>
    );
  }
}

export default Layout;
