import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import orderBy from "lodash/orderBy";
import OrderModal from "../components/OrderModal";

export default function OrderStatus() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.body.style.background = "#f7f7f7";

    window.scrollTo(0, 0);

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
        setOrders(orderBy(res.data, ["created_at"], ["desc"]));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavigationBar />
      <div
        className="container-fluid"
        style={{
          padding: "2rem 0 0 0",
        }}
      >
        <div className="container">
          <div className="row">
            {orders?.length > 0 ? (
              orders.map((o) => <OrderModal key={o.id} order={o} />)
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
