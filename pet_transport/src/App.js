import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function App() {

  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <div>
        < Navbar />

      <div className="major_routes">
        <button onClick={() => handleClick("/Foster")}>
          Foster Home
        </button>
        <button onClick={() => handleClick("/Transport")}>
          Pet Transport
        </button>

        <button onClick={() => handleClick("/Vet")}>
          Vet Service
        </button>

        <br /> <br />
        
        <button onClick={() => handleClick("/Grooming")}>
          Pet Grooming
        </button>

        <button onClick={() => handleClick("/Accessories")}>
          Pet Accessories
        </button>


        <button onClick={() => handleClick("/Food")}>
          Pet Food
        </button>


      </div>
    </div>
  );
}

export default App;
