import React from "react";
import styles from "./Header.scss";

const Header = props => {
  return <div className={styles.header}>{props.headerText}</div>;
};

export default Header;
