import React from "react";

import EmptyListImage from "../../../../assets/emptyScreenPlaceholder.png";

import styles from "./EmptyList.module.css";

function EmptyList() {
  return (
    <div className={styles.container}>
      <img
        className={styles.emptyListImage}
        src={EmptyListImage}
        alt='Nothing found on search'
      />
    </div>
  );
}

export default EmptyList;
