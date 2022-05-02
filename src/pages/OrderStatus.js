import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Order from "../components/Order";
import axios from "axios";

export default function OrderStatus() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.body.style.background = "#f7f7f7";

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/order/place/${localStorage.getItem(
          "place"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavigationBar />
      <div
        className="container-fluid"
        style={{
          height: "100vh",
          padding: "2rem 0 0 0",
        }}
      >
        <div className="container">
          <div className="row">
            {orders?.length > 0 ? (
              orders.map((o) => <Order key={o.id} order={o} />)
            ) : (
              <div className="col-md-12 text-center">
                <h3>No Orders right now</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
