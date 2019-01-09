import React from "react";
import styles from "./Favourites.scss";

import WasteItem from "../WasteItem";

import wasteData from "../../assets/wasteLookupData.json";

const Favourites = props => {
  const { favourites, toggleFavourite } = props;

  const renderFavourites = () => {
    return favourites.map(wasteTitle => {
      let description = "";

      // get other waste item data from dataset
      wasteData.forEach(wasteItem => {
        if (wasteItem.title === wasteTitle) {
          description = wasteItem.body;
        }
      });

      return (
        <WasteItem
          title={wasteTitle}
          description={description}
          toggleFavourite={toggleFavourite}
          isInFavs={true}
          key={wasteTitle}
        />
      );
    });
  };
  return (
    <div>
      <div className={styles.favouriteHeader}>Favourites</div>
      {props.favourites.length > 0
        ? renderFavourites()
        : "Add favourites by clicking the star next to an item!"}
    </div>
  );
};

export default Favourites;
