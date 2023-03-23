import { useContext } from 'react';
import {
  ModalDispatchContext,
  ModalStateContext,
  SetOpenModalProps,
} from '../../../context/ModalContext';

const Modal = () => {
  const { openModals } = useContext(ModalStateContext);
  const { close } = useContext(ModalDispatchContext);

  return (
    <>
      {openModals.map((modal: SetOpenModalProps, index: number) => {
        const { Component, props } = modal;

        const onCloseHandler = () => {
          close(Component);
        };
        const onSubmitHandler = () => {
          if (typeof props?.onSubmit === 'function') {
            props?.onSubmit();
          }
          onCloseHandler();
        };

        return (
          <Component
            key={index}
            onClose={onCloseHandler}
            onSubmit={onSubmitHandler}
          />
        );
      })}
    </>
  );
};

export default Modal;
