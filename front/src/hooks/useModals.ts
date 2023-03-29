import { useContext } from 'react';
import { ModalDispatchContext, ModalEventProps } from '../context/ModalContext';

const useModals = () => {
  const { open, close } = useContext(ModalDispatchContext);

  const openModal = (Component: React.ElementType, props?: ModalEventProps) => {
    open(Component, props);
  };

  const closeModal = (Component: React.ElementType) => {
    close(Component);
  };

  return { openModal, closeModal };
};

export default useModals;
