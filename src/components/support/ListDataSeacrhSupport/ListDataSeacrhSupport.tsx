import React from "react";
import IDataSupportRequest from "src/models/IDataSupportRequest";
import CardDataSeacrhSupport from "../CardDataSeacrhSupport/CardDataSeacrhSupport";
import styles from "./ListDataSeacrhSupport.module.less";

function ListDataSeacrhSupport({ data }: { data: IDataSupportRequest[] }) {
  return (
    <>
      {data && data.length > 0 ? (
        <div className={styles.support_requst_container}>
          {data?.map((item) => (
            <CardDataSeacrhSupport key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className={styles.support_requst_container}>
          <h3 className={styles.title}>Результаты поиска отсутствуют</h3>
        </div>
      )}
    </>
  );
}
export default ListDataSeacrhSupport;
