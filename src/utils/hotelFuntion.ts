import { ChangeEvent } from "react";
import { itemsImage } from "./InterfaceUtil";

//Удаление файлов
export function removeFile(name: string, funcSetImages: (arg0: { (prev: any): any; (prev: any): any; }) => void, funcSetImagrsFile: (arg0: (prev: File[]) => any) => void) {
    funcSetImagrsFile((prev: File[]) => prev.filter((file: { name: string; }) => file.name !== name));
    funcSetImages((prev: any[]) => prev.filter((file) => {
        return file.name ? file.name !== name : file !== name
    }));
}


//Обработка файлов при добавлении
export function onChange(e: ChangeEvent<HTMLInputElement>, imageFilesArr: File[], imagesArr: (string | itemsImage)[], funcSetImagesFiles: (arg0: { (prev: File[]): File[]; (prev: File[]): any[]; }) => void) {
    const { files } = e.target;
    if (files && files.length > 0) {
        for (let i = 0; i < files?.length; i++) {
            let file: any = files[i];
            if (imageFilesArr.length > 0) {
                let elem = imageFilesArr.find((item) => item.name === file?.name);
                let elenData = imagesArr.find((item) => item === file?.name);

                if (elem === undefined && elenData === undefined) {
                    if (file !== undefined) {
                        funcSetImagesFiles((prev: File[]) => [...prev, file]);
                    }
                }
            } else {
                funcSetImagesFiles((prev: File[]) => [...prev, file]);
            }
        }
    }
}

//Получение data url для превью

export function dataUrlImage(imageFilesArr: File[], imagesArr: (string | itemsImage)[], funcSetImages: (arg0: (prev: (string | itemsImage)[]) => (string | itemsImage)[]) => void, funcSetFormErrors: (arg0: any) => void) {
    const fileReaders: any = [];
    let isCancel = false;
    if (imageFilesArr.length) {
        const promises = imageFilesArr.map((file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const result = e.target?.result;
                    if (result) {
                        resolve({
                            url: result,
                            name: file.name,
                            id: file.name.slice(4, -4),
                        });
                    }
                };
                fileReader.onabort = () => {
                    reject(new Error("Загрузка файла прекращена"));
                };
                fileReader.onerror = () => {
                    reject(new Error("Ошибка при чтение файла"));
                };
                fileReader.readAsDataURL(file);
            });
        });
        Promise.all(promises)
            .then((image) => {
                if (!isCancel) {
                    image.forEach((itemImg: any) => {
                        let dataImg = imagesArr.find((item: any) => item.name === itemImg?.name);
                        let dataSrc = imagesArr.find((item) => item === itemImg?.name);
                        if (dataImg === undefined && dataSrc === undefined) {
                            funcSetImages((prev) => [...prev, itemImg]);
                        }
                    });
                }
            })
            .catch((reason) => {
                funcSetFormErrors(reason);
            });
    }
    return () => {
        isCancel = true;
        fileReaders.forEach(
            (fileReader: { readyState: number; abort: () => void }) => {
                if (fileReader.readyState === 1) {
                    fileReader.abort();
                }
            }
        );
    };
}

//Получение валидация Id в поиске
export function validateId(e: React.ChangeEvent<HTMLInputElement>, funcSetId: (arg0: string) => void, funcSetFormErrors: (arg0: string) => void): void {
    const value = e.target.value;
    if (value.length === 24) {
        funcSetId(value);
        funcSetFormErrors("");
    } else if (value.length === 0) {
        funcSetFormErrors("");
        funcSetId("");
    } else {
        funcSetId("");
        funcSetFormErrors("Id должен иметь 24 символа");
    }
}


export function validateInputNumber(value: string, setFunction: React.Dispatch<React.SetStateAction<number | string>>, funcSetFormErrors: React.Dispatch<React.SetStateAction<string>>) {
    value.trim() === "" ? funcSetFormErrors("") : funcSetFormErrors("");
    let regexp = /^[0-9]+$/;
    if (regexp.test(value)) {
        setFunction(Number(value));
    } else if (value.trim() !== "") {
        setFunction('');
        funcSetFormErrors("Введите число");
    } else {
        setFunction('');
    }
}


export function validateFormSearhHotelRoom(funcSetFormErrors: React.Dispatch<React.SetStateAction<string[]>>,
    id?: string, offset?: string, limit?: string, startDate?: Date | string, endDate?: Date | string,
) {
    let errorsArray = [];

    id && id.trim().length !== 24 && errorsArray.push("Id должен иметь 24 символа")

    if (offset) {
        offset.trim()
        let regexp = /^[0-9]+$/;
        !regexp.test(offset) && errorsArray.push("Введите число")
    }

    if (limit) {
        limit.trim()
        let regexp = /^[0-9]+$/;
        !regexp.test(limit) && errorsArray.push("Введите число")
    }

    startDate === '' && errorsArray.push("Укажите дату заезда")

    endDate === '' && errorsArray.push("Укажите дату выезда")

    startDate && endDate && startDate > endDate && errorsArray.push("Дата заезда не может быть раньше даты выезда")

    funcSetFormErrors(errorsArray)

    if (errorsArray.length === 0) {
        return true
    }
}

