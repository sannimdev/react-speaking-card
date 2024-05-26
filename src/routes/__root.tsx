import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { css } from '../../styled-system/css';

const routeBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
};

const isDevelopmentMode = process.env.NODE_ENV === 'development';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className={css(routeBoxStyle)}>
        <Outlet />
      </div>

      {isDevelopmentMode && <TanStackRouterDevtools />}
    </>
  ),
});
