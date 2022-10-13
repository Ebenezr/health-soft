import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./Pages/Login";
import Signin from "./components/Forms/signin";
import PasswordRecovery from "./components/Forms/passwordrecovery";
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={client}>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="///" element={<Signin />} />
            <Route path="recover" element={<PasswordRecovery />} />
            <Route path="signin" element={<Signin />} />
          </Route>

          <Route path="/login" element={<Login />}>
            <Route path="/login/" element={<Signin />} />
            <Route path="signin" element={<Signin />} />
            <Route path="recover" element={<PasswordRecovery />} />
          </Route>
          <Route path="/home/*" element={<App />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
