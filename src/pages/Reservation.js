import React, { useCallback, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Col, Row, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import BookingDrawer from "../components/BookingDrawer";
import moment from "moment";
import { Bars } from "react-loader-spinner";

export default function Reservation() {
  const STORY_HEADERS = [
    {
      prop: "date",
      title: "Date",
      cell: (row) => moment(row.time).format("MMMM Do YYYY"),
    },
    {
      prop: "time",
      title: "Time",
      cell: (row) => moment(row.time).format("h:mm a"),
    },
    {
      prop: "name",
      title: "Customer",
      cell: (row) => (row.user_id == null ? row.customer_name : row.user?.name),
    },
    {
      prop: "note",
      title: "Note",
      isSortable: true,
    },
  ];

  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadReservations = useCallback(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    try {
      let t = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/reservation/place/${localStorage.getItem("place")}`
      );
      setReservation(t.data);
      setLoading(false);
      console.log(t.data);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#f7f7f7";
    loadReservations();
  }, []);

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
          <h4 style={{ fontWeight: "700" }}>Reservation</h4>
          <BookingDrawer loadReservations={loadReservations} />
        </div>
        <div className="container">
          <div className="mt-3">
            {loading ? (
              <Bars
                heigth="100"
                width="1400"
                color="red"
                ariaLabel="loading-indicator"
              />
            ) : (
              <DatatableWrapper
                body={reservation}
                headers={STORY_HEADERS}
                paginationOptionsProps={{
                  initialState: {
                    rowsPerPage: 10,
                    options: [5, 10, 15, 20],
                  },
                }}
              >
                <Row className="mb-4 p-2">
                  <Col
                    xs={12}
                    lg={4}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <Filter classes={{ clearButton: "btn-danger" }} />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                  >
                    <PaginationOptions alwaysShowPagination="true" />
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    lg={4}
                    className="d-flex flex-col justify-content-end align-items-end"
                  >
                    <Pagination classes={{ button: "btn-danger" }} />
                  </Col>
                </Row>
                <Table>
                  <TableHeader />
                  <TableBody />
                </Table>
              </DatatableWrapper>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
