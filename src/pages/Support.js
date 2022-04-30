import React, { useEffect } from "react";
import bg from "../assets/images/smily.jpg";
import NavigationBar from "../components/NavigationBar";

export default function Support() {
  useEffect(() => {
    document.body.style.background = "#f7f7f7";

    return () => {
      document.body.style.background = "white";
    };
  }, []);

  const inputStyle = {
    height: "4rem",
    background: "#eeeeee",
  };

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

        <div className="d-flex flex-row justify-content-start">
          <div
            className="bg-danger me-3 mt-2"
            style={{ width: "1rem", height: "1rem" }}
          >
            {" "}
          </div>
          <h4 style={{ fontWeight: "700" }}>Support</h4>
        </div>

        <div className="row">
        <div
          className="col-md-6"
          style={{
            backgroundImage: `url(${bg})`,
            boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
            backgroundPosition: "50% center",
            backgroundRepeat: "no-repeat",
            fontWeight: "700",
            height:'100vh'
          }}
        ></div>
        <div className="col-md-6 p-4">

        <h3 style={{ color: "#214071" }}>Write us your query</h3>
          <p style={{ color: "#214071" }}>We will get back to you soon</p>


          <form className="mt-3">    
          <div className="form-group mb-3">
                      <label>Phone number</label>
                      <input
                        style={inputStyle}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label>Your Message</label>
                      <textarea
                        style={{ background: "#eeeeee" }}
                        className="form-control"
                        width="100%"
                        rows="6"
                      ></textarea>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-danger" style={{ fontWeight:'700',fontSize: '13pt', padding:'1.2rem 1rem' }}>
                            Submit
                        </button>
                    </div>

          </form>

        </div>
        </div>


      </div>
    </>
  );
}
