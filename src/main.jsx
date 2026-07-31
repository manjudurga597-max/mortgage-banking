import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import ThemeProvider from "./ThemeContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>

        <ThemeProvider>

            <Provider store={store}>

                <BrowserRouter>

                    <App />

                </BrowserRouter>

            </Provider>

        </ThemeProvider>

    </StrictMode>
);