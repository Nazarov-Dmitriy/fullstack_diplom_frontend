import React, { KeyboardEvent, useState, useEffect } from "react";
import { useAppSelector } from "src/app/hooks";
import Error from "src/components/Error/Error";
import FormSearchAdmin from "src/components/hotel/FormSearchAdmin/FormSearchAdmin";
import SearchAdminNode from "src/components/hotel/SearchAdminNode/SearchAdminNode";
import Loader from "src/components/Loader/Loader";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import Sidebar from "src/components/sidebar/Sidebar";
import ISearchHotelRooms from "src/models/ISearchHotelRooms";
import { useGetSearchAdminHotelRoomsQuery } from "src/servises/API/hotelApi";
import { validateFormSearhHotelRoom } from "src/utils/hotelFuntion";
import styles from "./HotelRoomsSearchAdmin.module.less";

function HotelRoomsSearchAdmin() {
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [id, setId] = useState("");
  const [offset, setOffset] = useState("");
  const [limit, setLimit] = useState("");
  const [searchParams, setSearchParams] = useState<ISearchHotelRooms>({
    id,
    offset,
    limit,
  });
  const { isLoading, data, error, refetch } =
    useGetSearchAdminHotelRoomsQuery(searchParams);

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
    if (validateFormSearhHotelRoom(setFormErrors, id, offset, limit) === true) {
      setSearchParams({
        id: id,
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
          <h2 className={styles.title}>Номера</h2>
          {authenticated && user.role === "admin" ? (
            <div>
              <FormSearchAdmin
                setId={setId}
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
                <SearchAdminNode data={data} search={"hotel rooms"} />
              ) : (
                <PaginateComponent
                  data={data}
                  CardNode={SearchAdminNode}
                  search={"hotel rooms"}
                />
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

export default HotelRoomsSearchAdmin;
