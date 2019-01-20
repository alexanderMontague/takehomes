import React from "react";
import styles from "./Dish.scss";

import { FaTimesCircle } from "react-icons/fa";

const ContentRow = props => {
  const { dishName, removeDish } = props;

  return (
    <span>
      <FaTimesCircle
        color="#fb3255"
        className={styles.closeButton}
        onClick={() => removeDish(dishName)}
      />
      <div className={styles["content-row"]}>
        <div className={styles.small}>{dishName}</div>
      </div>
    </span>
  );
};

export default ContentRow;
