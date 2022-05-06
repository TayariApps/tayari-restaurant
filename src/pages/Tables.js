import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
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
import axios from 'axios'
import moment from 'moment'
import AddTableDrawer from "../components/AddTableDrawer";
import { FaDownload, FaPen } from "react-icons/fa";
import DownloadQRCode from "../components/DownloadQRCode";

export default function Tables() {
  const STORY_HEADERS = [
    {
      prop: "table_name",
      title: "Name",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "created_at",
      title: "Created On",
      isSortable: true,
      cell: (row) => moment(row.created_at).format("MMMM Do YYYY")
    },
    {
      prop: "qr_code",
      title: "Actions",
      isSortable: true,
      cell: (row) => <>
        <DownloadQRCode image={row.qr_code} />
        <FaPen />
      </>
    }
  ];

  const [tables, setTables] = useState([])

  useEffect(() => {

    document.body.style.backgroundColor = '#f7f7f7'

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.get(`${process.env.REACT_APP_API_URL}/table/places/${localStorage.getItem('place')}`)
      .then(res => {
        console.log(res.data);
        setTables(res.data)
      })
      .catch(err => console.log(err))
  },[])

  const addbuttonStyle = {
    background: "red",
    padding: "0.3rem 1.8rem",
    color: "white",
    marginLeft: "2rem",
    fontWeight: "700",
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
          <h4 style={{ fontWeight: "700" }}>Tables</h4>

         <AddTableDrawer/>
        </div>
        <div className="container">
          <div className="mt-3">
            <DatatableWrapper
              body={tables}
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
                  <Filter classes={{clearButton: 'btn-danger'}} />
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
                  <Pagination classes={{ button: 'btn-danger' }} />
                </Col>
              </Row>
              <Table>
                <TableHeader />
                <TableBody />
              </Table>
            </DatatableWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
