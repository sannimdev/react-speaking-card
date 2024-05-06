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
        <h1>
          <Link to="/">구술 암기</Link>
        </h1>
        <Outlet />
      </div>

      {isDevelopmentMode && <TanStackRouterDevtools />}
    </>
  ),
});
