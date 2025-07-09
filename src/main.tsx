import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "./index.css";
import { ZeroProvider } from "./providers";
import { router } from "./lib/router";

function App() {
  return (
    <ZeroProvider>
      <RouterProvider router={router} />
    </ZeroProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
