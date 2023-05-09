import { auth, db, storage } from "./firebase";
import React, { useState, useEffect } from "react";
import { query, collection, where, getDocs, addDoc  } from "firebase/firestore";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./login";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";








function Addservice () {


    
    const locations = useLocation();
    const service = locations.state.service;
    const navigate = useNavigate();


    const [user] = useAuthState(auth);
    const [username, setUserName] = useState("");
    const [uid, setUid] = useState("");
    const [percent, setPercent] = useState(0);
  
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
    const [image, setImage] = useState(null);
    const [imgurl, setImgurl] = useState("");

    const handleSubmit = async (event) => { 

      // uploading image to cloud storage


      const storageRef = ref(storage, `/images/${uid}/${image.name}`);


      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the image to upload.
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
  
          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgurl(url);
            console.log(url);
          });
        }
      );


      //uploading info to database
      try {
        const ref = await addDoc(collection(db, service), {
          uid: uid,
          username: username,
          name: name,
          imgurl: imgurl,
          imageurl: `/images/${uid}/${image.name}`,
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
        <input
        type="file"
        id="image"
        accept="image/*"
        onChange={(e) => {
            const file = e.target.files[0];
            setImage(file)
        }}
        />
        <p>{percent} "% done"</p>
        
        <button type="submit" onClick={handleSubmit} >Submit</button>
      </div>
    );
  };


  

export default Addservice;









// tutorial for uploading image



// function App() {
//   // State to store uploaded file
//   const [file, setFile] = useState("");

//   // progress
//   const [percent, setPercent] = useState(0);

//   // Handle file upload event and update state
//   function handleChange(event) {
//     setFile(event.target.files[0]);
//   }

//   const handleUpload = () => {
//     if (!file) {
//       alert("Please upload an image first!");
//     }

//     const storageRef = ref(storage, `/files/${file.name}`);

//     // progress can be paused and resumed. It also exposes progress updates.
//     // Receives the storage reference and the file to upload.
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const percent = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );

//         // update progress
//         setPercent(percent);
//       },
//       (err) => console.log(err),
//       () => {
//         // download url
//         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//           console.log(url);
//         });
//       }
//     );
//   };
//   return (
//     <div>
//       <input type="file" onChange={handleChange} accept="/image/*" />
