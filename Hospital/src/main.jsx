import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from './login.jsx'
import Dashboard from './views/Dashboard.jsx'

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let dashboardElement;

  if (isLoggedIn) {
    dashboardElement = <Dashboard />;
  } else {
    dashboardElement = <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Login setIsLoggedIn={setIsLoggedIn} />}
      />

      <Route
        path="/dashboard"
        element={dashboardElement}
      />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>
);