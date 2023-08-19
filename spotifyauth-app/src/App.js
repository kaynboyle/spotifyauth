import React, { FC } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Home from "./components/Home";

import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Home/>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>

      </Router>
    </div>
  );
};

export default App;