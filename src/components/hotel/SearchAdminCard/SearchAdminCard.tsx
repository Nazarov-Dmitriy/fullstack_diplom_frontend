import React from "react";
import { useNavigate } from "react-router-dom";
import ISearchAdmin from "src/models/ISearchAdmin";
import styles from "./SearchAdminCard.module.less";

function SearchAdminCard({ id, title, description }: ISearchAdmin) {
  const navigate = useNavigate();

  const onSubmit= (id:string)=> {
    navigate(`/hotel/update/${id}`)    
  }

  return (
    <div className={styles.card} id={id}>
      <p className={styles.title}> Отель: {title}</p>
      <p  className={styles.description}>
        Описание:
        {description.length < 30
          ? description
          : description.slice(0, 30) + "..."}
      </p>
      <div>
        <button className={styles.btn} onClick={()=>onSubmit(id)}>Редактировать</button>
      </div>
    </div>
  );
}

export default SearchAdminCard;
