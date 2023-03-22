import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DefaultProps, RouterElement } from '../../utils';

type RouterLayoutProps = DefaultProps & {
  router: RouterElement;
};

const APP_TITLE = 'Owls Letters';

const RouterLayout = ({ router, children }: RouterLayoutProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (router.path === pathname) {
      document.title = ` ${router?.meta?.title || ''} - ${APP_TITLE}`;
    }
  }, [pathname]);

  return <div>{children}</div>;
};

export default RouterLayout;
