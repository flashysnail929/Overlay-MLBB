import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "./components/ui/toast";
import { RouterProvider } from "react-router";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </StrictMode>,
);
