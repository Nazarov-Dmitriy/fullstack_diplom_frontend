import React, { useState, useEffect } from "react";
import Sidebar from "src/components/sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { useParams } from "react-router-dom";
import { dataUrlImage } from "src/utils/hotelFuntion";
import { addShowModalImage } from "src/features/hotelSlice";
import styles from "./HoteRoomUpdate.module.less";
import Loader from "src/components/Loader/Loader";
import { hotelRoomAddSchema } from "src/utils/validateShemeHotel";
import {
  useGetHotelRoomQuery,
  useUpdateHotelRoomMutation,
} from "src/servises/API/hotelApi";
import FormUpdate from "src/components/hotel/FormUpdate/FormUpdate";
import Error from "src/components/Error/Error";

function HoteRoomUpdate() {
  let { id } = useParams();
  const { showModalImageState } = useAppSelector((state) => state.hotel);
  const { user, authenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [imageModal, setImageModal] = useState<string | null>("");
  const { isLoading, data, error, refetch } = useGetHotelRoomQuery(id);
  const [postUpdateHotelRoom, { isSuccess, isLoading: isLoading2 }] =
    useUpdateHotelRoomMutation();

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

  useEffect(() => {
    data && setDescription(data.description);
    data && data.images[0] !== "" && setImages(data.images);
  }, [data]);

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

  // Отпрака формы
  async function onSubmit() {
    await hotelRoomAddSchema
      .validate({ description, imageFiles, images }, { abortEarly: false })
      .then(async () => {
        try {
          setFormErrors([]);
          await postUpdateHotelRoom({
            id: id ? id : "",
            hotelId: data.hotel.id,
            description,
            imageFiles,
            images: images.map((item): any => {
              return typeof item === "string" ? item : item.name;
            }),
          }).unwrap();
        } catch (err: any) {
          setFormErrors([]);
          setFormErrors(err?.data?.error);
        }
      })
      .catch((e) => {
        setFormErrors([e.errors]);
      });
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wraper}>
        <h3 className={styles.title}>Редактировать номер отеля</h3>
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
              url={
                process.env.REACT_APP_URL_STATIC +
                `hotel-room/${data.hotel.id}/`
              }
              isLoading={isLoading2}
              onSubmit={onSubmit}
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
  );
}

export default HoteRoomUpdate;
