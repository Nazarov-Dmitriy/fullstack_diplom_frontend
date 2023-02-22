import React from "react";
import IDataHotelRooms from "src/models/IDataHotelRooms";
import CardDataSeacrh from "../CardDataSeacrh/CardDataSeacrh";
import styles from "./ListDataSeacrh.module.less";

function ListDataSeacrh({data}:{data:IDataHotelRooms[]}) {
  return (
    <>
      {data && data.length > 0 ? (
        <div className={styles.hotel_container}>
          {data?.map((item) => (
            <CardDataSeacrh key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <h3>Результаты поиска отсутствуют</h3>
      )}
    </>
  );
}
export default ListDataSeacrh;
