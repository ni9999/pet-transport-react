import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./login";








function Additem () {


    
    const locations = useLocation();
    const navigate = useNavigate();


    const [user] = useAuthState(auth);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");









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

        <h1>Add Item</h1>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
  
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
  
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
  

        <label htmlFor="image">Image:</label>
        <input
        type="file"
        id="image"
        accept="image/*"
        onChange={(e) => {
            const file = e.target.files[0];
            setImage(file)
        }}
        />
        
        <button type="submit" onClick={handleSubmit} >Submit</button>
      </div>
    );
  };


  

export default Additem;





