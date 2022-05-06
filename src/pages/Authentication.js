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
import EditEmployeeDrawer from "../components/EditEmployeeDrawer";

export default function Authentication() {
  const STORY_HEADERS = [
    {
      prop: "name",
      title: "Name",
      isFilterable: true,
      isSortable: true,
      cell: (row) => row.user.name
    },
    {
      prop: "phone",
      title: "Phone number",
      isSortable: true,
      cell: (row) => row.user.phone
    },
    {
      prop: "email",
      title: "Email Address",
      isSortable: true,
      cell: (row) => row.user.email
    },
    {
      prop: "created_at",
      title: "Created",
      isSortable: true,
      cell: (row) => moment(row.created).format('DD/MM/YYYY HH:mm:ss')
    },
    {
        prop: "id",
      title: "Actions",
      isSortable: true,
      cell: (row) => <>
      <EditEmployeeDrawer user={row.user} />
      </>
    }
  ];

  const [employees, setEmployees] = useState([])

  document.body.style.backgroundColor = '#f7f7f7'

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.get(`${process.env.REACT_APP_API_URL}/employee/${localStorage.getItem('place')}`)
      .then(res => {
        console.log(res.data);
        setEmployees(res.data)
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
          <h4 style={{ fontWeight: "700" }}>Employees</h4>

        
        </div>
        <div className="container">
          <div className="mt-3">
            <DatatableWrapper
              body={employees}
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
