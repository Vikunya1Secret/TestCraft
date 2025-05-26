import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import Test from "./pages/Test";
import TestCreator from "./pages/CreateTest";
import TestManagementPage from "./pages/MyTests";
import TestRegistrationForm from "./pages/TestRegistration";
import StudentTest from "./pages/StudentTest";
import PrivateRoute from "./components/Protect";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test-registration" element={<TestRegistrationForm />} />
        <Route path="/start-test" element={<StudentTest />} />
        <Route element={<PrivateRoute />}>
          <Route path="/test" element={<Test />} />
          <Route path="/create" element={<TestCreator />} />
          <Route path="/test-management" element={<TestManagementPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
