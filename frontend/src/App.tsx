import { BrowserRouter } from "react-router-dom";
import AppProvidersAndRoutes from "./AppProvidersAndRoutes";

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AppProvidersAndRoutes />
  </BrowserRouter>
);

export default App;
