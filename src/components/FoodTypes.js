import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import FoodCard from "./FoodCard";
import "../App.css";
import { Bars } from "react-loader-spinner";

export default function FoodTypes() {
  const [types, setTypes] = useState([]);
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    setLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/type/place/${localStorage.getItem(
          "place"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        setTypes(res.data.types);
        setFood(res.data.food);
        setLoading(false);
        console.log(loading);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      {!loading ? (
        types?.length > 0 ? (
          <Tabs
            defaultActiveKey={types[0].id}
            id="uncontrolled-tab-example"
            className="mb-3"
            variant="pills"
          >
            {types?.map((t) => (
              <Tab eventKey={t.id} key={t.id} title={t.name}>
                <div className="row">
                  {food
                    .filter((f) => f.type_id == t.id)
                    .map((f) => (
                      <FoodCard key={f.id} food={f} />
                    ))}
                </div>
              </Tab>
            ))}
          </Tabs>
        ) : (
          <div className="mt-3 text-center">
            <h3>No food items added yet.</h3>
          </div>
        )
      ) : (
        <Bars
          heigth="100"
          width="1400"
          color="red"
          ariaLabel="loading-indicator"
        />
      )}
    </>
  );
}
