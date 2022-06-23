import React, { useCallback, useEffect, useState } from "react";

import NavigationBar from "../../components/NavigationBar";
import DashboardCards from "./Cards";
import DashboardBarChart from "./DashboardBarChart";
import DashboardDoughnutChart from "./DashboardDoughnutChart";
import DashboardProgressBars from "./DashboardProgressBars";
import TopSelling from "./TopSelling";
import axios from "axios";
import OnboardingCheck from "./OnboardingCheck";
import DiscountPlace from "../../components/DiscountPlace";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [menuItemsCount, setMenuItemsCount] = useState(0);
  const [sales, setSales] = useState([]);
  const [mostSoldItems, setMostSoldItems] = useState([]);
  const [types, setTypes] = useState([]);
  const [place, setPlace] = useState({});
  const [countables, setCountables] = useState({
    typesCount: 0,
    tablesCount: 0,
  });

  const loadData = useCallback(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    try {
      let res = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/place/restaurantData/${localStorage.getItem("place")}`
      );

      console.log(res.data);
      setOrders(res.data.orders);
      setMenuItemsCount(res.data.menuItemsCount);
      setSales(res.data.orders.filter((x) => x.payment_status == true));
      setMostSoldItems(res.data.mostSold);
      setTypes(res.data.types);
      setPlace(res.data.place);
      setCountables({
        tablesCount: res.data.tablesCount,
        typesCount: res.data.typesCount,
      });
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <NavigationBar />
      <div
        className="container-fluid"
        style={{
          background: "#f7f7f7",
          height: "100vh",
          padding: "2rem 0 0 0",
        }}
      >
        <div className="d-flex flex-row justify-content-start">
          <div
            className="bg-danger me-3 mt-2"
            style={{ width: "1rem", height: "1rem" }}
          >
            {" "}
          </div>
          <h4 style={{ fontWeight: "700" }}>Dashboard</h4>
        </div>
        <div className="container">
          {(countables.typesCount == 0 ||
            countables.tablesCount == 0 ||
            menuItemsCount == 0) && (
            <OnboardingCheck
              typesCount={countables.typesCount}
              menuItemsCount={menuItemsCount}
              tablesCount={countables.tablesCount}
            />
          )}
          <div className="row pt-3">
            <div className="col-md-12">{/* <DashboardBarChart /> */}</div>

            <div className="col-md-6">
              <DashboardCards
                orders={orders}
                sales={sales}
                menuCount={menuItemsCount}
              />

              <DiscountPlace place={place} loadData={loadData} />

              <TopSelling mostSoldItems={mostSoldItems} />
            </div>

            <div className="col-md-6">
              {/* <DashboardDoughnutChart types={types} /> */}
              <DashboardProgressBars orders={orders} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
