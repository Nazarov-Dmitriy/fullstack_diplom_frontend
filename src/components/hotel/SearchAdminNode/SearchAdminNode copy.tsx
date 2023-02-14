import React, { FC } from "react";
import ISearchAdmin from "src/models/ISearchAdmin";
import SearchAdminCard from "../SearchAdminCard/SearchAdminCard";
import styles from "./SearchAdminNode.module.less";

function SearchAdmin(data: ISearchAdmin[] | undefined) {
  return (
    <>
      {data && data.length > 0 ? (
        <div className={styles.hotel_container}>
          {data?.map((item) => (
            <SearchAdminCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <h1>На данный момент записей нет</h1>
      )}
    </>
  );
}

export default SearchAdmin;
