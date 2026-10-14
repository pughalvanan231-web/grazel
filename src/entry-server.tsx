import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import AppProvidersAndRoutes from './AppProvidersAndRoutes';
import { products } from './data/products';

export { products };

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppProvidersAndRoutes />
      </StaticRouter>
    </React.StrictMode>
  );
}
