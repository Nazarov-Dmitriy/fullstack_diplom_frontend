import React from "react";
import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.less";
const Loader = () => {
  return (
    <div className={styles.container}>
      <Oval
        height={60}
        width={60}
        color="#00CED1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="aqua"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
