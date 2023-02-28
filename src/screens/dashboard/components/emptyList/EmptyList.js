import React from "react";

import styles from "./EmptyList.module.css";

function EmptyList() {
  return (
    <div className={styles.container}>
      <img
        className={styles.emptyListImage}
        src='https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1504x1128'
        alt='Nothing found on search'
      />
    </div>
  );
}

export default EmptyList;
