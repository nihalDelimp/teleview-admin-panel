import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import CommonLayout from "./layout/CommonLayout";
import Login from "./components/login";
import Movies from "./pages/AddMovie";
import AllMovies from "./pages/AllMovies";
// import AddBanner from "./pages/AddBanner";
import EditMovie from "./pages/EditMovie";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/movies"
            element={
              <CommonLayout>
                <AllMovies />
              </CommonLayout>
            }
          />
          <Route
            path="/home"
            element={
              <CommonLayout>
                <Home />
              </CommonLayout>
            }
          />
          <Route
            path="/add-movie"
            element={
              <CommonLayout>
                <Movies />
              </CommonLayout>
            }
          />
          <Route
            path="/edit-movie"
            element={
              <CommonLayout>
                <EditMovie />
              </CommonLayout>
            }
          />
          {/* <Route
            path="/add-banner"
            element={
              <CommonLayout>
                <AddBanner />
              </CommonLayout>
            }
          /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
