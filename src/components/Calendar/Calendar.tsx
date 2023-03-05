import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendatr.module.less";
import {
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  areIntervalsOverlapping,
} from "date-fns";
import Error from "../Error/Error";

function CalendarComponent({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  reservations,
}: {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  reservations: any;
}) {
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [disabledRanges] = useState<any>(reservations ? reservations : []);

  useEffect(() => {
    if (startDate && endDate && isWithinRangesDisabled()) {
      setStartDate(null);
      setEndDate(null);
      setFormErrors([
        "Выбирите корректную дату, период содержит забронированые дни",
      ]);
    }
  }, [startDate, endDate, isWithinRangesDisabled, setStartDate, setEndDate]);

 
  function formatDate(date: string): Date {
    return new Date(
      +date.substring(0, 4),
      +date.substring(5, 7) - 1,
      +date.substring(8, 10)
    );
  }

  function onChangeStart(value: Date) {
    setFormErrors([]);
    if (endDate) {
      if (value < endDate) {
        setStartDate(value);
      } else {
        setFormErrors(["Дата заезда больше даты выезда"]);
        setStartDate(null);
        setEndDate(null);
      }
    }
    endDate === null && setStartDate(value);
  }

  function onChangeEnd(value: Date) {
    setFormErrors([]);
    if (startDate) {
      if (value > startDate) {
        setEndDate(value);
      } else {
        setFormErrors(["Дата выезда больше даты заезда"]);
        setStartDate(null);
        setEndDate(null);
      }
    }
    startDate === null && setEndDate(value);
  }

  //Проверка интервалов
  function isWithinRanges(date: number | Date, ranges: any[]) {
    return ranges.some((range) =>
      isWithinInterval(date, {
        start: formatDate(range[0]),
        end: formatDate(range[1]),
      })
    );
  }

  //Проверка интервалов на забронированные дни
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function isWithinRangesDisabled() {
    let result;
    if (startDate && endDate && disabledRanges) {
      disabledRanges.forEach((item: any[]) => {
        let res = areIntervalsOverlapping(
          { start: startDate, end: endDate },
          { start: formatDate(item[0]), end: formatDate(item[1]) }
        );
        if (res === true) {
          result = res;
        }
      });
    }
    return result;
  }

  //Забранорованые дни
  function tileDisabled({ date }: { date: Date }): boolean {
    return isWithinRanges(date, disabledRanges);
  }

  //Выбранные дни бронирования
  function tileClassName({ date }: { date: Date }) {
    if (startDate && endDate) {
      let selectRanges = eachDayOfInterval({
        start: startDate,
        end: endDate,
      });
      if (selectRanges.find((dDate: number | Date) => isSameDay(dDate, date))) {
        return styles["select"];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.calendar_wrapper}>
        <div className={styles.calendar_start}>
          <p>Дата заезда</p>
          <Calendar
            onChange={(value: Date) => onChangeStart(value)}
            value={startDate}
            minDate={new Date()}
            tileDisabled={tileDisabled}
            tileClassName={
              startDate && endDate && !isWithinRangesDisabled()
                ? tileClassName
                : undefined
            }
          />
        </div>
        <div className={styles.calendar_end}>
          <p>Дата заезда</p>
          <Calendar
            onChange={(value: Date) => onChangeEnd(value)}
            value={endDate}
            minDate={new Date()}
            tileDisabled={tileDisabled}
            tileClassName={
              startDate && endDate && !isWithinRangesDisabled()
                ? tileClassName
                : undefined
            }
          />
        </div>
      </div>

      <Error error={formErrors} />
    </div>
  );
}

export default CalendarComponent;
