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
import axios from "axios";
import AddDrinkStock from "../components/AddDrinkStock";
import EditDrinkStockDrawer from "../components/EditDrinkStockDrawer";

export default function Drinks() {
  const STORY_HEADERS = [
    {
      prop: "name",
      title: "Drink Name",
      isFilterable: true,
      isSortable: true,
    },
    {
      prop: "quantity",
      title: "Quantity",
      isSortable: true,
      cell: (row) => row.pivot.quantity,
    },
    {
      prop: "selling_price",
      title: "Selling Price",
      isSortable: true,
      cell: (row) => row.pivot.selling_price,
    },
    {
      prop: "buying_price",
      title: "Buying price",
      isSortable: true,
      cell: (row) => row.pivot.buying_price,
    },
    {
      prop: "id",
      title: "Stock",
      cell: (row) =>
        row.pivot.quantity > 0 ? (
          <Badge bg="success">In Stock</Badge>
        ) : (
          <Badge bg="danger">Out of stock</Badge>
        ),
    },
    {
      prop: "id",
      title: "Actions",
      cell: (row) => (
        <>
          <EditDrinkStockDrawer drink={row} loadDrinks={loadDrinks} />
        </>
      ),
    },
  ];

  const [drinks, setDrinks] = useState([]);

  const loadDrinks = useCallback(async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    try {
      let t = await axios.get(
        `${process.env.REACT_APP_API_URL}/drink/place/${localStorage.getItem(
          "place"
        )}`
      )
      setDrinks(t.data);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#f7f7f7";
    loadDrinks()
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
          <h4 style={{ fontWeight: "700" }}>Drinks</h4>
          <AddDrinkStock />
        </div>
        <div className="container">
          <div className="mt-3">
            <DatatableWrapper
              body={drinks}
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
          </div>
        </div>
      </div>
    </>
  );
}
