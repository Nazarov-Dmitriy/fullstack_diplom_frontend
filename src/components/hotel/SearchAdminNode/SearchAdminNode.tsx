import React from "react";
import ISearchAdmin from "src/models/ISearchAdmin";
import SearchAdminCard from "../SearchAdminCard/SearchAdminCard";
import styles from "./SearchAdminNode.module.less";


const SearchAdminNode = ({ data }: { data: ISearchAdmin[] | undefined }) =>

  data && data.length > 0 ? (
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
    <h3>Результаты поиска отсутствуют</h3>
  );

export default SearchAdminNode;
