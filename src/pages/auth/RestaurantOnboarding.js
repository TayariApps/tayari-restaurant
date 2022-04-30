import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMultipleForm } from "usetheform";
import WizardFormFirstPage from "./WizardFormFirstPage";
import WizardFormSecondPage from "./WizardFormSecondPage";
import axios from "axios";
import { toast } from "react-toastify";

export default function RestaurantOnboarding() {
  const [currentPage, setPage] = useState(1);
  const nextPage = () => setPage((prev) => ++prev);
  const prevPage = () => setPage((prev) => --prev);
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/countries`)
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("cant get countries"));
  }, []);

  const [getWizardState, wizard] = useMultipleForm();
  const onSubmitWizard = () => {
    console.log(getWizardState());

    const formData = new FormData();
    formData.append("name", getWizardState().name);
    formData.append("country_id", getWizardState().country);
    formData.append("address", getWizardState().address);
    formData.append("policy_url", getWizardState().policy);
    formData.append("email", getWizardState().email);
    formData.append("phone_number", getWizardState().phone_number);
    formData.append("location", getWizardState().address);
    formData.append("latitude", getWizardState().latitude);
    formData.append("longitude", getWizardState().longitude);
    formData.append("display_name", getWizardState().display_name);
    formData.append("cuisine_id", 1);
    formData.append("description", getWizardState().description);
    formData.append(
      "banner",
      getWizardState().banner,
      getWizardState().banner.name
    );
    formData.append("logo", getWizardState().logo, getWizardState().logo.name);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/place/store`,formData)
      .then((res) => {
        localStorage.setItem('place', res.data)
        navigate("/places");
      })
      .catch((err) => {
        toast.error("Error occured");
      });
  };

  return (
    <div
      className="container-fluid"
      style={{ background: "#f7f7f7", height: "100vh" }}
    >
      <div className="container" style={{ paddingTop: "5rem" }}>
        <h3 style={{ fontWeight: "700", color: "#214071" }}>
          Restaurant Registration
        </h3>

        <div className="mt-4">
          {currentPage === 1 && (
            <WizardFormFirstPage
              {...wizard}
              countries={countries}
              onSubmit={nextPage}
            />
          )}
          {currentPage === 2 && (
            <WizardFormSecondPage
              {...wizard}
              prevPage={prevPage}
              onSubmit={onSubmitWizard}
            />
          )}
        </div>
      </div>
    </div>
  );
}
