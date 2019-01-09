import React, { useState } from "react";
import styles from "./WasteItem.scss";

import { FaStar } from "react-icons/Fa";

const WasteItem = props => {
  const { isInFavs, title, description, toggleFavourite } = props;
  const [isFavourited, setFavourited] = useState(isInFavs); // Hooks :o

  // decodes the escaped HTML so react will actually render the HTML not the text
  const decodeHTML = content => {
    const parsedElement = document.createElement("span");
    parsedElement.innerHTML = content;

    return parsedElement.childNodes.length === 0
      ? ""
      : parsedElement.childNodes[0].nodeValue;
  };

  const toggleFavouriteHandler = () => {
    toggleFavourite(title);
    setFavourited(!isFavourited);
  };

  return (
    <div className={styles.wasteItem}>
      <div className={styles.wasteName}>
        <div>
          <FaStar
            className={styles.favStar}
            color={isFavourited ? "#208e52" : "#a0a0a0"}
            onClick={toggleFavouriteHandler}
          />
        </div>
        <div>{title}</div>
      </div>
      <div
        className={styles.wasteDescription}
        // Susceptible to HTML injections (would sanitize if coming from API)
        dangerouslySetInnerHTML={{ __html: decodeHTML(description) }}
      />
    </div>
  );
};

export default WasteItem;
