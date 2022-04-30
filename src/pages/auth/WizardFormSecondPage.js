import React, { useState } from "react";
import { Form, Input } from "usetheform";
import img from "../../assets/images/tayarilogo2.png";

export default function WizardFormSecondPage({ prevPage, ...props }) {
  const textStyle = {
    textAlign: "left",
  };

  const submitBtnStyle = {
    fontWeight: "800",
    padding: "0.5rem 2.2rem",
    background: "red",
    color: "white",
    border: "1px solid red",
    marginLeft:'3rem'
  };

  const previousBtnStyle = {
    fontWeight: "800",
    padding: "0.5rem 2.2rem",
    background: "#214071",
    color: "white",
    border: "1px solid #214071",
  };

  const imgStyle = {
    maxWidth: "100px",
  };

  const [selectedLogo, setSelectedLogo] = useState(null)

  return (
    <Form name="page2" {...props}>
      <div className="row">
        <div className="col-md-6 text-center">
          <div className="card px-2 py-5 mb-3" style={{ width: "100%" }}>
            <div className="card-body">
            <img src={img} alt="logo" style={imgStyle} />
            </div>
          </div>

          <Input type="file" className="form-control mb-2" name="logo" />
          <p style={textStyle}>Restaurant logo</p>
        </div>

        <div className="col-md-6 text-center">
          <div className="card px-2 py-5 mb-3" style={{ width: "100%" }}>
            <div className="card-body">
              <img src={img} alt="logo" style={imgStyle} />
            </div>
          </div>

          <Input type="file" className="form-control mb-2" name="banner" />

          <p style={textStyle}>Restaurant banner</p>
        </div>
      </div>

      <div className="mt-3 text-center">
      <button type="button" style={previousBtnStyle} onClick={prevPage}>
        Previous Page
      </button>
        <button type="submit" style={submitBtnStyle}>
          Submit
        </button>
      </div>
    </Form>
  );
}
