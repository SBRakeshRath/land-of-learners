import "./App.css";
// import "sass/import.scss"
import "style/import.scss";
import CSRFTOKEN from "g-components/contexts/CSRFTOKEN";
import React from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "components/login/login";
import Dashboard from "components/dashboard/dashboard";

import SignUpRoute from "components/signup/route";
import { useSelector, useDispatch } from "react-redux";

function App() {
  // error handling
  const navigate = useNavigate();

  const errorReducer = useSelector((state) => state.errorReducer);

  React.useLayoutEffect(() => {
    if (errorReducer.status === 401) {
      navigate("/");
    }
  }, [errorReducer]);

  return (
    <CSRFTOKEN>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="signup/*" element={<SignUpRoute />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </div>
    </CSRFTOKEN>
  );
}

export default App;
