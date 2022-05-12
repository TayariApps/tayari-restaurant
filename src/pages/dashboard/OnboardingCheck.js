import React from "react";
import { Link } from "react-router-dom";

export default function OnboardingCheck({
  typesCount,
  tablesCount,
  menuItemsCount,
}) {
  return (
    <div className="row mt-3">
      {typesCount == 0 && (
        <div className="col-md-4">
          <div
            className="card shadow"
            style={{ width: "100%", background: "#fffff" }}
          >
            <div className="card-body text-center">
              <p>
                Add food types so that you can be able to add menu items
              </p>
              <Link to="/types" className="btn btn-danger">Add food type</Link>
            </div>
          </div>
        </div>
      )}
      {tablesCount == 0 && (
        <div className="col-md-4">
          <div
            className="card shadow"
            style={{ width: "100%", background: "#fffff" }}
          >
            <div className="card-body text-center">
              <p>Add tables so that users can make orders from them</p>
              <Link to="/tables" className="btn btn-danger">Add table</Link>
            </div>
          </div>
        </div>
      )}
      {menuItemsCount == 0 && (
        <div className="col-md-4">
          <div
            className="card shadow"
            style={{ width: "100%", background: "#fffff" }}
          >
            <div className="card-body text-center">
              <p>
                Add Menu items so that customers can order from your restaurant
              </p>
              <Link to="/fooditems" className="btn btn-danger">Add menu item</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
