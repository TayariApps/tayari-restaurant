import React, { useCallback, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Badge, Col, Row, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import moment from "moment";
import EditEmployeeDrawer from "../components/EditEmployeeDrawer";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

export default function Authentication() {
  const STORY_HEADERS = [
    {
      prop: "name",
      title: "Name",
      isSortable: true,
      cell: (row) => row.user.name,
    },
    {
      prop: "status",
      title: "Status",
      isSortable: true,
      cell: (row) =>
        row.status ? (
          <Badge pill bg="success">
            Active
          </Badge>
        ) : (
          <Badge pill bg="danger">
            Inactive
          </Badge>
        ),
    },
    {
      prop: "phone",
      title: "Phone number",
      isSortable: true,
      cell: (row) => row.user.phone,
    },
    {
      prop: "email",
      title: "Email Address",
      isSortable: true,
      cell: (row) => row.user.email,
    },
    {
      prop: "created_at",
      title: "Created",
      isSortable: true,
      cell: (row) => moment(row.created).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      prop: "id",
      title: "Actions",
      isSortable: true,
      cell: (row) => (
        <>
          <EditEmployeeDrawer user={row.user} loadUsers={loadUsers} />
          <FaUser className="ms-2" onClick={() => changeStatus(row.user)} />
        </>
      ),
    },
  ];

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadUsers = useCallback(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    try {
      let t = await axios.get(
        `${process.env.REACT_APP_API_URL}/employee/${localStorage.getItem(
          "place"
        )}`
      )
      setEmployees(t.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#f7f7f7";
    loadUsers()
  }, []);

  const addbuttonStyle = {
    background: "red",
    padding: "0.3rem 1.8rem",
    color: "white",
    marginLeft: "2rem",
    fontWeight: "700",
  };

  const changeStatus = (user) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/waiter/statusUpdate`, {
        user_id: user.id,
        place_id: localStorage.getItem("place"),
      })
      .then(() => {
        loadUsers()
        toast.success('Status updated')
      })
      .catch((err) => {
        console.log(err)
        toast.error('Status could not be updated')
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
          <h4 style={{ fontWeight: "700" }}>Employees</h4>
        </div>
        <div className="container">
          <div className="mt-3">
            {
              loading ? <Bars
              heigth="100"
              width="1400"
              color="red"
              ariaLabel="loading-indicator"
            /> : <DatatableWrapper
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
            }
          </div>
        </div>
      </div>
    </>
  );
}
