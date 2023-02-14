import React from "react";
import uuid from "react-uuid";
import { useAppSelector } from "src/app/hooks";
import styles from "./ListDataSearch.module.less";

function ListDataSearch() {
  const { dataSearch } = useAppSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.col_index}>
              #
            </th>
            <th scope="col" className={styles.col_text}>
              Id
            </th>
            <th scope="col" className={styles.col_text}>
              Email
            </th>
            <th scope="col" className={styles.col_text}>
              Имя
            </th>
            <th scope="col" className={styles.col_text}>
              Телефон
            </th>
          </tr>
        </thead>
        <tbody>
          {dataSearch!.map((item, index) => {
            return (
              <tr key={uuid()}>
                <th scope="row">{index + 1}</th>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.contactPhone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListDataSearch;
