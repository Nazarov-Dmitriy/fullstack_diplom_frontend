import React, { KeyboardEvent, useState, useEffect } from "react";
import FormSearchHotelRooms from "src/components/hotel/FormSearchHotelRooms/FormSearchHotelRooms";
import ListDataSeacrh from "src/components/hotel/ListDataSeacrh/ListDataSeacrh";
import Loader from "src/components/Loader/Loader";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import Sidebar from "src/components/sidebar/Sidebar";
import ISearchHotelRooms from "src/models/ISearchHotelRooms";
import { useGetSearchHotelRoomsQuery } from "src/servises/API/hotelApi";
import { validateFormSearhHotelRoom } from "src/utils/hotelFuntion";
import styles from "./HotelRoomsSearch.module.less";
import { useAppSelector } from "src/app/hooks";
import Error from "src/components/Error/Error";

function HotelRoomsSearch() {
  const [id, setId] = useState("");
  const [offset, setOffset] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | string>("");
  const [endDate, setEndDate] = useState<Date | string>("");
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<ISearchHotelRooms>({
    id,
    offset,
    limit,
    startDate,
    endDate,
    isEnabled,
  });
  const { user, authenticated } = useAppSelector((state) => state.user);

  const { isLoading, data, error, refetch } =
    useGetSearchHotelRoomsQuery(searchParams);

  useEffect(() => {
    if (authenticated && (user.role === "admin" || user.role === "manager")) {
      setIsEnabled(false);
    }
  }, [authenticated, user]);

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

  function onSubmit(e: React.KeyboardEvent<Element>) {
    e.preventDefault();
    if (
      validateFormSearhHotelRoom(
        setFormErrors,
        id,
        offset,
        limit,
      ) === true
    ) {
      setSearchParams({
        id: id,
        offset: offset,
        limit: limit,
        startDate: startDate,
        endDate: endDate,
        isEnabled: isEnabled,
      });
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.wraper}>
          <h2 className={styles.title}>Поиск номера</h2>
          <FormSearchHotelRooms
            setId={setId}
            setOffset={setOffset}
            setLimit={setLimit}
            keyPressSubmit={keyPressSubmit}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onSubmit={onSubmit}
            startDate={startDate}
            endDate={endDate}
          />
          <div className={styles.error}>
            {formErrors && <Error error={formErrors} />}
          </div>
          {isLoading ? (
            <Loader />
          ) : data && data.length <= 10 ? (
            <ListDataSeacrh data={data} />
          ) : (
            <PaginateComponent data={data} CardNode={ListDataSeacrh} />
          )}
        </div>
      </div>
    </>
  );
}

export default HotelRoomsSearch;
