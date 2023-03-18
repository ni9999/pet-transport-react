import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase';



function ServiceForm (Services) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const newService = {
        name: name,
        location: location,
        description: description,
        contact: contact,
      };
      firebase.database().ref(Services).push(newService);
      setName("");
      setLocation("");
      setDescription("");
      setContact("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
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
  
        <button type="submit">Add Service</button>
      </form>
    );
  };






function Service(Services) {
  const [Services, setServices] = useState([]);

  useEffect(() => {
    // fetch data from Firebase database
    database.ref("Services").on("value", (snapshot) => {
      const ServiceList = [];
      snapshot.forEach((Service) => {
        ServiceList.push({
          id: Service.key,
          name: Service.val().name,
          location: Service.val().location,
          image: Service.val().image,
          description: Service.val().description,
          contact: Service.val().contact,
          showDetails: false,
        });
      });
      setServices(ServiceList);
    });
  }, []);



  const toggleDetails = (ServiceId) => {
    const updatedServices = Services.map((Service) => {
      if (Service.id === ServiceId) {
        return { ...Service, showDetails: !Service.showDetails };
      } else {
        return Service;
      }
    });
    setServices(updatedServices);
  };


  const showForm = false;



  return (
    <div className="Service-container">
      {Services.map((Service) => (
        <div className="Service" key={Service.id}>
          <img src={Service.image} alt={Service.name} />
          <div className="Service-info">
            <h2>{Service.name}</h2>
            <p>{Service.location}</p>
            {Service.showDetails && (
              <>
                <p>{Service.description}</p>
                <p>{Service.contact}</p>
              </>
            )}
            <button onClick={() => toggleDetails(Service.id)}>
              {Service.showDetails ? "Hide Details" : "Show Details"}
            </button>
          </div>
        </div>
      ))}
        <div>
            {showForm && <ServiceForm /> }
            Add your <a onClick = {() => showForm = true}> Service </a>
        </div>

    </div>
  );
}
