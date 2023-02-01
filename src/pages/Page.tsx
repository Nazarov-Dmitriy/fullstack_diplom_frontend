import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { RootState } from "src/app/store";
import  modal, { addShowModal }  from "src/features/modalSlice";

type PageProps = {
  children: React.ReactNode;
};

const Page = (props: PageProps) => {
  const {showModalState} = useAppSelector(state=>state.modal);
  const dispatch = useAppDispatch();


  const onModalClose = (e: SyntheticEvent) => {
    const target = e.target as HTMLElement;

    if(target.closest("#modal_form") === null && showModalState){
      dispatch(addShowModal(false))
    }
  };

  return <div onClick={(e) => onModalClose(e)}>{props.children}</div>;
};

export default Page;
