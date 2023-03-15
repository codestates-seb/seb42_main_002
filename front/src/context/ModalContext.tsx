import {createContext, ReactNode, useCallback, useContext, useMemo, useState,} from 'react';
import Modal from '../components/Common/Modal/Modal';

// 열릴 모달을 설정하는 객체 타입
export type SetOpenModalProps = {
  Component: React.ElementType;
  props?: ModalEventProps;
};

// 모달에서 발생하는 이벤트를 설정하는 객체 타입
export type ModalEventProps = {
  onSubmit?: (...props: any) => void;
  onClose?: () => void;
  onCustom?: (...props: any) => void;
};

type ModalStateContextProps = {
  openModals: SetOpenModalProps[];
};

type ModalDispatchContextProps = {
  open: (Component: React.ElementType, props?: ModalEventProps) => void;
  close: (Component: React.ElementType) => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

// 모달들의 상태를 관리하는 context
export const ModalStateContext = createContext<ModalStateContextProps>({
  openModals: [],
});

// 모달들을 열거나, 닫는 함수를 관리하는 context.
export const ModalDispatchContext = createContext<ModalDispatchContextProps>({
  open: () => undefined,
  close: () => undefined,
});

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [openModals, setOpenModals] = useState<SetOpenModalProps[]>([]);

  const open = useCallback(
    (Component: React.ElementType, props: ModalEventProps = {}) => {
      setOpenModals((prevState) => [...prevState, { Component, props }]);
    },
    []
  );

  const close = useCallback((Component: React.ElementType) => {
    setOpenModals((prevState) =>
      prevState.filter((modal) => modal.Component !== Component)
    );
  }, []);

  const memoizedState = useMemo(
    () => ({
      openModals,
    }),
    [openModals]
  );

  const memoizedDispatch = useMemo(
    () => ({
      open,
      close,
    }),
    []
  );

  return (
    <ModalStateContext.Provider value={memoizedState}>
      <ModalDispatchContext.Provider value={memoizedDispatch}>
        {children}
        <Modal />
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export const useModalStateContext = (): ModalStateContextProps =>
  useContext(ModalStateContext);

export const useModalDispatchContext = (): ModalDispatchContextProps =>
  useContext(ModalDispatchContext);

export default ModalProvider;
