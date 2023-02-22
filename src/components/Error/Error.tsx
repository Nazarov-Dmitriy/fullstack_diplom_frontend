import React from "react";
import uuid from "react-uuid";
import styles from "./Error.module.less";

function Error({ error }: { error: any }) {
  return (
    <div className={styles.error}>
      {error.map((item: string) => {
        return (
          <p key={uuid()} className={styles.text_error}>
            {item}
          </p>
        );
      })}
    </div>
  );
}

export default Error;
