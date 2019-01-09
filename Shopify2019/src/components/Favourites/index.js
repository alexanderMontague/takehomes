import React from "react";
import styles from "./Favourites.scss";

import WasteItem from "../WasteItem";

const Favourites = props => {
  return (
    <div>
      <div className={styles.favouriteHeader}>Favourites</div>
      <WasteItem isFavourited={true} />
      <WasteItem />
    </div>
  );
};

export default Favourites;
