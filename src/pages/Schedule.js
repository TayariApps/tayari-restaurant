import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NavigationBar from "../components/NavigationBar";

export default function Schedule() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const buttonStyle = {
    fontWeight: "800",
    padding: "0.7rem 2rem",
    background: "red",
    color: "white",
  };

  const handleMondayChange = (e) => {
    e.persist();

    console.log(values.monday);

    setValues({
      ...values,
      monday: !values.monday,
    });
  };

  const handleTuesdayChange = (e) => {
    e.persist();
    setValues({
      ...values,
      tuesday: !values.tuesday,
    });
  };

  const handleWednesdayChange = (e) => {
    e.persist();
    setValues({
      ...values,
      wednesday: !values.wednesday,
    });
  };

  const handleThursdayChange = (e) => {
    e.persist();
    setValues({
      ...values,
      thursday: !values.thursday,
    });
  };

  const handleFridayChange = (e) => {
    e.persist();
    setValues({
      ...values,
      friday: !values.friday,
    });
  };

  const handleSaturdayChange = (e) => {
    e.persist();
    setValues({
      ...values,
      saturday: !values.saturday,
    });
  };

  const handleSundayChange = (e) => {
    e.persist();
    setValues({
      ...values,
      sunday: !values.sunday,
    });
  };

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/schedule/${localStorage.getItem(
          "place"
        )}`
      )
      .then((res) => {
        console.log(res.data);

        setValues({
          monday:
            res.data.length > 0
              ? res.data.find((x) => x.day_id === 1).open
              : true,
          tuesday:
            res.data.length > 0
              ? res.data.find((x) => x.day_id === 2).open
              : true,
          wednesday:
            res.data.length > 0
              ? res.data.find((x) => x.day_id === 3).open
              : true,
          thursday:
            res.data.length > 0
              ? res.data.find((x) => x.day_id === 4).open
              : true,
          friday:
            res.data.length > 0
              ? res.data.find((x) => x.day_id === 5).open
              : true,
          saturday:
            res.data.length > 0
              ? res.data.find((x) => x.day_id === 6).open
              : true,
          sunday:
            res.data.length > 0
              ? res.data.find((x) => x.day_id === 7).open
              : true,
        });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const singleday = moment().format("dddd");

    axios
      .post(`${process.env.REACT_APP_API_URL}/schedule/update`, {
        place: localStorage.getItem("place"),
        monday: values.monday,
        tuesday: values.tuesday,
        wednesday: values.wednesday,
        thursday: values.thursday,
        friday: values.friday,
        saturday: values.saturday,
        sunday: values.sunday,
        day: singleday
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <NavigationBar />

      <div
        className="container-fluid"
        style={{
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
          <h4 style={{ fontWeight: "700" }}>Schedule &nbsp; </h4>
        </div>

        <div className="container">
          <form onSubmit={handleSubmit} className="mt-3 row">
            <div className="col-md-12">
              <div
                className="card p-2"
                style={{
                  width: "100%",
                  background: "white",
                  color: "black",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <p>
                        Switch on or off the days when your restaurant/place is
                        going to be open or closed.
                      </p>
                    </div>
                    <div className="col-md-6 mb-4">
                      {/* Start of column */}
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={values.monday}
                          onChange={handleMondayChange}
                          checked={values.monday}
                        />
                        <label className="form-check-label">Monday</label>
                      </div>

                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={values.tuesday}
                          onChange={handleTuesdayChange}
                          checked={values.tuesday}
                        />
                        <label className="form-check-label">Tuesday</label>
                      </div>

                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={handleWednesdayChange}
                          value={values.wednesday}
                          checked={values.wednesday}
                        />
                        <label className="form-check-label">Wednesday</label>
                      </div>

                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={handleThursdayChange}
                          value={values.thursday}
                          checked={values.thursday}
                        />
                        <label className="form-check-label">Thursday</label>
                      </div>
                      {/* End of column */}
                    </div>

                    <div className="col-md-6 mb-4">
                      {/* Start of column */}
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={handleFridayChange}
                          value={values.friday}
                          checked={values.friday}
                        />
                        <label className="form-check-label">Friday</label>
                      </div>

                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={values.saturday}
                          onChange={handleSaturdayChange}
                          checked={values.saturday}
                        />
                        <label className="form-check-label">Saturday</label>
                      </div>

                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={values.sunday}
                          onChange={handleSundayChange}
                          checked={values.sunday}
                        />
                        <label className="form-check-label">Sunday</label>
                      </div>
                      {/*  End of column */}
                    </div>

                    <div className="col-md-12 mt-3">
                      <div className="d-grid">
                        <button
                          className="btn"
                          type="submit"
                          style={buttonStyle}
                        >
                          {loading ? "Updating..." : "Update"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
