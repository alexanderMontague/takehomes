import React from "react";
import styles from "./ConentRow.scss";

const ContentRow = props => {
  const { title, data, isItem, isTopRow } = props;

  return (
    <div
      className={
        isTopRow
          ? [styles["content-row"], styles["content-row-top"]].join(" ")
          : styles["content-row"]
      }
    >
      <div className={styles.small}>{title}</div>
      {isItem ? `${data.item}(${data.quantity})` : data}
    </div>
  );
};

export default ContentRow;
