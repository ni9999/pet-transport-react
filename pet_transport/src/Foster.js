import React, { useState, useEffect } from "react";
import { query, collection, where, getDocs, addDoc  } from "firebase/firestore";
import { auth, db, storage } from './firebase';
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { ref, getDownloadURL } from "firebase/storage";







function Foster() {
  const [Services, setServices] = useState([]);

  useEffect(() => {
    // fetch data from Firebase database

    const fetchPost = async () => {
        await getDocs(collection(db, "foster"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setServices(newData);                
        })
    }

    fetchPost();

    }, []);

    

    // database.ref("Services").on("value", (snapshot) => {
    //   const ServiceList = [];
    //   snapshot.forEach((Service) => {
    //     ServiceList.push({
    //       id: Service.key,
    //       name: Service.val().name,
    //       location: Service.val().location,
    //       image: Service.val().image,
    //       description: Service.val().description,
    //       contact: Service.val().contact,
    //       showDetails: false,
    //     });
    //   });
    //   setServices(ServiceList);
    // });

  // const toggleDetails = (ServiceId) => {
  //   const updatedServices = Services.map((Service) => {
  //     if (Service.id === ServiceId) {
  //       return { ...Service, showDetails: !Service.showDetails };
  //     } else {
  //       return Service;
  //     }
  //   });
  //   setServices(updatedServices);
  // };
  // const showForm = false;
  // const showDetails = false;



  const getImgurl = (loc) => {
    const imgRef = ref(storage, loc);
    const imgurl = "";
    // Get the download URL
    getDownloadURL(imgRef)
      .then((url) => {
        imgurl = url;
      })
    
    return imgurl;

  };




  
  return (
    <div className="Service-container">
      <div>
        < Navbar />
      </div>

      <button> <Link to = "/Addservice" state={{ service:"foster" }}>Add your service</Link></button>

      {Services.map((Service) => (
        <div className="Service" key={Service.id}>
          <img src={getImgurl(Service.imageurl)} alt={Service.imageurl} />
          <div className="Service-info">
            <h2>{Service.name}</h2>
            <p>{Service.location}</p>
            <p>{Service.description}</p>
            <p>{Service.contact}</p>



            {/* {showDetails && (
              <>
                <p>{Service.description}</p>
                <p>{Service.contact}</p>
              </>
            )}
            <button >
              {showDetails ? "Hide Details" : "Show Details"}
            </button> */}



          </div>
        </div>
      ))} 
    </div>
  );
}











export default Foster;   