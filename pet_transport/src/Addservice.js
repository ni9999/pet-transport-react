import "./App.css";
import { auth, db } from "./firebase";
import React, { useState, useEffect } from "react";
import { query, collection, where, getDocs, addDoc  } from "firebase/firestore";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./login";




function Addservice () {


    
    const locations = useLocation();
    const service = locations.state.service;
    const navigate = useNavigate();


    const [user] = useAuthState(auth);
    const [username, setUserName] = useState("");
    const [uid, setUid] = useState("");
  
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setUserName(data.name);
        setUid(user?.uid);
      } catch (err) {
        console.error(err);
      }
    };



    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");


    const handleSubmit = async (event) => { 
      try {
        const ref = await addDoc(collection(db, service), {
          uid: uid,
          username: username,
          name: name,
          image: image,
          location: location,
          description: description,
          contact: contact,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      navigate("/"+service)

    }


    if(!user) {
        return (
            <div>
              <h1>You must log in first</h1>
              <Login />
            </div>
            
        );
    }

    fetchUserName();

  
    return (
      <div >
        <div>
          < Navbar />
        </div>

        <h1>Add {service}</h1>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
  
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
  
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
  
        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <label htmlFor="image">Image:</label>
        {/* <input
        type="file"
        id="image"
        onChange={(e) => {
            const file = e.target.files[0];
            setImage(file)
        }}
        /> */}
        
        <button type="submit" onClick={handleSubmit} >Submit</button>
      </div>
    );
  };


  

export default Addservice;