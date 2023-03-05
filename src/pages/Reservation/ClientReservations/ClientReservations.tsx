import React, { useEffect, useState } from "react";
import { useAppSelector } from "src/app/hooks";
import Error from "src/components/Error/Error";
import FormSearchReversionManager from "src/components/hotel/FormSearchReversionManager/FormSearchReversionManager";
import SearchManagerNode from "src/components/hotel/SearchManagerNode/SearchManagerNode";
import Loader from "src/components/Loader/Loader";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import Sidebar from "src/components/sidebar/Sidebar";
import { useGetSearchManagerRevertionsQuery } from "src/servises/API/reservationApi";
import { validateFormSearhHotelRoom } from "src/utils/hotelFuntion";
import styles from "./ClientReservations.module.less";

interface Params {
  userId: string;
  offset: number | string;
  limit: number | string;
}

function ClientReservations() {
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const [offset, setOffset] = useState("");
  const [limit, setLimit] = useState("");
  const [searchParams, setSearchParams] = useState<Params>({
    userId,
    offset,
    limit,
  });
  const { isLoading, data, error, refetch } =
    useGetSearchManagerRevertionsQuery(searchParams);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const keyPressSubmit = (e: KeyboardEvent) => e.key === "Enter" && onSubmit(e);

  function onSubmit(e: KeyboardEvent) {
    e.preventDefault();
    if (
      validateFormSearhHotelRoom(setFormErrors, userId, offset, limit) === true
    ) {
      setSearchParams({
        userId: userId,
        offset: offset,
        limit: limit,
      });
    }
  }

  useEffect(() => {
    if (error) {
      let err: any = error;
      error && setFormErrors([err.data?.message || err.error]);
    } else {
      setFormErrors([]);
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wpaperr}>
        <h2 className={styles.title}>Брони клиентов</h2>
        {authenticated && user.role === "manager" ? (
          <div>
            <FormSearchReversionManager
              setId={setUserId}
              setOffset={setOffset}
              setLimit={setLimit}
              keyPressSubmit={keyPressSubmit}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
            <div className={styles.error}>
              {formErrors && <Error error={formErrors} />}
            </div>
            {isLoading ? (
              <Loader />
            ) : data && data.length <= 10 ? (
              <SearchManagerNode data={data} refetch={refetch} />
            ) : (
              <PaginateComponent
                data={data}
                CardNode={SearchManagerNode}
                refetch={refetch}
              />
            )}
          </div>
        ) : (
          <h3>Для продолжения работы требуеться авторизация </h3>
        )}
      </div>
    </div>
  );
}

export default ClientReservations;
