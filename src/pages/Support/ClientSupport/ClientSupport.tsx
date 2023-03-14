import React, { useState, useEffect } from "react";
import Sidebar from "src/components/sidebar/Sidebar";
import CreateSupportClient from "src/components/support/CreateSupportClient/CreateSupportClient";
import styles from "./ClientSupport.module.less";
import FormSearchClient from "src/components/support/FormSearchClient/FormSearchClient";
import { validateFormSearhHotelRoom } from "src/utils/hotelFuntion";
import { useGetSupportRequestClientQuery } from "src/servises/API/supportApi";
import ListDataSeacrhSupport from "src/components/support/ListDataSeacrhSupport/ListDataSeacrhSupport";
import Loader from "src/components/Loader/Loader";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
interface Params {
  checked: boolean;
  offset: number | string;
  limit: number | string;
}

function ClientSupport() {
  const [showComponent, setShowComponent] = useState("create-support");
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
    useGetSupportRequestClientQuery(searchParams);

  useEffect(() => {
    if (error) {
      let err: any = error;
      setFormErrors([err.data?.message || err.error]);
    } else {
      setFormErrors([]);
    }
  }, [error]);

  useEffect(() => {
    if (showComponent === "get-my-support") {
      refetch();
    }
  }, [refetch, showComponent]);

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

  function showCreateSupport() {
    setShowComponent("create-support");
    setSearchParams({
      checked: true,
      offset: "",
      limit: "",
    });
  }

  function showMySupportRequest() {
    setShowComponent("get-my-support");
  }
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wraper}>
        <>
          <div className={styles.menu}>
            <div className={styles.create_support} onClick={showCreateSupport}>
              <button className={styles.btn}>
                Создать обращение
                <img
                  src="../../assets/icons/add.png"
                  alt="create support"
                  className={styles.icons_btn}
                />
              </button>
            </div>
            <div
              className={styles.search_support}
              onClick={showMySupportRequest}
            >
              <button className={styles.btn}>
                Мои обращения
                <img
                  src="../../assets/icons/seacrh.png"
                  alt="add user"
                  className={styles.icons_btn}
                />
              </button>
            </div>
          </div>

          {showComponent === "create-support" && <CreateSupportClient />}
          {showComponent === "get-my-support" && (
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
          )}
          {showComponent === "get-my-support" &&
            (isLoading ? (
              <Loader />
            ) : data && data.length <= 10 ? (
              <ListDataSeacrhSupport data={data} />
            ) : (
              <PaginateComponent data={data} CardNode={ListDataSeacrhSupport} />
            ))}
        </>
      </div>
    </div>
  );
}

export default ClientSupport;
