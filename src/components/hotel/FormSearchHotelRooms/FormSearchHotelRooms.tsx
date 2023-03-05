import React from "react";
import styles from "./FormSearchHotelRooms.module.less";
import { useAppSelector } from "src/app/hooks";

function FormSearchHotelRooms({
  setId,
  setOffset,
  setLimit,
  keyPressSubmit,
  setStartDate,
  setEndDate,
  onSubmit,
  startDate,
  endDate,
}: {
  setId: React.Dispatch<React.SetStateAction<string>>;
  setOffset: React.Dispatch<React.SetStateAction<string>>;
  setLimit: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string | Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<string | Date>>;
  keyPressSubmit: any;
  onSubmit: any;
  startDate: any;
  endDate: any;
}) {
  const { user, authenticated } = useAppSelector((state) => state.user);

  function clearDate() {
    setStartDate("");
    setEndDate("");
  }
  return (
    <form className={styles.form}>
      <div className={styles.form_search_group}>
        <label className={`${styles.form_label} ${styles.form_label_id} `}>
          <p className={styles.label_text}>Id Отеля</p>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Поиск..."
            onChange={(e) => setId(e.target.value)}
            onKeyDown={keyPressSubmit}
          />
        </label>

        {authenticated && user.role === "admin" ? (
          <>
            <label className={`${styles.form_label} `}>
              <p className={styles.label_text}>Поиск с</p>
              <input
                className={`${styles.form_input} ${styles.offset}`}
                type="text"
                onChange={(e) => setOffset(e.target.value)}
                onKeyDown={keyPressSubmit}
              />
            </label>

            <label className={styles.form_label}>
              Количество
              <input
                className={`${styles.form_input} ${styles.limit}`}
                type="text"
                onChange={(e) => setLimit(e.target.value)}
                onKeyDown={keyPressSubmit}
              />
            </label>
          </>
        ) : null}
      </div>
      <div className={styles.form_search_group}>
        <div className={styles.wraper}>
          <label className={styles.form_label}>
            <p className={styles.label_text_data}> Дата заезда</p>
            <input
              className={`${styles.form_input} ${styles.form_label_data}`}
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              onKeyDown={keyPressSubmit}
              value={startDate}
            />
          </label>

          <label className={styles.form_label}>
            <p className={styles.label_text_data}> Дата выезда</p>
            <input
              className={`${styles.form_input} ${styles.form_label_data}`}
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              onKeyDown={keyPressSubmit}
              value={endDate}
            />
          </label>
        </div>
        <button
          className={styles.form_btn}
          type="button"
          onClick={() => clearDate()}
        >
          Очистить дату
        </button>
        <button
          className={styles.form_btn}
          type="button"
          onClick={(e) => onSubmit(e)}
        >
          Поиск
        </button>
      </div>
    </form>
  );
}

export default FormSearchHotelRooms;
