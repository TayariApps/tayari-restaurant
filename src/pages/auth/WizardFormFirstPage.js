import React from "react";
import { Form, Input, TextArea, Select } from "usetheform";

export default function WizardFormFirstPage(props) {
  const inputStyle = {
    height: "4rem",
    background: "#f7f7f7",
  };

  const btnStyle = {
    fontWeight: "800",
    padding: "0.5rem 2.2rem",
    background: "red",
    color: "white",
  };

  return (
    <Form name="page1" {...props}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <Input
            className="form-control"
            style={inputStyle}
            type="text"
            name="name"
            placeholder="Restaurant Name"
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            className="form-control"
            style={inputStyle}
            type="text"
            name="phone_number"
            placeholder="Restaurant Phone"
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            className="form-control"
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Restaurant Email"
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            className="form-control"
            style={inputStyle}
            type="text"
            name="address"
            placeholder="Restaurant Address"
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            className="form-control"
            style={inputStyle}
            type="text"
            name="latitude"
            placeholder="Latitude"
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            className="form-control"
            style={inputStyle}
            type="text"
            name="longitude"
            placeholder="Longitude"
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            className="form-control"
            style={inputStyle}
            type="text"
            name="display_name"
            placeholder="Restaurant Display Name"
          />
        </div>
        <div className="col-md-6 mb-3">
          <Input
            className="form-control"
            style={inputStyle}
            type="text"
            name="policy"
            placeholder="Policy URL"
          />
        </div>
        <div className="col-md-6 mb-3">
        <Select className="form-control" style={inputStyle} name="cuisine">
            <option value="">Select your cuisines</option>
            {props.cuisines.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-md-6 mb-3">
          <Select className="form-control" style={inputStyle} name="country">
            <option value="">Select your country</option>
            {props.countries.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-md-12 mb-3">
          <TextArea
            className="form-control"
            style={{ background: "#f7f7f7" }}
            rows="4"
            type="text"
            name="description"
            placeholder="Description"
          />
        </div>
      </div>
      <div className="text-center mt-2">
        <button type="submit" style={btnStyle} className="btn">
          Next Page
        </button>
      </div>
    </Form>
  );
}
