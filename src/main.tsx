import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";

import "./index.css";
import App from "./App";
import { schema } from "../zero-schema.gen";

const z = new Zero({
  userID: "anon",
  server: "http://localhost:4848",
  schema,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ZeroProvider zero={z}>
      <App />
    </ZeroProvider>
  </StrictMode>
);
