import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import Loader from "src/components/Loader/Loader";
import Sidebar from "src/components/sidebar/Sidebar";
import { addShowModalImage } from "src/features/hotelSlice";
import {
  useGetHotelAdminQuery,
  useUpdateHotelMutation,
} from "src/servises/API/hotelApi";
import styles from "./HotelUpdate.module.less";
import { dataUrlImage } from "src/utils/hotelFuntion";
import { validationSchema } from "src/utils/validateShemeHotel";
import Error from "src/components/Error/Error";
import FormUpdate from "src/components/hotel/FormUpdate/FormUpdate";

function HotelUpdate() {
  let { id } = useParams();
  const { user, authenticated } = useAppSelector((state) => state.user);
  const { showModalImageState } = useAppSelector((state) => state.hotel);
  const dispatch = useAppDispatch();
  const { isLoading, data, error, refetch } = useGetHotelAdminQuery(id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [imageModal, setImageModal] = useState<string | null>("");
  const [updateHotel, { isSuccess, isLoading: isLoading2 }] =
    useUpdateHotelMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  //   Обрабока ошибок с сервера
  useEffect(() => {
    if (error) {
      let err: any = error;
      setFormErrors([err.data?.message || err.error]);
    } else {
      setFormErrors([]);
    }
  }, [error]);

  //Сохранение данных с сервера
  useEffect(() => {
    data && setTitle(data.title);
    data && setDescription(data.description);
    data && data.images[0] !== "" && setImages(data.images);
  }, [data]);

  //Получение data url для превью
  useEffect(() => {
    dataUrlImage(imageFiles, images, setImages, setFormErrors);
  }, [imageFiles, images]);

  //useEffect работы с модальным окном
  useEffect(() => {
    showModalImageState === false && setImageModal("");
    imageModal === "" && dispatch(addShowModalImage(false));
  }, [dispatch, imageModal, showModalImageState]);

  //Добавление data url для фотографии модального окна
  function modalImage(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const target = e.target as HTMLImageElement;
    setImageModal(target.getAttribute("src"));
    dispatch(addShowModalImage(true));
  }

  //Отправка и валидация формы
  async function onSubmit() {
    await validationSchema
      .validate(
        { title, description, imageFiles, images },
        { abortEarly: false }
      )
      .then(async () => {
        try {
          setFormErrors([]);
          await updateHotel({
            id: id ? id : "",
            body: {
              title,
              description,
              imageFiles,
              imagesSrc: images.map((item): any => {
                return typeof item === "string" ? item : item.name;
              }),
            },
          }).unwrap();
          refetch();
        } catch (err: any) {
          setFormErrors(err?.data?.error);
        }
      })
      .catch((e) => {
        setFormErrors(e.errors);
      });
  }

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.hotel}>
          <h2 className={styles.title}>Редактировать отель</h2>
          {authenticated && user.role === "admin" ? (
            isLoading ? (
              <Loader />
            ) : (
              <FormUpdate
                data={data}
                setDescription={setDescription}
                imageModal={imageModal}
                setImageModal={setImageModal}
                images={images}
                setImages={setImages}
                setImageFiles={setImageFiles}
                imageFiles={imageFiles}
                modalImage={modalImage}
                isLoading={isLoading2}
                onSubmit={onSubmit}
                url={process.env.REACT_APP_URL_STATIC + `hotel/${id}/`}
                components={"hotel"}
                setTitle={setTitle}
              />
            )
          ) : (
            <h3>Для продолжения работы требуеться авторизация </h3>
          )}
          <div className={styles.error}>
            {formErrors && <Error error={formErrors} />}
          </div>
          <div>
            {isSuccess && formErrors.length === 0 && (
              <p>данные успешно изменены</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelUpdate;
