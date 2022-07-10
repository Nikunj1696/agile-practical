import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../Components/Global/header";

const Home = React.lazy(() => import("../Components/Home"));
const Login = React.lazy(() => import("../Components/Login"));
const Dashboard = React.lazy(() => import("../Components/Dashboard"));

const RoutesList = () => {
  return (
    <Router>
      <main className="main" id="main">
        <NavBar />
          <Suspense fallback={<div>Component Loading</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
      </main>
    </Router>
  );
};

export default RoutesList;
