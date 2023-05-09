import React from 'react';
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Box, Typography } from '@mui/material';

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




function UserNav () {


    if(user) {
        fetchUserName();
        return (<Button onClick={() => handleClick("/Dashboard")}>{name}</Button>);
    }

    return (<Button onClick={() => handleClick("/Login")}>Login</Button>);
}


function Navbar() {


  return (
    <AppBar position = 'static' sx={{ bgcolor: '#333333' }}>
      <Typography variant="h6" component="div" sx={{ color: '#ffffff', marginLeft: '20px' }}>
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </Typography>

      <Box sx={{ marginLeft: 'auto' }}>
        <UserNav />      
      </Box>
    </AppBar>
  );
}

export default Navbar;