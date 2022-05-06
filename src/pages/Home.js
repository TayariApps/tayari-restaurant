import React, { useState } from "react";
import FoodCard from "../components/FoodCard";
import NavigationBar from "../components/NavigationBar";
import DefaultOrder from "../components/DefaultOrder";
import PlaceOrder from "../components/PlaceOrder";
import FoodTypes from "../components/FoodTypes";

export default function Home() {
  const [orderDisplay, setOrderDisplay] = useState(false);

  const placeOrder = () => {
    setOrderDisplay(!orderDisplay);
  };

  return (
    <div className="container-fluid">
      <NavigationBar />
      <div className="row mt-5">
        <div className="col-md-1">
          {/* {orderDisplay ? <PlaceOrder /> : <DefaultOrder />} */}

          {/* {orderDisplay ? (
            <div className="mt-4 d-flex flex-row justify-content-around">
              <button className="btn btn-danger px-3" onClick={placeOrder}>
                Cancel
              </button>
              <button
                className="btn px-3 py-2"
                style={{ background: "#214071", color: "white" }}
              >
                Place Order
              </button>
            </div>
          ) : (
            <div className="mt-4 d-flex flex-row justify-content-around">
              <button className="btn btn-danger px-3" onClick={placeOrder}>
                Add Order
              </button>
              <button
                className="btn px-3 py-2"
                style={{ background: "#214071", color: "white" }}
              >
                Order Status
              </button>
            </div>
          )} */}
        </div>

        <div className="col-md-11">
          
            <FoodTypes/>

        </div>
      </div>
    </div>
  );
}
