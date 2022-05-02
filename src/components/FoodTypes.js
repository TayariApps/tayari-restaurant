import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import FoodCard from "./FoodCard";
import "../App.css";

export default function FoodTypes() {
  const [types, setTypes] = useState([]);
  const [food, setFood] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

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
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {types?.length > 0 ? (
        <Tabs
          defaultActiveKey={types[0].type.id}
          id="uncontrolled-tab-example"
          className="mb-3"
          variant="pills"
        >
          {types?.map((t) => (
            <Tab eventKey={t.type.id} key={t.type.id} title={t.type.name}>
              <div className="row">
                {food
                  .filter((f) => f.type_id == t.type.id)
                  .map((f) => (
                    <FoodCard key={f.id} food={f} />
                  ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      ) : (
        <div>No data</div>
      )}
    </>
  );
}
