import React from "react";
import styles from "./ConentRow.scss";

const ContentRow = props => {
  const { title, data } = props;

  return (
    <div className={styles["content-row"]}>
      <div className={styles.small}>{title}</div>
      {data}
    </div>
  );
};

export default ContentRow;
