import React from "react";
import styles from "./Main.module.less";
import Sidebar from "src/components/sidebar/Sidebar";
function Main() {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
}

export default Main;
