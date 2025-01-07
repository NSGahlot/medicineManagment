import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import MedicineContextProvider from "./context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MedicineContextProvider>
      <App />
    </MedicineContextProvider>
  </StrictMode>
);
