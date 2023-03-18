import React, { useState } from 'react';
import "./Transport.css";
import Navbar from "./Navbar";
// import { MessengerChat, showMessenger, hideMessenger, showDialog, hideDialog, setMessengerHeight, setMessengerBottomSpacing } from 'react-messenger-customer-chat';

function Transport() {
  const [pickLocation, setPickLocation] = useState('');
  const [pickDate, setPickDate] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // calculate the estimated cost based on the input values
    const cost = calculateEstimatedCost(pickLocation, dropLocation);
    setEstimatedCost(cost);
  }

  function calculateEstimatedCost(pickLocation,  dropLocation) {
    // implementation of the cost calculation logic goes here
    // this is just an example implementation, you can replace it with your own
    // const cost = Math.abs(pickLocation.length - dropLocation.length) * 10;
    // return cost;
    return 5000;
  }

  return (
    <div>
        <Navbar />
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Pick</h2>
          <label>
            Location:
            <input type="text" value={pickLocation} onChange={(e) => setPickLocation(e.target.value)} />
          </label>
          <label>
            Date:
            <input type="date" value={pickDate} onChange={(e) => setPickDate(e.target.value)} />
          </label>
        </div>
        <div>
          <h2>Drop</h2>
          <label>
            Location:
            <input type="text" value={dropLocation} onChange={(e) => setDropLocation(e.target.value)} />
          </label>
          <label>
            Date:
            <input type="date" value={dropDate} onChange={(e) => setDropDate(e.target.value)} />
          </label>
        </div>
        <button type="submit">Estimated Cost</button>
        {estimatedCost && <p>Estimated cost: {estimatedCost}</p>}
      </form>
      {/* <div>
        <button onClick={() => {showMessenger(true)}}>show messenger</button>
        <button onClick={() => {hideMessenger()}}>hide messenger</button>
        <button onClick={() => {showDialog()}}>show dialog</button>
        <button onClick={() => {hideDialog()}}>hide dialog</button>
        <button onclick={() => {setMessengerBottomSpacing(100)}}>set chat 100px in bottom spacing</button>

        <MessengerChat pageId='123456789101112' />
      </div> */}
      <h3> <a href = "https://m.me/nazmulislamzrn">Contact with us to confirm</a> </h3>
    </div>
    
  );
}


export default Transport;   