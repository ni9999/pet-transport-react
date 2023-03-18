import React from 'react';
import './Navbar.css';
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function UserNav () {
    const [user] = useAuthState(auth);
    const [name, setName] = useState("");
  
  
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
      }
    };
    
    const navigate = useNavigate();

    function handleClick(path) {
        navigate(path);
    }

    if(user) {
        fetchUserName();
        return (<button onClick={() => handleClick("/Dashboard")}>{name}</button>);
    }

    return (<button onClick={() => handleClick("/Login")}>Login</button>);
}


function Navbar() {


  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </div>
      <ul className="navbar-links">
          <UserNav />
      </ul>
    </nav>
  );
}

export default Navbar;