import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ListDataSeacrh from "../hotel/ListDataSeacrh/ListDataSeacrh";
import SearchAdminNode from "../hotel/SearchAdminNode/SearchAdminNode";
import styles from "./PaginateItem.module.less";

interface IUseQuery {
  CardNode: typeof SearchAdminNode | typeof ListDataSeacrh;
  data: any;
  search?: string;
}

const PaginateComponent: React.FC<IUseQuery> = ({ data, CardNode, search }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    if (data) {
      setCurrentItems(data.slice(itemOffset, itemOffset + itemsPerPage));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, data, itemsPerPage]);

  const handlePageClick = (event: any) => {
    if (!data) {
      return;
    }
    setItemOffset((event.selected * itemsPerPage) % data.length);
  };

  console.log(`Загрузка элементов из ${itemOffset} в ${endOffset} `);

  return (
    <div className={styles.paginator_wrapper}>
      {currentItems && <CardNode data={currentItems} search={search} />}
      <div className={styles.paginator_wraper}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Вперёд >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          activeClassName={styles.active}
          previousLabel="< Назад"
          className={styles.paginator_switcher}
        />
      </div>
    </div>
  );
};

export default PaginateComponent;
