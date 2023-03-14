import React, { useState, useEffect } from "react";
import Sidebar from "src/components/sidebar/Sidebar";
import styles from "./ManagerSupport.module.less";
import FormSearchClient from "src/components/support/FormSearchClient/FormSearchClient";
import { validateFormSearhHotelRoom } from "src/utils/hotelFuntion";
import { useGetManagerSupportRequestClientQuery } from "src/servises/API/supportApi";
import ListDataSeacrhSupport from "src/components/support/ListDataSeacrhSupport/ListDataSeacrhSupport";
import Loader from "src/components/Loader/Loader";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";

interface Params {
  checked: boolean;
  offset: number | string;
  limit: number | string;
}

function ManagerSupport() {
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [checked, setCheked] = useState(true);
  const [offset, setOffset] = useState("");
  const [limit, setLimit] = useState("");
  const [searchParams, setSearchParams] = useState<Params>({
    checked,
    offset,
    limit,
  });
  const { isLoading, data, error, refetch } =
    useGetManagerSupportRequestClientQuery(searchParams);

  useEffect(() => {
    if (error) {
      let err: any = error;
      setFormErrors([err.data?.message || err.error]);
    } else {
      setFormErrors([]);
    }
  }, [error]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const keyPressSubmit = (e: KeyboardEvent) => e.key === "Enter" && onSubmit(e);

  function onSubmit(e: KeyboardEvent) {
    e.preventDefault();
    if (
      validateFormSearhHotelRoom(setFormErrors, undefined, offset, limit) ===
      true
    ) {
      setSearchParams({
        checked: checked,
        offset: offset,
        limit: limit,
      });
    }
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wraper}>
        <>
          <h3 className={styles.title}>Обращение клиентов</h3>
          <FormSearchClient
            setCheked={setCheked}
            setOffset={setOffset}
            setLimit={setLimit}
            keyPressSubmit={keyPressSubmit}
            onSubmit={onSubmit}
            checked={checked}
            formErrors={formErrors}
            isLoading={isLoading}
          />
          {isLoading ? (
            <Loader />
          ) : data && data.length <= 10 ? (
            <ListDataSeacrhSupport data={data} />
          ) : (
            <PaginateComponent data={data} CardNode={ListDataSeacrhSupport} />
          )}
        </>
      </div>
    </div>
  );
}

export default ManagerSupport;
