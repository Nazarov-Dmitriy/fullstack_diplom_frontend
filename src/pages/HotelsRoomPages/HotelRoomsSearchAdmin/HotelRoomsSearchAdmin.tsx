import React, { KeyboardEvent, useState, useEffect } from "react";
import { useAppSelector } from "src/app/hooks";
import SearchAdminNode from "src/components/hotel/SearchAdminNode/SearchAdminNode";
import Loader from "src/components/Loader/Loader";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import Sidebar from "src/components/sidebar/Sidebar";
import ISearchHotelRooms from "src/models/ISearchHotelRooms";
import { useGetSearchAdminHotelRoomsQuery } from "src/servises/API/hotelApi";
import styles from "./HotelRoomsSearchAdmin.module.less";

function HotelRoomsSearchAdmin() {
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState("");
  const [id, setId] = useState("");
  const [offset, setOffset] = useState("");
  const [limit, setLimit] = useState("");
  const [searchParams, setSearchParams] = useState<ISearchHotelRooms>({
    id,
    offset,
    limit
  });
  const { isLoading, data, error, refetch } =
    useGetSearchAdminHotelRoomsQuery(searchParams);
  const [searchFlag, setSearchFlag] = useState(false);

  console.log(data);

  function validateInput(value: string, setFunction: Function) {
    value.trim() === "" ? setFormErrors("") : setFormErrors("");
    let regexp = /^[0-9]+$/;
    if (regexp.test(value)) {
      setFunction(Number(value));
    } else if (value.trim() !== "") {
      setFunction("");
      setFormErrors("Введите число");
    } else {
      setFunction("");
    }
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  const keyPressSubmit = (e: KeyboardEvent) =>
    e.key === "Enter" ? onSubmit() : setSearchFlag(false);

  function onSubmit() {
    setSearchFlag(true);
  }

  useEffect(() => {
    searchFlag && setSearchParams({ id: id, offset: offset, limit: limit });
  }, [limit, offset, searchFlag, id]);

  useEffect(() => {
    if (error) {
      let err: any = error;
      setFormErrors(err.data.message);
    } else {
      setFormErrors("");
    }
  }, [error]);

  function validateId(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    if (value.length === 24) {
      setId(value);
    } else if (value.length === 0) {
      setFormErrors("");
      setId("");
    } else {
      setId("");
      setFormErrors("Id должен иметь 24 символа");
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
              <form className={styles.form}>
                <label
                  className={`${styles.form_label} ${styles.form_label_title} `}
                >
                  <p className={styles.label_text}>Id Отеля</p>
                  <input
                    className={styles.form_input}
                    type="text"
                    placeholder="Поиск..."
                    name="title"
                    onChange={(e) => validateId(e)}
                    onKeyDown={keyPressSubmit}
                  />
                </label>

                <label className={`${styles.form_label} `}>
                  <p className={styles.label_text}>Поиск с</p>
                  <input
                    className={`${styles.form_input} ${styles.offset}`}
                    type="text"
                    name="offset"
                    onChange={(e) => validateInput(e.target.value, setOffset)}
                    onKeyDown={keyPressSubmit}
                  />
                </label>

                <label className={styles.form_label}>
                  Количество
                  <input
                    className={`${styles.form_input} ${styles.limit}`}
                    type="text"
                    name="limit"
                    onChange={(e) => validateInput(e.target.value, setLimit)}
                    onKeyDown={keyPressSubmit}
                  />
                </label>

                <button
                  className={styles.form_btn}
                  disabled={isLoading}
                  type="button"
                  onClick={onSubmit}
                >
                  Поиск
                </button>
              </form>
              <div className={styles.error}>
                {formErrors && (
                  <p className={styles.text_error}>{formErrors}</p>
                )}
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
