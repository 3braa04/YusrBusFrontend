import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";
import "./index.css";
import ErrorBoundary from "./app/features/Error/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Oops! Try refreshing the page.</p>}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
