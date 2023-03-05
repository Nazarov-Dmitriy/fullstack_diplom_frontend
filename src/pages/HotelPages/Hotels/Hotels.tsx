import React, { KeyboardEvent, useState, useEffect } from "react";
import { useAppSelector } from "src/app/hooks";
import SearchAdminNode from "src/components/hotel/SearchAdminNode/SearchAdminNode";
import Loader from "../../../components/Loader/Loader";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import Sidebar from "src/components/sidebar/Sidebar";
import { useGetSearchAdminHotelQuery } from "src/servises/API/hotelApi";
import styles from "./Hotels.module.less";
import { validateFormSearhHotelRoom } from "src/utils/hotelFuntion";
import Error from "src/components/Error/Error";
import FormSearchAdmin from "src/components/hotel/FormSearchAdmin/FormSearchAdmin";

interface Params {
  title: string;
  offset: number | string;
  limit: number | string;
}

function Hotels() {
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [offset, setOffset] = useState("");
  const [limit, setLimit] = useState("");
  const [searchParams, setSearchParams] = useState<Params>({
    title,
    offset,
    limit,
  });
  const { isLoading, data, error, refetch } =
    useGetSearchAdminHotelQuery(searchParams);

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

  function onSubmit(
    e:
      | React.KeyboardEvent<Element>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (
      validateFormSearhHotelRoom(
        setFormErrors,
        undefined,
        offset,
        limit,
        undefined
      ) === true
    ) {
      setSearchParams({
        title: title,
        offset: offset,
        limit: limit,
      });
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.hotel}>
          <h2 className={styles.title}>Гостиницы</h2>
          {authenticated && user.role === "admin" ? (
            <div>
               <FormSearchAdmin
                setOffset={setOffset}
                setLimit={setLimit}
                keyPressSubmit={keyPressSubmit}
                onSubmit={onSubmit}
                isLoading={isLoading}
                components={'hotel'}
                setTitle={setTitle}
              />            
              <div className={styles.error}>
                {formErrors && <Error error={formErrors} />}
              </div>
              {isLoading ? (
                <Loader />
              ) : data && data.length <= 10 ? (
                <SearchAdminNode data={data} />
              ) : (
                <PaginateComponent data={data} CardNode={SearchAdminNode} />
              )}
            </div>
          ) : (
            <h3>Для продолжения работы требуеться авторизация </h3>
          )}
        </div>
      </div>
    </>
  );
}

export default Hotels;
