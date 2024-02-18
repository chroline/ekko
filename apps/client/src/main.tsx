import { ThemeProvider } from "@material-tailwind/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import React from "react";

import theme from "~/lib/theme.ts";

import App from "./App.tsx";
import "./font.css";
import "./globals.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <ThemeProvider value={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </>
);
