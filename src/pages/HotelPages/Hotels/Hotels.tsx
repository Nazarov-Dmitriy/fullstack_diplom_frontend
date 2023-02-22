import React, { KeyboardEvent, useState, useEffect } from "react";
import { useAppSelector } from "src/app/hooks";
import SearchAdminNode from "src/components/hotel/SearchAdminNode/SearchAdminNode";
import Loader from "../../../components/Loader/Loader";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import Sidebar from "src/components/sidebar/Sidebar";
import { useGetSearchAdminHotelQuery } from "src/servises/API/hotelApi";
import styles from "./Hotels.module.less";

interface Params {
  title: string;
  offset: number | string;
  limit: number | string;
}

function Hotels() {
  const { user, authenticated } = useAppSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState("");
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
  const [searchFlag, setSearchFlag] = useState(false);

  function validateInput(value: string, setFunction: Function) {
    value.trim() === "" ? setFormErrors("") : setFormErrors("");
    let regexp = /^[0-9]+$/;
    if (regexp.test(value)) {
      setFunction(Number(value));
    } else if (value.trim() !== "") {
      setFormErrors("Введите число");
    } else {
      setFunction("");
    }
  }

  useEffect(() => {
    refetch()
  },[refetch]) 

  const keyPressSubmit = (e: KeyboardEvent) =>
    e.key === "Enter" ? onSubmit() : setSearchFlag(false);

  function onSubmit() {
    setSearchFlag(true);
  }

  useEffect(() => {
    searchFlag &&
      setSearchParams({ title: title, offset: offset, limit: limit });
  }, [limit, offset, searchFlag, title]);

  useEffect(() => {
    if (error) {
      let err: any = error;
      setFormErrors(err.data.message);
    } else {
      setFormErrors("");
    }
  }, [error]);

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.hotel}>
          <h2 className={styles.title}>Гостиницы</h2>
          {authenticated && user.role === "admin" ? (
            <div>
              <form className={styles.form}>
                <label
                  className={`${styles.form_label} ${styles.form_label_title} `}
                >
                  <p className={styles.label_text}>Название</p>
                  <input
                    className={styles.form_input}
                    type="text"
                    placeholder="Поиск..."
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
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
