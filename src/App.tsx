import ResponsiveLayout from './components/ResponsiveLayout';
// import { RouterProvider, createRouter } from '@tanstack/react-router';
// import { routeTree } from './routeTree.gen';

// const router = createRouter({ routeTree });

function App() {
  return (
    <ResponsiveLayout>
      <div>서비스 중단</div>
      {/* <RouterProvider router={router} /> */}
    </ResponsiveLayout>
  );
}

export default App;
