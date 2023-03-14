import * as yup from "yup";

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/png",
];

  

export function validateType(files?: [File]): boolean {
    let valid = true;
    if (files) {
        files.forEach((file) => {
            if (!SUPPORTED_FORMATS.includes(file.type)) {
                valid = false;
            }
        });
    }
    return valid;
}

export function validateSize(files?: [File]): boolean {
    let valid = true;
    if (files) {
        files.reduce(function (sum: number, current: File) {
            if (sum + current.size >= 10240000) {
                valid = false;
            }
            return sum + current.size;
        }, 0);
    }

    return valid;
}

export const validationSchema = yup.object({
    title: yup
      .string()
      .required("Название должно быть заполнено")
      .min(5, "Название отель минимум 5 симолов"),
  
    description: yup
      .string()
      .required("Описание должно быть заполнено")
      .min(100, "Описание отель минимум 100 симолов"),
  
    imageFiles: yup
      .mixed()
      .test(
        "Проверка типа изображения",
        "Не правильный формат изображения ,  разрещенный формат jpg/ jpeg/webp/png",
        validateType
      )
      .test(
        "Проверка размера изображения",
        "Максимальный размер изображений 10мб, удалите лишние картинки",
        validateSize
      ),
      images: yup.array()
      .max(10, "Максимум 10 фотографий")
      .min(1, "Минимум 1 фотография")
  });

  export const hotelRoomAddSchema = yup.object({
    description: yup
      .string()
      .required("Описание должно быть заполнено")
      .min(100, "Описание отель минимум 100 симолов"),
  
    imageFiles: yup
      .mixed()
      .test(
        "Проверка типа изображения",
        "Не правильный формат изображения ,  разрещенный формат jpg/ jpeg/webp/png",
        validateType
      )
      .test(
        "Проверка размера изображения",
        "Максимальный размер изображений 10мб, удалите лишние картинки",
        validateSize
      ),
      images: yup.array()
      .max(10, "Максимум 10 фотографий")
      .min(1, "Минимум 1 фотография")
  });

 export const hotelAddSchema = yup.object({
    title: yup
      .string()
      .required("Название должно быть заполненно")
      .min(5, "Название должен быть больше 6 символов"),
    description: yup
      .string()
      .required("Описание должно быть заполненно")
      .min(6, "Описание должен быть больше 6 символов"),
  });