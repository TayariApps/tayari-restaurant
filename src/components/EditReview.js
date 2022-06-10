import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";

export default function EditReview({ review }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValues({
      rating: review.rating,
      content: review.content,
    });
    setShow(true);
  };
  const [loading, setLoading] = useState(false);

  const ratings = [1, 2, 3, 4, 5];

  const [values, setValues] = useState({
    rating: 0,
    content: "",
  });

  const handleRatingChange = (e) => {
    e.persist();
    setValues({
      ...values,
      rating: e.target.value,
    });
  };

  const handleContentChange = (e) => {
    e.persist();
    setValues({
      ...values,
      content: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/review/place/update`, {
        id: review.id,
        content: values.content,
        rating: values.rating,
      })
      .then(() => {
        setLoading(false);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <FaPen className="me-3" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Reviewer name</label>
              <input value={review.name} className="form-control" readOnly />
            </div>
            <div className="form-group mb-3">
              <label>Rating</label>
              <select
                className="form-control"
                onChange={handleRatingChange}
                defaultValue={values.rating}
              >
                {ratings.map((r) => (
                  <option value={r} key={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-4">
              <label>Content</label>
              <textarea
                className="form-control"
                onChange={handleContentChange}
                rows={3}
                cols="100%"
                value={review.content}
              ></textarea>
            </div>
            <div className="d-grid form-group mb-3">
              <button className="btn btn-warning text-white">
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
