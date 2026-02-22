import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/app.tsx";
import ErrorBoundary from "./app/features/error/errorBoundary.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
