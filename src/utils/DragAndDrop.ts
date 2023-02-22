import { itemsImage } from "./InterfaceUtil";

//Drag and Drop
export function dragStartHandle(e: React.DragEvent<HTMLDivElement>, idx: number) {
    e.dataTransfer.setData("index", `${idx}`);
}

//Drag and Drop
export function dragStartEnd(e: React.DragEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement;
    target.style.opacity = "1";
}

//Drag and Drop
export function dragStartOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    target.style.opacity = "0.6";
}

//Drag and Drop
export function dropHandler(e: React.DragEvent<HTMLDivElement>, idx: number, imagesArr: (string | itemsImage)[], funcSetImages: (arg0: (string | itemsImage)[]) => void, funcSetImageFiles?: ((arg0: File[]) => void), filesArr?: File[],) {
    e.preventDefault();
    const idxCurrent = e.dataTransfer.getData("index");

    const items: (string | itemsImage)[] = imagesArr.slice();
    const [reorderedItem] = items.splice(Number(idxCurrent), 1);

    reorderedItem && items.splice(idx, 0, reorderedItem);
    funcSetImages(items); 
}