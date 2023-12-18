import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./pages/Layout";
import ListComponent from "./pages/List";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import Dashboard from "./pages/dashboard/dashboard";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* remained it for home page */}
          {/* <Route
            path="/"
            element={
                <Dashboard />
            }
          /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <ListComponent />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
